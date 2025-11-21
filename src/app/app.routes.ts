import { Routes } from '@angular/router';
import { PublicCvComponent } from './pages/public-cv/public-cv.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminFormComponent } from './pages/admin/admin-form/admin-form.component';

export const routes: Routes = [
  { path: '', component: PublicCvComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/new', component: AdminFormComponent },
  { path: 'admin/edit/:id', component: AdminFormComponent },
  { path: '**', redirectTo: '' },
];
