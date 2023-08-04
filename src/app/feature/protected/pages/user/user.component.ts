import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/interfaces/auth.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  profile !: RegisterResponse;
  flag: boolean = false;

  constructor(private auth: AuthService, private router:Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.auth.getProfile()
    .subscribe(profile => this.profile = profile);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

  regresar() {
    this.router.navigate(['/']);
  }

  dialogFormEdit(data:RegisterResponse) {
    const dialogRef = this.dialog.open(FormComponent, {data});

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
