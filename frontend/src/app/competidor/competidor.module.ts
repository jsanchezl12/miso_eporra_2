import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetidorListComponent } from './competidor-list/competidor-list.component';
import { AppHeaderModule } from '../app-header/app-header.module';
//import { CompetidorComponent } from './competidor.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//npm i ng2-search-filter --save

@NgModule({
  imports: [
    CommonModule,AppHeaderModule, HttpClientModule, FormsModule, Ng2SearchPipeModule
  ],
  exports: [CompetidorListComponent],
  declarations: [CompetidorListComponent]
})
export class CompetidorModule { }
