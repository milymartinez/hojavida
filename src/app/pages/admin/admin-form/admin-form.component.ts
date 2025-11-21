import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExperiencesService } from '../../../services/experiences.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Experience } from '../../../models/experience.model';


@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-form.component.html'
})
export class AdminFormComponent implements OnInit {

  form!: FormGroup;   // ← SE DECLARA VACÍO (con !)

  id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private svc: ExperiencesService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {

    // AHORA SÍ: fb YA ESTÁ INICIALIZADO
    this.form = this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      description: ['']
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.svc.getById(this.id).subscribe(exp => {
        if (exp) {
          this.form.patchValue({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            description: exp.description || ''
          });
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const value = this.form.value as Omit<Experience, '_id'>;

    if (this.id) {
      this.svc.update(this.id, value).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.svc.create(value).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
