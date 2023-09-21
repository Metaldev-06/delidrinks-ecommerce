import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkCartGuard } from './check-cart.guard';

describe('checkCartGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkCartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
