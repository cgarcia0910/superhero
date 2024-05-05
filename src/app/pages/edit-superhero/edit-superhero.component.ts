import { Component, inject, signal } from '@angular/core';
import { AddEditSuperheroComponent } from '../../features/add-edit-superhero/add-edit-superhero.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { firstValueFrom, of, switchMap } from 'rxjs';
import { MODEL_SUPERHERO_DISPLAYER } from '../../adapter/domain/ports/i-model-displayer';
import { Superhero } from '../../adapter/domain/models/superhero';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-superhero',
  standalone: true,
  imports: [AddEditSuperheroComponent, MatToolbarModule],
  templateUrl: './edit-superhero.component.html',
  styleUrl: './edit-superhero.component.scss'
})
export class EditSuperheroComponent {
  _modelSuperHeroDisplayer = inject(MODEL_SUPERHERO_DISPLAYER)
  private _route: ActivatedRoute = inject(ActivatedRoute);
  superhero = signal<Superhero | undefined>(undefined);
//   superhero = {
//     id: 'prueba',
//     "nameLabel": "Ahab",
//     "genderLabel": "male",
//     "citizenshipLabel": "United States of America",
//     "skillsLabel": "superhuman strength",
//     "occupationLabel": "psychologist",
//     "memberOfLabel": "Horsemen of Apocalypse",
//     "creatorLabel": "Walt Simonson"
// };
constructor() {
  this._route.paramMap.pipe(switchMap(params => {
    const editId = params.get('id');
    return editId !== null ? this._modelSuperHeroDisplayer.getSuperhero(editId) : of(undefined);
  })).subscribe(sh => this.superhero.set(sh));
}
doAction(event: {action: string, value: unknown}) {
  const {action = undefined, value = undefined} = event || {};
  switch(action) {
    case 'update-superhero':
      if(this.superhero()) {
        firstValueFrom(this._modelSuperHeroDisplayer.updateSuperhero(this.superhero() as Superhero, value as Superhero)).then(e => console.log(e))
      }
      break;
  }
}
}
