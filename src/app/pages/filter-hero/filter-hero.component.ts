import { Component, inject } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../domain/ports/i-model-displayer'
import { SUPERHERO_CONFIG_TABLE } from './filter-hero.constants';
import { SearchSuperheroComponent } from '../../features/search-superhero/search-superhero.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Superhero } from '../../domain/models/superhero';
import { Router } from '@angular/router';

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

  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'edit-superhero':
        const {id = undefined} = value as Superhero || {};
        this._router.navigate([`edit-superhero/${id}`]);
      break;
      case 'create-superhero':
        this._router.navigate(['add-superhero']);
      break;
    }
  }
}
