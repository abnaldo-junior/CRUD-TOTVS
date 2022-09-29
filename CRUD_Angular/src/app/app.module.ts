import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule} from 'ngx-bootstrap/modal';
import { CandidatosService } from './candidatos.service';
import { CandidatosComponent } from './components/candidatos/candidatos.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule,  CandidatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
