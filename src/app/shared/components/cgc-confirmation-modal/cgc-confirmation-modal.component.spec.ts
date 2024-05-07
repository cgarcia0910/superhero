import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgcConfirmationModalComponent } from './cgc-confirmation-modal.component';

describe('CgcConfirmationModalComponent', () => {
  let component: CgcConfirmationModalComponent;
  let fixture: ComponentFixture<CgcConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CgcConfirmationModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CgcConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
