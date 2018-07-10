import {Injectable} from '@angular/core';

declare global {
  interface Window {
    remotingConfig: {
      VISUALFORCE_CONTROLLER: string
    };
  }
}

const REMOTING_OPTIONS = {
  buffer: true,
  timeout: 120000,
  escape: false
};

@Injectable()
export class SfdcRemotingService {

  private remotingConfig;

  constructor() {
    if (window.remotingConfig) {
      this.remotingConfig = window.remotingConfig;
    }
  }

  /**
   * Parse raw response from SFDC
   *
   * @private
   * @param {*} response result of remote action in JSON
   * @returns {*} parsed object
   * @memberof SfdcRemotingService
   */
  private parseSfdcJson(response): any {
    let result = {};
    try {
      let jsonResult = response;
      // SFDC json string may include unescaped "new line"(\n,\r) delimiters
      jsonResult = jsonResult.replace(/\n/g, '').replace(/\r/, '');
      result = JSON.parse(jsonResult);
    } catch (error) {
      result = response;
    }
    return result;
  }

  /**
   * Call remote action from SFDC
   *
   * @param {string} serviceName name of service to be called
   * @param {string} methodName name of service method to be called
   * @param {*} [params={}] acton parameters
   * @returns {Promise<any>} async result of remote action
   * @memberof SfdcRemotingService
   */
  remoteRequest(serviceName: string, methodName: string, params: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.remotingConfig) {
        this.remotingConfig.VISUALFORCE_CONTROLLER.remoteRequest(
          serviceName,
          methodName,
          JSON.stringify(params),
          (response, event) => {
            if (event.status) {
              resolve(this.parseSfdcJson(response));
            } else {
              reject(event);
            }
          },
          REMOTING_OPTIONS
        );
      } else {
        reject('No remoting configuration provided.');
      }
    });
  }
}
