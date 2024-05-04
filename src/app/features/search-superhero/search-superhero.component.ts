import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { SUPERHERO_CONFIG_TABLE } from '../../pages/filter-hero/filter-hero.constants';
import { CgcCustomMatTableComponent } from '../../shared/components';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-search-superhero',
  standalone: true,
  imports: [CgcCustomMatTableComponent, AsyncPipe, NgIf, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './search-superhero.component.html',
  styleUrl: './search-superhero.component.scss'
})
export class SearchSuperheroComponent implements OnInit{
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER)
  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;
  searchTermFormComponent = new FormControl('');
  searchTerm = signal('');
  data = computed(() => {
    return (this._modelSuperHeroDisplayer.getSuperheroesList(this.searchTerm()))
  })
  ngOnInit(): void {
    this.searchTermFormComponent.valueChanges
      .pipe(
        filter(e => !!e),
        debounceTime(500)
      )
      .subscribe(e => {
        if(e !== null) {
          this.searchTerm.set(e);
        }
      })
  }
}
