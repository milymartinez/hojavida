import { Component, OnInit } from '@angular/core';
import { ExperiencesService } from '../../../services/experiences.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-list',
  imports: [CommonModule],
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent implements OnInit {
  items: any[] = [];
  constructor(private svc: ExperiencesService, public router: Router) {}

  ngOnInit(){ this.load(); }

  load(){ this.svc.getAll().subscribe(r => this.items = r); }

  delete(id: string){
    if(!confirm('¿Eliminar esta experiencia?')) return;
    this.svc.delete(id).subscribe(()=> this.load(), err => alert('Error al eliminar'));
  }
}
