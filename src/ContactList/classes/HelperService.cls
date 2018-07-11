public class HelperService {

  /**
   * Get members of the specified fieldset 
   * @param  sObjectType  name of sObject
   * @param  fieldSetName name of fieldset
   * @return              list of fieldset members or NULL if fieldset doesn't exist
   */
  public static List<Schema.FieldSetMember> getFieldSetMembers(String sObjectType, String fieldSetName) {
    List<Schema.FieldSetMember> fieldSetMembers;

    List<DescribeSObjectResult> describeResults = Schema.describeSObjects(
      new List<String> {sObjectType}
    );

    if (!describeResults.isEmpty()) {
      Schema.FieldSet fieldSetDescribe = describeResults[0].fieldSets.getMap().get(fieldSetName);
      if (fieldSetDescribe != NULL) {
        fieldSetMembers = fieldSetDescribe.fields;
      }
    }

    return fieldSetMembers;
  }

  /**
   * Get map of sObject fields
   * @param  sObjectType sname of sObject
   * @return             map of sObject fields
   */
  public static Map<String, SObjectField> getSobjectFields(String sObjectType) {
    Map<String, SObjectField> fieldMap;

    List<DescribeSObjectResult> describeResults = Schema.describeSObjects(
      new List<String> {sObjectType}
    );

    if (!describeResults.isEmpty()) {
      fieldMap = describeResults[0].fields.getMap();
    }

    return fieldMap;
  }
}