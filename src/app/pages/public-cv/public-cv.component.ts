import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from '../../services/experiences.service';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-public-cv',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-cv.component.html',
  styleUrl: './public-cv.component.css',
  encapsulation: ViewEncapsulation.None,
  
})
export class PublicCvComponent {
  experiences$: Observable<Experience[]>;

  constructor(public svc: ExperiencesService) {
    this.experiences$ = this.svc.getAll(); // ✔ AHORA SÍ EXISTE
  }
}
