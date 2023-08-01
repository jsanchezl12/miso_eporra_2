import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppHeaderModule } from './app-header/app-header.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApuestaModule } from './apuesta/apuesta.module';
import { CarreraModule } from './carrera/carrera.module';
import { CompetidorModule } from './competidor/competidor.module';
import { UsuarioModule } from './usuario/usuario.module';


import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EventoDeportivoModule } from './evento-deportivo/evento-deportivo.module';

import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UsuarioModule,
    CarreraModule,
    ApuestaModule,
    AppHeaderModule,
    CompetidorModule,
    FormsModule,
    Ng2SearchPipeModule,
    EventoDeportivoModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
