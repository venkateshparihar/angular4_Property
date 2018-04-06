import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { appConfig, appRoute } from './config';
import { PropertyService } from './services/property.service';
import { InMemoryDataService } from './services/in-memory-data.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  ...appRoute
];


@NgModule({
  declarations: [
    appConfig
  ],
  imports: [
    BrowserModule,
    FormsModule,
     ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes), 
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    Ng2TableModule,
    PaginationModule.forRoot(),
    ChartsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},PropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);