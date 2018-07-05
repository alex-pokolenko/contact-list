public class ContactListService {
  private static final String OBJECT_TYPE = 'Contact';
  private static final String FIELDSET_NAME = 'Contacts_Page';

  public static List<Schema.FieldSetMember> initColumns() {
    // 
    List<Schema.FieldSetMember> fsMembers = HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME);
    return fsMembers;
  }

  public static List<sObject> getRecords() {
    String query = 'SELECT ';
    for(Schema.FieldSetMember field : HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME)) {
      query += field.getFieldPath() + ', ';
    }

    query += 'Id FROM ' + OBJECT_TYPE;
    return Database.query(query);
  }
}