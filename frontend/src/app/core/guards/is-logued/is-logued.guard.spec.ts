import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isLoguedGuard } from './is-logued.guard';

describe('isLoguedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isLoguedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
