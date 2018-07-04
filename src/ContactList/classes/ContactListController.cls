public class ContactListController {

  /**
   * Entry point for JS remoting calls
   * @param  provider    API name of class to handle request
   * @param  methodName  API name of requested method
   * @param  params      Method parameters in JSON format
   * @return             Serialized response
   */
  @RemoteAction
  public static String remoteRequest(String provider, String methodName, String params) {
    String result;

    if (String.isNotBlank(provider) && String.isNotBlank(methodName)) {
      // dynamically instantiate class that will handle remote request
      ProviderInterface pi = (ProviderInterface)Type.forName(provider).newInstance();

      result = pi.remoteRequest(methodName, params);
    }

    return String.isNotBlank(result) ? result : 'NO_RESULT';
  }
}