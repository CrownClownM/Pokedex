import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainAuthComponent } from './pages/main-auth/main-auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path: '',
    component: MainAuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
