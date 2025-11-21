import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  template: `
  <div class="container mt-4">
    <h3>Login admin</h3>
    <form (ngSubmit)="login()">
      <input class="form-control mb-2" [(ngModel)]="password" name="password" placeholder="Contraseña"/>
      <button class="btn btn-primary" type="submit">Entrar</button>
    </form>
  </div>
  `
})
export class LoginComponent {
  password = '';
  constructor(private router: Router) {}
  login(){
    if(this.password === 'tuContrasena') {
      localStorage.setItem('token', 'demo'); // si no tienes JWT
      this.router.navigate(['/admin']);
    } else {
      alert('Contraseña incorrecta');
    }
  }
}
