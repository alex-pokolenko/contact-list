import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SfdcRemotingService } from './sfdc-remoting/sfdc-remoting.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [SfdcRemotingService]
})
export class CoreModule { }
