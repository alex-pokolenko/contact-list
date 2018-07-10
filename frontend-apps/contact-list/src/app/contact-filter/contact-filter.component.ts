import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {

  @Input() formId: string;

  constructor() { }

  ngOnInit() {
  }

}
