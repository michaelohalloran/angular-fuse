import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompositeComponent } from './composite/composite.component';
import { PropertySelectorComponent } from './composite/property-selector/property-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    CompositeComponent,
    PropertySelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
