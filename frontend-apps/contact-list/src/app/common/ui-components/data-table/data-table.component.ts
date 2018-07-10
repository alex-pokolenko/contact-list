import { Component, OnInit, Input } from '@angular/core';
import { DataTable } from './data-table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {

  @Input() table: DataTable;

  sortingKey: string;
  isReverse = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Define table order
   *
   * @param {string} fieldPath field to order by
   * @memberof DataTableComponent
   */
  sort(fieldPath: string): void {
    this.isReverse = fieldPath === this.sortingKey ? !this.isReverse : false;
    this.sortingKey = fieldPath;
  }

}
