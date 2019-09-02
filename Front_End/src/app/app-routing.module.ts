import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GruposComponent} from './grupos/grupos.component';
import {ProjetosComponent} from './projetos/projetos.component';
import {HomeComponent} from './home/home.component';
const routes: Routes = [

  {path: 'grupos', component: GruposComponent},
  {path: 'projetos', component: ProjetosComponent},
  {path: '', component: HomeComponent},
  
  
  ];
  
  @NgModule({imports: [RouterModule.forRoot(routes)], exports: [RouterModule]})
  export class AppRoutingModule {
  }
  