import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiComponentsModule } from './common/ui-components/ui-components.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFilterComponent } from './contact-filter/contact-filter.component';
import { CoreModule } from './core/core.module';
import { ContactTableComponent } from './contact-table/contact-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactFilterComponent,
    ContactTableComponent
  ],
  imports: [
    BrowserModule,
    UiComponentsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
