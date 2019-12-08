import { TestBed } from '@angular/core/testing';

import { LocationUserServiceService } from './location-user-service.service';

describe('LocationUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationUserServiceService = TestBed.get(LocationUserServiceService);
    expect(service).toBeTruthy();
  });
});
