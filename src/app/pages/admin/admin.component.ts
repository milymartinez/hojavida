import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from '../../services/experiences.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  items$: Observable<Experience[]>;

  constructor(private svc: ExperiencesService, public router: Router) {
    this.items$ = this.svc.getAll();   // ✔ AHORA SÍ svc EXISTE
  }

  onDelete(id: string | undefined) {
    if (!id) return;

    if (!confirm('¿Eliminar esta experiencia?')) return;

    this.svc.delete(id).subscribe();  // BehaviorSubject actualiza tabla solo
  }
}