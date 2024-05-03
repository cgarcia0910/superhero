import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cgc-custom-cell-component',
  templateUrl: './cgc-custom-cell-component.component.html',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule]
})
export class CgcCustomCellComponentComponent {
  @Input() config: any;
  @Input() element: any;
  @Output() Emitter = new EventEmitter<{ action: string, value: unknown }>();
  doAction(response: { action: string, value: unknown, event: Event }) {
    response.event.preventDefault();
    this.Emitter.emit({ action: response.action, value: response.value })
  }
}
