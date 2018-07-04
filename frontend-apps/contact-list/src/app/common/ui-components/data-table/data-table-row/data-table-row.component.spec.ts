import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableRowComponent } from './data-table-row.component';

describe('DataTableRowComponent', () => {
  let component: DataTableRowComponent;
  let fixture: ComponentFixture<DataTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
