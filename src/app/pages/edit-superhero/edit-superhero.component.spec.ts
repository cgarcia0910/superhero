import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperheroComponent } from './edit-superhero.component';

xdescribe('EditSuperheroComponent', () => {
  let component: EditSuperheroComponent;
  let fixture: ComponentFixture<EditSuperheroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSuperheroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
