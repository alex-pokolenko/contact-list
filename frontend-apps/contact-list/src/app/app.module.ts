import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiComponentsModule } from './common/ui-components/ui-components.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFilterComponent } from './contact-filter/contact-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFilterComponent
  ],
  imports: [
    BrowserModule,
    UiComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
