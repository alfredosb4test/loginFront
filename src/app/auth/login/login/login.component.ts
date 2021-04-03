import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  public loginForm = this.fb.group({
    email: ['test1@gmail.com',  Validators.required ],
    password: ['123',  Validators.required ]
  });

  constructor(
    private fb: FormBuilder,
    public _usuarioService:UsuarioService,
  	public router: Router) { }

  login(){
    this._usuarioService.login( this.loginForm.value )
      .subscribe( resp =>{
        this.router.navigateByUrl('/dashboard');
        
      }, (err) =>{
        console.log(err.error.ok);
        swal.fire('Error', err.error.mensaje, 'error');
      })
  }

}
