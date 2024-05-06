import { Component, DestroyRef, OnInit, effect, inject, viewChild } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer'
import { SUPERHERO_CONFIG_TABLE } from './filter-hero.constants';
import { SearchSuperheroComponent } from '../../features/search-superhero/search-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Superhero } from '../../adapter/domain/models/superhero';
import { Router } from '@angular/router';
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

  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'edit-superhero':
        const {id = undefined} = value as Superhero || {};
        this._router.navigate([`edit-superhero/${id}`]);
      break;
    }
  }
}
