import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSuperheroComponent } from './add-edit-superhero.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddEditSuperheroComponent', () => {
  let component: AddEditSuperheroComponent;
  let fixture: ComponentFixture<AddEditSuperheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSuperheroComponent, NoopAnimationsModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show a form with filled values if it\'s called with a hero (edition mode)', () => {
    const updateSuperhero = {
      id: 'asds8',
      nameLabel: 'Ahab',
      genderLabel: 'male',
      citizenshipLabel: 'United States of America',
      skillsLabel: 'superhuman strength',
      occupationLabel: 'psychologist',
      memberOfLabel: 'Horsemen of Apocalypse',
      creatorLabel: 'Walt Simonson'
    };
    fixture.componentRef.setInput('superhero', updateSuperhero);
    fixture.detectChanges();
    const {id, ...superherowithoutid} = updateSuperhero || {};
    expect(component.superheroForm.value).toEqual(superherowithoutid);
  });
  it('should emit an action \'update-superhero\' with the value of the form (edition mode)', (done) => {
    const updateSuperhero = {
      id: 'asds8',
      nameLabel: 'Ahab',
      genderLabel: 'male',
      citizenshipLabel: 'United States of America',
      skillsLabel: 'superhuman strength',
      occupationLabel: 'psychologist',
      memberOfLabel: 'Horsemen of Apocalypse',
      creatorLabel: 'Walt Simonson'
    };
    fixture.componentRef.setInput('superhero', updateSuperhero);
    fixture.detectChanges();
    const {id, ...superherowithoutid} = updateSuperhero || {};
    component.Emitter.subscribe(emiter => {
      // console.log(emiter);
      expect(emiter).toEqual({action: 'update-superhero', value: superherowithoutid as any})
      done();
    })
    component.onSubmit(new Event(''));
  });
  it('should show an empty form when it\'s called without a hero (creation mode)', () => {
    fixture.detectChanges();
    console.log(component.superheroForm.value)
    const emptyForm = {nameLabel: '', genderLabel: '', citizenshipLabel: '', skillsLabel: '', occupationLabel: '', memberOfLabel: '', creatorLabel: ''}
    // const {id, ...superherowithoutid} = updateSuperhero || {};
    expect(component.superheroForm.value).toEqual(emptyForm);
  });
  it('should emit an action \'save-superhero\' with the value of the form (creation mode)', (done) => {
    const createdSuperhero = {
      nameLabel: 'Ahab',
      genderLabel: 'male',
      citizenshipLabel: 'United States of America',
      skillsLabel: 'superhuman strength',
      occupationLabel: 'psychologist',
      memberOfLabel: 'Horsemen of Apocalypse',
      creatorLabel: 'Walt Simonson'
    };
    component.superheroForm.setValue(createdSuperhero);
    fixture.detectChanges();
    component.Emitter.subscribe(emiter => {
      expect(emiter).toEqual({action: 'save-superhero', value: createdSuperhero as any})
      done();
    })
    component.onSubmit(new Event(''));
  });

});
