import { Component, inject } from '@angular/core';
import { AddEditSuperheroComponent } from '../../features/add-edit-superhero/add-edit-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { firstValueFrom } from 'rxjs';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { Superhero } from '../../adapter/domain/models/superhero';

@Component({
  selector: 'app-edit-superhero',
  standalone: true,
  imports: [AddEditSuperheroComponent, MatToolbarModule],
  templateUrl: './edit-superhero.component.html',
  styleUrl: './edit-superhero.component.scss'
})
export class EditSuperheroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER)
  superhero = {
    "nameLabel": "Ahab",
    "genderLabel": "male",
    "citizenshipLabel": "United States of America",
    "skillsLabel": "superhuman strength",
    "occupationLabel": "psychologist",
    "memberOfLabel": "Horsemen of Apocalypse",
    "creatorLabel": "Walt Simonson"
};
doAction(event: {action: string, value: unknown}) {
  const {action = undefined, value = undefined} = event || {};
  switch(action) {
    case 'update-superhero':
      firstValueFrom(this._modelSuperHeroDisplayer.updateSuperhero(this.superhero, value as Superhero)).then(e => console.log(e))
      break;
  }
}
}
