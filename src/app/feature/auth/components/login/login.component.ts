import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email:    ['john@mail.com', [ Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}") ]],
    password: ['changeme', [ Validators.required, Validators.minLength(6) ]],
  });

  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private auth:AuthService) { }

  campoValido(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  login() {
    const { email, password } = this.miFormulario.value;
    this.auth.login( email, password ).subscribe({
      next: (resp:any) => {
        if (resp) {
          this.router.navigateByUrl('/user');
        } 
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })
      },
    });
  }

}
