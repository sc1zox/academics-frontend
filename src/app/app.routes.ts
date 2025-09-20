import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../app/features/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {
        path: 'home',
        loadComponent: () => import('../app/features/home-page/home-page.component').then(m => m.HomePageComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../app/features/dashboard-page/dashboard-page.component').then(m => m.DashboardPageComponent),
      }
    ]
  },


];
