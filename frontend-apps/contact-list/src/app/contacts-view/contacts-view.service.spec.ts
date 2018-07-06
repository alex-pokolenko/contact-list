import { TestBed, inject } from '@angular/core/testing';

import { ContactViewService } from './contacts-view.service';

describe('ContactViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactViewService]
    });
  });

  it('should be created', inject([ContactViewService], (service: ContactViewService) => {
    expect(service).toBeTruthy();
  }));
});
