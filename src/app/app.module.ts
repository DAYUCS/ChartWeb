import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InvoiceApiProvider } from '../providers/invoice-api/invoice-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InvoiceApiProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
