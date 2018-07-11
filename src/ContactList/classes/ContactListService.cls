public class ContactListService {
  private static final String OBJECT_TYPE = 'Contact';
  private static final String FIELDSET_NAME = 'Contacts_Page';

  public static List<Schema.FieldSetMember> initColumns() {
    // 
    List<Schema.FieldSetMember> fsMembers = HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME);
    return fsMembers;
  }

  public static List<sObject> getRecords(String filter) {
    /* TODO: limit records numper by implementing server-side pagination */

    String queryFilter = getFilterQuery(
      (Map<String, Object>)JSON.deserializeUntyped(filter)
    );

    String query = 'SELECT ';
    for(Schema.FieldSetMember field : HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME)) {
      query += field.getFieldPath() + ', ';
    }

    query += 'Id FROM ' + OBJECT_TYPE + queryFilter;

    return Database.query(query);
  }

  private static String getFilterQuery(Map<String, Object> filterMap) {
    String filter = '';
    for (String fieldName : filterMap.keySet()) {
      String fieldValue = (String)filterMap.get(fieldName);

      if (!String.isBlank(fieldValue))
        // TODO: LIKE will only work for string types. Need to cast types properly.
        filter += fieldName + ' LIKE \'%' + String.escapeSingleQuotes(fieldValue) + '%\' AND ';

        // filter += fieldName + ' = \'' + String.escapeSingleQuotes(fieldValue) + '\' AND ';
    }

    if (!String.isBlank(filter)) {
      filter = ' WHERE ' + filter.removeEnd(' AND ');
    }

    return filter;
  }

  public static Database.UpsertResult saveRecord(String jsonRecord) {
    Map<String, Object> recordFieldsMap = (Map<String, Object>) JSON.deserializeUntyped(jsonRecord);

    Schema.SObjectType targetType = Schema.getGlobalDescribe().get(OBJECT_TYPE);
    SObject targetRecord = targetType.newSObject();

    for (String fieldName : recordFieldsMap.keySet()) {
      Object fieldValue = recordFieldsMap.get(fieldName);
      targetRecord.put(fieldName, fieldValue);
    }

    Database.UpsertResult saveResult = Database.upsert(targetRecord);

    return saveResult;
  }
}