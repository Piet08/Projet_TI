import { TestBed } from '@angular/core/testing';

import { AddressService } from './address.service';

describe('AdresseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddressService = TestBed.get(AddressService);
    expect(service).toBeTruthy();
  });
});
