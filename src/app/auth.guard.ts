import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BackendService } from '../app/services/backend.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(BackendService);
  return authService.isAuth();
};
