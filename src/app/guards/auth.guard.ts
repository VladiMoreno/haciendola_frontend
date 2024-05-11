import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService: AuthService = inject(AuthService);
  
  if(authService.isAuthenticated()){
    return true;
  }else{
    router.navigateByUrl('/login');
    return false
  }
};
