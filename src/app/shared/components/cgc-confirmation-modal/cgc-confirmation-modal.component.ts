import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

export interface DialogData {
  title: string;
  message: string;
  buttons: [{label: string, value: string}]
}

@Component({
  selector: 'app-cgc-confirmation-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: './cgc-confirmation-modal.component.html',
  styleUrl: './cgc-confirmation-modal.component.scss'
})
export class CgcConfirmationModalComponent {
  data: DialogData = inject(MAT_DIALOG_DATA)
  trackButton = (buttonObj: {label: string, value: string}) => JSON.stringify(buttonObj); 
}
