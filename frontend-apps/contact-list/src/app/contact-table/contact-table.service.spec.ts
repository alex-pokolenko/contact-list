import { TestBed, inject } from '@angular/core/testing';

import { ContactTableService } from './contact-table.service';

describe('ContactTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactTableService]
    });
  });

  it('should be created', inject([ContactTableService], (service: ContactTableService) => {
    expect(service).toBeTruthy();
  }));
});
