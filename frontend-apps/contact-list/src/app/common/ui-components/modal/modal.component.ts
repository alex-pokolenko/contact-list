import { Component, OnInit, ContentChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  /**
   * Body template reference
   */
  @ContentChild(TemplateRef) modalContent: TemplateRef<any>;

  @Input() isOpen: boolean;
  @Input() headerText: string;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

}
