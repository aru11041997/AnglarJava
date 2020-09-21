import { TestBed } from '@angular/core/testing';

import { Auth.RoleGuard } from './auth.role.guard';

describe('Auth.RoleGuard', () => {
  let guard: Auth.RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth.RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
