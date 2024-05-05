import { Component, inject } from '@angular/core';
import { AddEditSuperheroComponent } from '../../features/add-edit-superhero/add-edit-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { Superhero } from '../../adapter/domain/models/superhero';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-superhero',
  standalone: true,
  imports: [AddEditSuperheroComponent, MatToolbarModule],
  templateUrl: './add-superhero.component.html',
  styleUrl: './add-superhero.component.scss'
})
export class AddSuperheroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER)
  doAction(event: {action: string, value: unknown}) {
    const {action = undefined, value = undefined} = event || {};
    switch(action) {
      case 'save-superhero':
        firstValueFrom(this._modelSuperHeroDisplayer.addSuperhero(value as Superhero)).then(e => console.log(e))
        break;
    }
  }
}
