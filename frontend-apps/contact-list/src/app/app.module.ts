import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiComponentsModule } from './common/ui-components/ui-components.module';
import { ContactViewComponent } from './contacts-view/contacts-view.component';
import { ContactFilterComponent } from './contact-filter/contact-filter.component';
import { CoreModule } from './core/core.module';
import { ContactTableComponent } from './contact-table/contact-table.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { DynamicInputComponent } from './contact-form/dynamic-input/dynamic-input.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactViewComponent,
    ContactFilterComponent,
    ContactTableComponent,
    ContactFormComponent,
    DynamicInputComponent
  ],
  imports: [
    BrowserModule,
    UiComponentsModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
