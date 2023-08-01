import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { ApuestaCreateComponent } from './apuesta-create/apuesta-create.component';
import { ApuestaDetailComponent } from './apuesta-detail/apuesta-detail.component';
import { ApuestaEditComponent } from './apuesta-edit/apuesta-edit.component';
import { ApuestaListComponent } from './apuesta-list/apuesta-list.component';

import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [ApuestaListComponent, ApuestaDetailComponent, ApuestaCreateComponent, ApuestaEditComponent],
  imports: [
    CommonModule, AppHeaderModule, ReactiveFormsModule,FormsModule, HttpClientModule,
    Ng2SearchPipeModule,NgxPaginationModule
  ],
  exports: [ApuestaListComponent, ApuestaDetailComponent, ApuestaCreateComponent, ApuestaEditComponent]
})
export class ApuestaModule { }
