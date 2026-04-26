import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth').then(m => m.Auth)
  },
  {
    path: 'resume',
    loadComponent: () => import('./resume/resume').then(m => m.Resume),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
