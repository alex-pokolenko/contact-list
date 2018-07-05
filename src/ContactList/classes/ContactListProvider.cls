public class ContactListProvider implements ProviderInterface {

  public static String remoteRequest(String methodName, String params) {
    String result;

    switch on methodName {
      when 'initColumns' {
        result = JSON.serialize(ContactListService.initColumns());
      }
      when 'getContacts' {

      }
    }

    return result;
  }
}