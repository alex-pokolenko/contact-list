public class ContactListService {
  private static final String OBJECT_TYPE = 'Contact';
  private static final String FIELDSET_NAME = 'Contacts_Page';

  public static String initColumns() {
    // 
    List<Schema.FieldSetMember> fsMembers = HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME);
    return JSON.serialize(fsMembers);
  }
}