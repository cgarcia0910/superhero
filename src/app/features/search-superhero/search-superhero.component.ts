import { Component, DestroyRef, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { SUPERHERO_CONFIG_TABLE } from '../../pages/filter-hero/filter-hero.constants';
import { CgcCustomMatTableComponent } from '../../shared/components';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { debounceTime, firstValueFrom } from 'rxjs';
import { Superhero } from '../../adapter/domain/models/superhero';
import { MatDialog} from '@angular/material/dialog';
import { CgcConfirmationModalComponent } from '../../shared/components/cgc-confirmation-modal/cgc-confirmation-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-search-superhero',
  standalone: true,
  imports: [CgcCustomMatTableComponent, AsyncPipe, NgIf, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './search-superhero.component.html',
  styleUrl: './search-superhero.component.scss'
})
export class SearchSuperheroComponent implements OnInit{
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER);
  _dialog: MatDialog = inject(MatDialog);
  _destroyRef: DestroyRef = inject(DestroyRef);

  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;

  @Output() Emitter = new EventEmitter<{action: string, value: unknown}>();
  
  searchTermFormComponent = new FormControl('');
  searchTerm = signal('');
  data = signal<Superhero[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.searchTermFormComponent.valueChanges
    .pipe(
      debounceTime(500)
      )
      .subscribe(e => {
        // this.loading.set(true);
        this.searchTerm.set(e !== null? e : '');
        this.loadHeroList();
      });
    this.loadHeroList();
  }
  doAction(event: {action: string, value: unknown}) {
    const { action = undefined, value = undefined } = event || {};
    console.log(event)
    switch(action) {
      case 'delete-superhero':
          console.log('delete')
          console.log(this._dialog)
          debugger;
          this._dialog.open(CgcConfirmationModalComponent, {
            data: {
              title: "Delete superhero",
              message: "Are you sure?",
              buttons: [
                {label: 'Cancel', value: 'cancel'},
                {label: 'Delete', value: 'delete'}
              ]
            }
          }).afterClosed()
          // .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(modalResponse => {
            switch(modalResponse) {
              case 'delete':
                // this.loading.set(true);
                firstValueFrom(this._modelSuperHeroDisplayer.removeSuperhero(value as Superhero)).then(e => this.loadHeroList());
              break;
            }
          });
        break;
      default:
        this.Emitter.emit(event);
    }
  }

  private loadHeroList() {
    this.loading.set(true);
    firstValueFrom(this._modelSuperHeroDisplayer.getSuperheroesList(this.searchTerm())).then(heroList => {
      this.data.set(heroList);
      this.loading.set(false);
    });
  }
}
