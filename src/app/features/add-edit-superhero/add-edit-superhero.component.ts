import { Component, EventEmitter, OnInit, Output, computed, effect, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { Superhero } from '../../domain/models/superhero';

@Component({
  selector: 'app-add-edit-superhero',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './add-edit-superhero.component.html',
  styleUrl: './add-edit-superhero.component.scss'
})
export class AddEditSuperheroComponent {
  superhero = input<Superhero>();
  editionMode = computed(() => this.superhero() !== undefined);

  @Output() Emitter = new EventEmitter<{action: 'save-superhero' | 'update-superhero', value: Superhero}>();

  constructor() {
    effect(() => {
      const currentSuperhero = this.superhero();
      if(currentSuperhero) {
        this.superheroForm.patchValue(currentSuperhero as Superhero);
      }
    })
  }
  onSubmit(event: Event) {
    if(this.superheroForm.valid) {
      this.Emitter.emit({action: this.editionMode() ? 'update-superhero' : 'save-superhero', value: this.superheroForm.value as Superhero})
    }
  }
  superheroForm = new FormGroup({
    nameLabel: new FormControl('', [Validators.required]),
    genderLabel: new FormControl('', [Validators.required]),
    citizenshipLabel: new FormControl('', Validators.required),
    skillsLabel: new FormControl('', Validators.required),
    occupationLabel: new FormControl('', Validators.required),
    memberOfLabel: new FormControl('', Validators.required),
    creatorLabel: new FormControl('', Validators.required),
  });
}
