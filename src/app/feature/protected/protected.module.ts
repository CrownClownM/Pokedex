import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    UserComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule
  ]
})
export class ProtectedModule { }
