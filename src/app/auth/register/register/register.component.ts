import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  public registerForm = this.fb.group({
    nombre: ['test1', [ Validators.required, Validators.minLength(3) ] ],
    email: ['test1@gmail.com',  Validators.required ],
    password: ['123',  Validators.required ],
    password2: ['123',  Validators.required ],
    condiciones: [false,  Validators.required ],
  }, {validators: this.sonIguales('password', 'password2')});
 
  constructor(
    private fb: FormBuilder,
    public _usuarioService:UsuarioService,
  	public router: Router) { }

  registraUsuario(){
    if(this.registerForm.invalid){
  		return;
  	}
  	if(!this.registerForm.value.condiciones){
  		console.log('alert ');
  		swal.fire('Importante', 'Debe aceptar las condiciones', 'warning');
  		return;
  	}

  	let usuario = new Usuario(
  			this.registerForm.value.nombre,
  			this.registerForm.value.email,
  			this.registerForm.value.password
  		);
    console.log('usr new:', usuario);
      
  	this._usuarioService.crearUsuario( usuario )
  		.subscribe(resp =>{
  			console.log(resp);
  			this.router.navigate(['/dashboard']);
  		},( err )=>{
        console.log(err.error.mensaje)
        swal.fire('Error', err.error.mensaje, 'warning');
      })
  }
  sonIguales(campo1: string, campo2:string){
  	return( group: FormGroup)=>{

  		let pass1 = group.controls[campo1].value;
  		let pass2 = group.controls[campo2].value;

  		if(pass1 === pass2){
  			return null;
  		}

  		return{
  			sonIguales: true
  		}
  	}
  }

}
