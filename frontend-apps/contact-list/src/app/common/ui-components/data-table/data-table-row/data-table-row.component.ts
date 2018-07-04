import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-data-table-row]',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss']
})
export class DataTableRowComponent implements OnInit {

  @Input() row: any;
  @Input() columns: any;

  constructor() {}

  ngOnInit() {
    console.log(this.row);
  }

}
