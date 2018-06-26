import { Component } from '@angular/core';

declare global {
  interface Window {
    sldsConfig: {
      sldsIconsPath: string
    };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * TODO: move this logic to slds-icon component
   */
  private sldsIconsPath = window.sldsConfig.sldsIconsPath;

  sldsPath(icon: string): string {
    return this.sldsIconsPath + icon;
  }
}
