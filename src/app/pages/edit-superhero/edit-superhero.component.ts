import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AddEditSuperheroComponent } from '../../features/add-edit-superhero/add-edit-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { Superhero } from '../../adapter/domain/models/superhero';
import { ActivatedRoute, Router } from '@angular/router';
import { CgcConfirmationModalComponent } from '../../shared/components/cgc-confirmation-modal/cgc-confirmation-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-superhero',
  standalone: true,
  imports: [AddEditSuperheroComponent, MatToolbarModule, MatProgressSpinnerModule],
  templateUrl: './edit-superhero.component.html',
  styleUrl: './edit-superhero.component.scss'
})
export class EditSuperheroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER);
  _dialog: MatDialog = inject(MatDialog);
  _destroyRef: DestroyRef = inject(DestroyRef);

  loading = signal<boolean>(false);
  
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _router: Router = inject(Router);
  superhero = signal<Superhero | undefined>(undefined);

  constructor() {
    this._route.paramMap.pipe(switchMap(params => {
      this.loading.set(true);
      const editId = params.get('id');
      return editId !== null ? this._modelSuperHeroDisplayer.getSuperhero(editId) : of(undefined);
    })).subscribe(sh => {
      this.superhero.set(sh);
      this.loading.set(false);
    });
  }
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'update-superhero':
        if(this.superhero()) {
          this.loading.set(true);
          firstValueFrom(this._modelSuperHeroDisplayer.updateSuperhero(this.superhero() as Superhero, value as Superhero)).then(e => {
            this.loading.set(false);
            this._dialog.open(CgcConfirmationModalComponent, {
              data: {
                title: "Edit superhero",
                message: "The superhero has been updated sucessfully",
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
        }
        break;
    }
  }
}
