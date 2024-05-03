import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelCustomCellComponentComponent } from './cel-custom-cell-component.component';

describe('CelCustomCellComponentComponent', () => {
  let component: CelCustomCellComponentComponent;
  let fixture: ComponentFixture<CelCustomCellComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CelCustomCellComponentComponent]
    });
    fixture = TestBed.createComponent(CelCustomCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
