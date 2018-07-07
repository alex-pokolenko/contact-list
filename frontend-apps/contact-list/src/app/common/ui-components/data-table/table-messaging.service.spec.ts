import { TestBed, inject } from '@angular/core/testing';

import { TableMessagingService } from './table-messaging.service';

describe('TableMessagingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableMessagingService]
    });
  });

  it('should be created', inject([TableMessagingService], (service: TableMessagingService) => {
    expect(service).toBeTruthy();
  }));
});
