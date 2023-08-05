import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { UserComponent } from './pages/user/user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokeFavComponent } from './components/poke-fav/poke-fav.component';


@NgModule({
  declarations: [
    UserComponent,
    FormComponent,
    PokeFavComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProtectedModule { }
