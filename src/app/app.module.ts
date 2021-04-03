import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioService } from './services/usuario.service';

// Routes
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login/login.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { NopagefoundComponent } from './page/nopagefound/nopagefound.component';
import { GraficasComponent } from './page/graficas/graficas.component';
import { UsuariosComponent } from './page/usuarios/usuarios.component';
import { PagesComponent } from './page/pages.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NopagefoundComponent,
    GraficasComponent,
    UsuariosComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
