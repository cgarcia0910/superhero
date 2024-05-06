import { Component, DestroyRef, OnInit, effect, inject, viewChild } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer'
import { SUPERHERO_CONFIG_TABLE } from './filter-hero.constants';
import { SearchSuperheroComponent } from '../../features/search-superhero/search-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Superhero } from '../../adapter/domain/models/superhero';
import { Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { CgcConfirmationModalComponent } from '../../shared/components/cgc-confirmation-modal/cgc-confirmation-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-filter-hero',
  standalone: true,
  imports: [SearchSuperheroComponent, MatToolbarModule],
  templateUrl: './filter-hero.component.html',
  styleUrl: './filter-hero.component.scss'
})
export class FilterHeroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER);
  _router: Router = inject(Router);
  _dialog: MatDialog = inject(MatDialog);
  _destroyRef: DestroyRef = inject(DestroyRef);

  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'edit-superhero':
        const {id = undefined} = value as Superhero || {};
        this._router.navigate([`edit-superhero/${id}`]);
      break
      case 'delete-superhero':
        this._dialog.open(CgcConfirmationModalComponent, {
          data: {
            title: "Delete superhero",
            message: "Are you sure?",
            buttons: [
              {label: 'Cancel', value: 'cancel'},
              {label: 'Delete', value: 'delete'}
            ]
          }
        }).afterClosed().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(modalResponse => {
          switch(modalResponse) {
            case 'delete':
              firstValueFrom(this._modelSuperHeroDisplayer.removeSuperhero(value as Superhero)).then(e => console.log(e))
            break;
          }
        });
      break;
    }
  }
}
