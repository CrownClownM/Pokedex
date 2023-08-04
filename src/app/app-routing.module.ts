import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectGuard } from './feature/auth/guards/redirect.guard';
import { ValidateTokenGuard } from './feature/auth/guards/validate-token.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/home/home.module').then( m => m.HomeModule )
  },
  {
    path: 'auth',
    loadChildren: () => import('./feature/auth/auth.module').then( m => m.AuthModule ),
    canActivate: [RedirectGuard],
  },    
  {
    path: 'user',
    loadChildren: () => import('./feature/protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ValidateTokenGuard],
  },  
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
