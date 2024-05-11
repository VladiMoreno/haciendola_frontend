import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService: AuthService = inject(AuthService);
  
  if(authService.isAuthenticated()){
    router.navigateByUrl('/dashboard');
    return false;
  }else{
    return true;
  }
};
