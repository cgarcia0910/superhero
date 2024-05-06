import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AddEditSuperheroComponent } from '../../features/add-edit-superhero/add-edit-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { Superhero } from '../../adapter/domain/models/superhero';
import { firstValueFrom } from 'rxjs';
import { CgcConfirmationModalComponent } from '../../shared/components/cgc-confirmation-modal/cgc-confirmation-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-superhero',
  standalone: true,
  imports: [AddEditSuperheroComponent, MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './add-superhero.component.html',
  styleUrl: './add-superhero.component.scss'
})
export class AddSuperheroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER);
  _dialog: MatDialog = inject(MatDialog);
  _destroyRef: DestroyRef = inject(DestroyRef);

  loading = signal<boolean>(false);
  
  private _router: Router = inject(Router);
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'save-superhero':
        this.loading.set(true);
        firstValueFrom(this._modelSuperHeroDisplayer.addSuperhero(value as Superhero)).then(e => {
          this.loading.set(false);
          this._dialog.open(CgcConfirmationModalComponent, {
            data: {
              title: "Create superhero",
              message: "The superhero has been created sucessfully",
              buttons: [
                {label: 'Accept', value: 'accept'}
              ]
            }
          }).afterClosed().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(modalResponse => {
            switch(modalResponse) {
              case 'accept':
                this._router.navigate([`/`]);
            }
          });
        });
        break;
    }
  }
}
