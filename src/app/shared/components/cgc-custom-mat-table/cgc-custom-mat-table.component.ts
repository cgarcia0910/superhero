import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Signal, computed, effect, input, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { CgcCustomCellComponentComponent } from '../cgc-custom-cell-component/cgc-custom-cell-component.component';
// import { CelCustomCellComponentModule } from '../cel-custom-cell-component/cel-custom-cell-component.module';
// import { CelCustomCellComponentComponent } from '../cgc-custom-cell-component/cel-custom-cell-component.component';

export interface MatTableConfig {
  cellConfig: CellConfig;
  header:     Header;
  data:       Data;
}

export interface CellConfig {
  cellType: CellType;
  tdClass:  string;
  thClass:  string;
}

export enum CellType {
  Th = "th",
}

export interface Data {
  fields: Field[];
}

export interface Field {
  cols: Col[];
}

export interface Col {
  field:     string[];
  cellType?: string;
  extra?:    Extra;
}

export interface Extra {
  event: string;
  icon:  string;
  color: string;
}

export interface Header {
  label:     Array<string[]>;
  id:        string;
  showChart: boolean;
}


@Component({
  selector: 'cgc-custom-mat-table',
  templateUrl: './cgc-custom-mat-table.component.html',
  styleUrls: ['./cgc-custom-mat-table.component.css'],
  standalone: true,
  imports: [
      MatTableModule,
      MatSortModule,
      MatPaginatorModule,
      CgcCustomCellComponentComponent
  ]
})
export class CgcCustomMatTableComponent {
  configTable = input.required<any[]>();
  pageSize = input<number>(10);
  paginator = viewChild(MatPaginator)
  sort = viewChild(MatSort);
  data = input<unknown[]>(); 
  matTableDataSource = new MatTableDataSource<any>([]);
  displayedColumns: Signal<string[]> = computed(() => this.configTable().map(cell => cell?.header?.id));
  @Output() Emitter = new EventEmitter<{action: string, value: unknown}>();
  
  constructor() {
    effect(() => {
      this.matTableDataSource = new MatTableDataSource(this.data());
      this.matTableDataSource.paginator = this.paginator()!;
      this.matTableDataSource.sort = this.sort()!;
    })
  }
  
  doAction(response: {action: string, value: unknown}) {
    this.Emitter.emit(response)
  }

  trackConfig(config: unknown): string {
    return JSON.stringify(config);
  }
}
