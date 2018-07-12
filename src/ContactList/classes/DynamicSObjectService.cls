public class DynamicSObjectService {

  public static SObject createSObjectRecord(Map<String, Object> recordMap, String sObjectType) {
    // use Dynamic DML to create a sObject record
    SObject targetRecord = Schema.getGlobalDescribe().get(sObjectType).newSObject();

    Map<String, SObjectField> sObjectFieldMap = HelperService.getSobjectFields(sObjectType);

    for (String fieldName : recordMap.keySet()) {
      String fieldValue = (String)recordMap.get(fieldName);

      if (!sObjectFieldMap.containsKey(fieldName)) {
        continue;
      }
      Schema.DescribeFieldResult fieldDescribe = sObjectFieldMap.get(fieldName).getDescribe();

      // TODO: modify ugly conditions. Check isUpdeteable / isCreateable on frontend.
      if (fieldName == 'Id' || fieldDescribe.isUpdateable() || (recordMap.get('Id') != NULL && fieldDescribe.isCreateable())) {
        Object typeCastedValue = castStringToFieldType(fieldValue, fieldDescribe.getType());
        targetRecord.put(fieldName, typeCastedValue);
      }
    }

    return targetRecord;
  }

  public static Object castStringToFieldType(String stringValue, DisplayType fieldType) {
    Object typeCastedValue;

    if (String.isBlank(stringValue)) {
      return NULL;
    }

    switch on fieldType {
      when ID, REFERENCE, STRING, PICKLIST {
        typeCastedValue = stringValue;
      }
      when INTEGER {
        typeCastedValue = Integer.valueOf(stringValue);
      }
      when DOUBLE {
        typeCastedValue = Double.valueOf(stringValue);
      }
      when DATE {
        typeCastedValue = Date.valueOf(stringValue);
      }
    }

    return typeCastedValue;
  }
}