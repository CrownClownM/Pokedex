import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  miFormulario: FormGroup = this.fb.group({
    name:     ['medina',  [ Validators.required, Validators.minLength(3) ]],
    email:    ['medina@example.com', [ Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}") ]],
    password: ['Password1', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor(private fb:FormBuilder, private auth:AuthService, private router:Router) { }

  campoValido(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  register() {
    let { name, email, password } = this.miFormulario.value;
    name = name.replace(/\s{2,}/g, ' ').trim();
    email = email.replace(/\s{2,}/g, ' ').trim();
    this.auth.registerAndLogin( name, email, password )
      .subscribe({
        next: (user:any) => {
          if ( user ) {
            this.router.navigateByUrl('/user');
            Swal.fire({
              icon: 'success',
              title: 'Cuenta creada correctamente',
            })
          } 
        },
        error: (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.error.message,
          })
        }
    }); 
  }

}
