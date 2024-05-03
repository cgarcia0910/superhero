import { Component, OnInit, effect, inject, viewChild } from '@angular/core';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer'
import { SUPERHERO_CONFIG_TABLE } from './filter-hero.constants';
import { AsyncPipe, NgIf } from '@angular/common';
import { CgcCustomMatTableComponent } from '../../shared/components';

@Component({
  selector: 'app-filter-hero',
  standalone: true,
  imports: [CgcCustomMatTableComponent, AsyncPipe, NgIf],
  templateUrl: './filter-hero.component.html',
  styleUrl: './filter-hero.component.scss'
})
export class FilterHeroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER)
  SUPERHERO_CONFIG_TABLE = SUPERHERO_CONFIG_TABLE;
}