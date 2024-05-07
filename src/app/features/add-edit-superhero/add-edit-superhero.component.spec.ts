import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSuperheroComponent } from './add-edit-superhero.component';

fdescribe('AddEditSuperheroComponent', () => {
  let component: AddEditSuperheroComponent;
  let fixture: ComponentFixture<AddEditSuperheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSuperheroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
