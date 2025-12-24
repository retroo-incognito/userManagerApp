import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Already logged in → redirect to dashboard
    router.navigate(['/']); // or '/list' if you prefer
    return false;
  }

  // Not logged in → allow access to login/register
  return true;
};