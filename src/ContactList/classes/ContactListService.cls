public class ContactListService {
  private static final String OBJECT_TYPE = 'Contact';
  private static final String FIELDSET_NAME = 'Contacts_Page';

  public static List<Schema.FieldSetMember> initColumns() {
    // 
    List<Schema.FieldSetMember> fsMembers = HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME);
    return fsMembers;
  }

  public static List<sObject> getRecords(String filter) {
    /* TODO: limit records number by implementing server-side pagination */
    Map<String, Object> filterMap = (Map<String, Object>)JSON.deserializeUntyped(filter);
    filter = '';
    Date dateValue;

    Map<String, SObjectField> sObjectFieldMap = HelperService.getSobjectFields(OBJECT_TYPE);

    for (String fieldName : filterMap.keySet()) {
      String fieldValue = (String)filterMap.get(fieldName);

      // TODO: fieldDescribe == NULL is a temporary workaround for relationship fields like Account.Name
      Schema.DescribeFieldResult fieldDescribe = sObjectFieldMap.containsKey(fieldName) ? sObjectFieldMap.get(fieldName).getDescribe() : NULL;
      if (!String.isBlank(fieldValue) && (fieldDescribe == NULL || fieldDescribe.isFilterable()))
        // TODO: LIKE will only work for string types. Need to cast types properly.
        if (fieldDescribe == NULL || fieldDescribe.getType() == DisplayType.STRING) {
          filter += fieldName + ' LIKE \'%' + String.escapeSingleQuotes(fieldValue) + '%\' AND ';
        } 
        else if (fieldDescribe.getType() == DisplayType.DATE) {
          // TODO: this binding will not work for more than one Date field
          dateValue = Date.valueOf(fieldValue);
          filter += fieldName + ' = :dateValue AND ';
        } 
        else if (fieldDescribe.getType() == DisplayType.REFERENCE) {
          filter += fieldName + ' = \'' + String.escapeSingleQuotes(fieldValue) + '\' AND ';
        } 
        else if (fieldDescribe.getType() == DisplayType.DOUBLE || fieldDescribe.getType() == DisplayType.INTEGER) {
          filter += fieldName + ' = ' + String.escapeSingleQuotes(fieldValue) + ' AND ';
        }
    }

    if (!String.isBlank(filter)) {
      filter = ' WHERE ' + filter.removeEnd(' AND ');
    }

    String queryFilter = filter;

    String query = 'SELECT ';
    Set<String> fieldsToSelect = new Set<String>();
    for(Schema.FieldSetMember field : HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME)) {
      // if field type is reference, also get Name field for related object to populate lookup input.
      if (field.getType() == DisplayType.REFERENCE) {
        String relatedRecordName;

        Schema.DescribeFieldResult fieldDescribe = sObjectFieldMap.get(field.fieldpath).getDescribe();
        Schema.sObjectType relatedObjectType = fieldDescribe.getReferenceTo()[0];
        relatedRecordName = relatedObjectType.getDescribe().getName() + '.Name';

        fieldsToSelect.add(relatedRecordName);
      }
      fieldsToSelect.add(field.getFieldPath());
    }
    String fields = String.join(new List<String>(fieldsToSelect), ', ');

    query += fields + ', Id FROM ' + OBJECT_TYPE + queryFilter;
    return Database.query(query);
  }

  public static Database.UpsertResult saveRecord(String jsonRecord) {
    Map<String, Object> recordMap = (Map<String, Object>) JSON.deserializeUntyped(jsonRecord);
    System.debug(recordMap);

    SObject targetRecord = DynamicSObjectService.createSObjectRecord(recordMap, OBJECT_TYPE);

    Database.UpsertResult saveResult = Database.upsert(targetRecord);

    return saveResult;
  }
}