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

  public static Map<String, Object> lookupFilter(String params) {
    Map<String, Object> paramsMap = (Map<String, Object>)JSON.deserializeUntyped(params);
    Map<String, Object> resultMap = new Map<String, Object>();
    String searchStr = (String) paramsMap.get('searchString');
    String searchObj = (String) paramsMap.get('searchObject');
    searchObj = Type.forName(searchObj).getName();

    // provides WHERE condition
    String filterStr = (String) paramsMap.get('filterString');

    searchStr = '\'*' + searchStr + '*\'';
    if (filterStr == NULL)
      filterStr = '';

    String soslQuery = 
      'FIND :searchStr ' + 
      'IN NAME FIELDS RETURNING ' + searchObj + 
      ' (Id, Name ' + filterStr + ' ORDER BY Name) LIMIT 10';
    List<List<SObject>> results =  Search.query(soslQuery);
    List<Object> resultList = new List<Object>();
    if (results.size() > 0) {
      for (SObject sobj : results[0]) {
        Map<String,Object> tmp = new Map<String,Object>{
          'id' => sobj.get('Id'),
          'name' => sobj.get('Name')
        };
        resultList.add(tmp);
      }
    }
    resultMap.put('data', resultList);

    return resultMap;
  }

}