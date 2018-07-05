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
