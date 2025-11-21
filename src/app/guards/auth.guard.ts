import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // si usas JWT
    if (token) return true;
    // alternativa: una flag simple 'isAdmin'
    // const isAdmin = localStorage.getItem('isAdmin') === 'true';
    // if (isAdmin) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
