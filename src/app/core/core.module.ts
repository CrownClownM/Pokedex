import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavBarComponent
  ],
  exports: [
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class CoreModule { }
