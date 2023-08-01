import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { EventoDeportivoListComponent } from './evento-deportivo-list/evento-deportivo-list.component';
import { EventoDeportivoDetailComponent } from './evento-deportivo-detail/evento-deportivo-detail.component';
import { EventoDeportivoCreateComponent } from './evento-deportivo-create/evento-deportivo-create.component';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    AppHeaderModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [EventoDeportivoListComponent,EventoDeportivoDetailComponent, EventoDeportivoCreateComponent],
  exports: [EventoDeportivoListComponent,EventoDeportivoDetailComponent, EventoDeportivoCreateComponent]
})

export class EventoDeportivoModule { }
