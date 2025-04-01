import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Componente1Component } from './componente1/componente1.component';
import { Componente3Component } from './componente3/componente3.component';
import { ComponenteerrorComponent } from './componenteerror/componenteerror.component';

export const routes: Routes = [
  { path: 'cadastrar', component: Componente1Component },
  { path: 'alunos', component: Componente3Component, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/cadastrar', pathMatch: 'full' },
  { path: '**',  component: ComponenteerrorComponent}
];
