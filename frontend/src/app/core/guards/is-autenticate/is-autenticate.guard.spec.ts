import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isAutenticateGuard } from './is-autenticate.guard';

describe('isAutenticateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAutenticateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
