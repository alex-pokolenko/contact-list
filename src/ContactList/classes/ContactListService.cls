public class ContactListService {
  private static final String OBJECT_TYPE = 'Contact';
  private static final String FIELDSET_NAME = 'Contacts_Page';

  /**
   * TODO: return additional details of DescribeFieldResult
   * @return   return description
   */
  public static List<Object> initColumns() {
    List<Schema.FieldSetMember> fsMembers = HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME);
    Map<String, SObjectField> sObjectFieldMap = HelperService.getSobjectFields(OBJECT_TYPE);

    List<Object> fieldsetDescribe = new List<Object>();
    for (Schema.FieldSetMember fsMember : fsMembers) {
      Schema.DescribeFieldResult fieldDescribe = sObjectFieldMap.containsKey(fsMember.getFieldPath()) ? sObjectFieldMap.get(fsMember.getFieldPath()).getDescribe() : NULL;

      Map<String, Object> fieldDescribeMap;
      if (fieldDescribe != NULL) {
        // TODO: include other info
        fieldDescribeMap = new Map<String, Object> {
          'dbRequired' => fsMember.getDbRequired(),
          'fieldPath' => fsMember.getFieldPath(),
          'label' => fsMember.getLabel(),
          'type' => fsMember.getType().name().toLowerCase(), // TODO: also pass DisplayType.values() to frontend to replace hardcode
          'isFilterable' => fieldDescribe.isFilterable()
        };

        if (fieldDescribe.getType() == DisplayType.REFERENCE) {
          List<Schema.sObjectType> relatedObjectType = fieldDescribe.getReferenceTo();
          String relatedObjectName = relatedObjectType != NULL && !relatedObjectType.isEmpty()
            ? relatedObjectType[0].getDescribe().getName()
            : NULL;
          fieldDescribeMap.put('relatedObjectType', relatedObjectName);
        }
      }

      fieldsetDescribe.add(fieldDescribeMap);
    }
    return fieldsetDescribe;
  }

  public static List<sObject> getRecords(String filter) {
    /* TODO: limit records number by implementing server-side pagination */
    Map<String, Object> filterMap = (Map<String, Object>)JSON.deserializeUntyped(filter);

    String queryFilter = getFilterQuery(filterMap, OBJECT_TYPE);

    String query = 'SELECT ';
    Set<String> fieldsToSelect = new Set<String>();

    Map<String, SObjectField> sObjectFieldMap = HelperService.getSobjectFields(OBJECT_TYPE);

    for (Schema.FieldSetMember field : HelperService.getFieldSetMembers(OBJECT_TYPE, FIELDSET_NAME)) {
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

  private static String getFilterQuery(Map<String, Object> filterMap, String objectType) {
    String filter = '';

    Map<String, SObjectField> sObjectFieldMap = HelperService.getSobjectFields(objectType);

    for (String fieldName : filterMap.keySet()) {
      String fieldValue = (String)filterMap.get(fieldName);

      // TODO: fieldDescribe == NULL is a temporary workaround for relationship fields like Account.Name
      Schema.DescribeFieldResult fieldDescribe = sObjectFieldMap.containsKey(fieldName) ? sObjectFieldMap.get(fieldName).getDescribe() : NULL;
      if (!String.isBlank(fieldValue) && (fieldDescribe == NULL || fieldDescribe.isFilterable())) {
        // TODO: this can be improved to reuse DynamicSObjectService.castStringToFieldType
        if (fieldDescribe == NULL || fieldDescribe.getType() == DisplayType.STRING) {
          filter += fieldName + ' LIKE \'%' + String.escapeSingleQuotes(fieldValue) + '%\' AND ';
        } 
        else if (fieldDescribe.getType() == DisplayType.REFERENCE) {
          filter += fieldName + ' = \'' + String.escapeSingleQuotes(fieldValue) + '\' AND ';
        } 
        else if (fieldDescribe.getType() == DisplayType.DATE || 
                 fieldDescribe.getType() == DisplayType.DOUBLE || 
                 fieldDescribe.getType() == DisplayType.INTEGER) 
        {
          filter += fieldName + ' = ' + String.escapeSingleQuotes(fieldValue) + ' AND ';
        }
      }
    }

    if (!String.isBlank(filter)) {
      filter = ' WHERE ' + filter.removeEnd(' AND ');
    }

    return filter;
  }
}