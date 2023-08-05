import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  profile !: RegisterResponse;
  nacimientoMaximo?: string;

  miFormulario: FormGroup = this.fb.group({
    name:     ['', [ Validators.required, Validators.minLength(3)]],
    email:    ['', [ Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,3}")]],
    password: ['', [ Validators.required, Validators.pattern(/^([a-zA-Z0-9]){6,}$/)]],
  });

  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router,@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<FormComponent>) { }

  ngOnInit(): void {
    this.auth.getProfile()
    .subscribe(perfil => {
      this.profile = perfil;
      this.miFormulario.patchValue(perfil)
    })
    
  }

  campoValido(campo:string){
    return this.miFormulario.controls[campo]?.errors && this.miFormulario.controls[campo]?.touched;
  }

  editar() {
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    let {id, avatar} = this.profile;
    let { name, email, password } = this.miFormulario.value;
    name = name.replace(/\s{2,}/g, ' ').trim();
    email = email.replace(/\s{2,}/g, ' ').trim();
    this.auth.edit( id, name, email, password, avatar )
      .subscribe( account => {
        if ( account ) {
          const dialogRef = this.dialog.close(true);
          Swal.fire({
            icon: 'success',
            title: 'Perfecto',
            text: 'Cuenta editada correctamente',
          })
        } else {
          Swal.fire('Error', 'error');
        }
      });
  }

}
