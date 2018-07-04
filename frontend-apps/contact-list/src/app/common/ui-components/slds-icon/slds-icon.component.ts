import { Component, OnInit, Input } from '@angular/core';

declare global {
  interface Window {
    sldsConfig: {
      sldsIconsPath: string
    };
  }
}

/**
 * Provides a wrapper for slds svg icon
 *
 * @export
 * @class SldsIconComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-slds-icon',
  templateUrl: './slds-icon.component.html',
  styleUrls: ['./slds-icon.component.scss']
})
export class SldsIconComponent implements OnInit {
  /**
   * Relative path to the icon asset.
   * This will typically be equal to the path specified in SLDS examples
   *
   * @type {string}
   * @memberof SldsIconComponent
   */
  @Input() path: string;

  /**
   * Whitespace separated list of classess to be applied to svg element
   *
   * @type {string}
   * @memberof SldsIconComponent
   */
  @Input() styling: string;

  /**
   * Base url of the resource containing slds icons
   *
   * @private
   * @memberof SldsIconComponent
   */
  private sldsIconsPath = window.sldsConfig.sldsIconsPath;

  constructor() {}

  ngOnInit() {}

  /**
   * Fully qualified path to the icon
   *
   * @readonly
   * @type {string}
   * @memberof SldsIconComponent
   */
  get iconPath(): string {
    return this.sldsIconsPath + this.path;
  }
}
