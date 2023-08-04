import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './components/card/card.component';
import { Material_Modules } from './components/material/material.index';
import { PokeidPipe } from './pipes/pokeid.pipe';
import { PaginatorComponent } from './components/material/paginator/paginator.component';

@NgModule({
  declarations: [
    CardComponent,
    PaginatorComponent,
    PokeidPipe
  ],
  exports: [
    CardComponent,
    PaginatorComponent,
    Material_Modules
  ],
  imports: [
    CommonModule,
    Material_Modules
  ]
})
export class SharedModule { }
