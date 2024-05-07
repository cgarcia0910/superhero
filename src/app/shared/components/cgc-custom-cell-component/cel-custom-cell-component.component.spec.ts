import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgcCustomCellComponentComponent } from './cgc-custom-cell-component.component';

describe('CgcCustomCellComponentComponent', () => {
  let component: CgcCustomCellComponentComponent;
  let fixture: ComponentFixture<CgcCustomCellComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CgcCustomCellComponentComponent]
    });
    fixture = TestBed.createComponent(CgcCustomCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
