import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class UtilsModule {
  private static uniqueCounter = 0;

  /**
   * generate unique string id for DOM element
   * @param  {string} name static part of id string
   * @return {string}      static part followed by unique counter ('uniqueId_1')
   */
  static getUniqueId(name: string): string {
    name = name || 'uniqueId';
    return `${name}-${this.uniqueCounter++}`;
  }
}
