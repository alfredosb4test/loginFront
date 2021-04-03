import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../config/config'; 

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// import swal from 'sweetalert2';
 

@Injectable()
export class UsuarioService {
	// usuario: Usuario;
	// token:string;
  menu:any[] = [];

  constructor(public http: HttpClient,
  			      public router: Router ) { 
  	console.log("usuario.service listo")
  	//this.cargarStorage();
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    let url = URL_SERVICIOS + '/login/renuevatoken';
    return this.http.get(url, {
      headers:{
        'x-token': token
      }
    }).pipe(
      tap( resp => console.log( resp ) ),
      map( resp => true ),
      catchError( error => of(false) )
    );
    
  }
  estaLogeado(){
    // return (this.token.length > 1) ? true : false;
  }

  // cargarStorage(){
  // 	if(localStorage.getItem('token')){
  // 		this.token = localStorage.getItem('token');
  //     this.usuario = JSON.parse(localStorage.getItem('usuario') );    
  // 		this.menu = JSON.parse(localStorage.getItem('menu') );  	
  // 	}else{
  // 		this.token = '';
  // 		this.usuario = null;
  //     this.menu = [];
  // 	}
  // }



  logout(){
  	// this.usuario = null;
  	// this.token = '';
    console.log('salir');
    
  	localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  	this.router.navigate(['/login']);
  }



  login( usuario: Usuario){

  	let url = URL_SERVICIOS + '/login';
  	return this.http.post(url, usuario)
  		.pipe(
        tap( (resp: any)=>{ 
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            localStorage.setItem('id', resp.id);
            localStorage.setItem('token', resp.token);
            localStorage.setItem('usuario', JSON.stringify( resp.usuario) );
            return true;
          
        })
      )
  }

  crearUsuario( usuario: Usuario ){

  	let url = URL_SERVICIOS+'/usuario';
  	return this.http.post( url, usuario)
    .pipe(
      tap( (resp: any)=>{ 
        localStorage.setItem('token', resp.token);
      })
    )
  }

  guardarStorage( id:string, token:string, usuario: Usuario){
  	localStorage.setItem('id', id);
  	localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ) );

  	// this.usuario = usuario;
  	// this.token = token;
    // this.menu = menu;
  }
}
