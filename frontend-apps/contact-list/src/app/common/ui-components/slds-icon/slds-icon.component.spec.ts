import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SldsIconComponent } from './slds-icon.component';

describe('SldsIconComponent', () => {
  let component: SldsIconComponent;
  let fixture: ComponentFixture<SldsIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SldsIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SldsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
