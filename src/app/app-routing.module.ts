import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { GraficasComponent } from './page/graficas/graficas.component';
import { NopagefoundComponent } from './page/nopagefound/nopagefound.component';
import { PagesComponent } from './page/pages.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';


const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent},
      { path: 'graficas', component: GraficasComponent},
      { path: 'usuarios', component: UsuariosComponent},      
    ]
  },
  
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot (routes )
  ],
  exports:[ RouterModule ]
})
export class AppRoutingModule { }
