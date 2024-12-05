
console.time('Start');
function typeChangeonChange(index) {
  let personInfo = {
    contactInformation: [{
      'value': '',
      'companyId': '',
      'streetAddress': '',
      'suiteFloor': '',
      'building': '',
      'city': '',
      'stateProvidenceDistrict': '',
      'postalCode': '',
      'country': '',
    }]
  };
  personInfo.contactInformation[index].value = '';
  personInfo.contactInformation[index].companyId = '';
  personInfo.contactInformation[index].streetAddress = '';
  personInfo.contactInformation[index].suiteFloor = '';
  personInfo.contactInformation[index].building = '';
  personInfo.contactInformation[index].city = '';
  personInfo.contactInformation[index].stateProvidenceDistrict = '';
  personInfo.contactInformation[index].postalCode = '';
  personInfo.contactInformation[index].country = '';
}

typeChangeonChange(0);
console.timeEnd('Start');

console.log('-------------------------------------------');

console.time("code refactor 1");

function typeChangeonChange1(index) {
  let personInfo = {
    contactInformation: [{
      'value': '',
      'companyId': '',
      'streetAddress': '',
      'suiteFloor': '',
      'building': '',
      'city': '',
      'stateProvidenceDistrict': '',
      'postalCode': '',
      'country': '',
    }]
  };
  // Reset fields in contactInformation at the given index
  personInfo.contactInformation[index] = {
    ...personInfo.contactInformation[index],
    value: '',
    companyId: '',
    streetAddress: '',
    suiteFloor: '',
    building: '',
    city: '',
    stateProvidenceDistrict: '',
    postalCode: '',
    country: '',
  };
}
typeChangeonChange1(0);

console.timeEnd("code refactor 1");
console.time("code refactor 2");

function typeChangeonChange1(index) {
  let personInfo = {
    contactInformation: [{
      'value': '',
      'companyId': '',
      'streetAddress': '',
      'suiteFloor': '',
      'building': '',
      'city': '',
      'stateProvidenceDistrict': '',
      'postalCode': '',
      'country': '',
    }]
  };
  fieldsToClear = [
    'value',
    'companyId',
    'streetAddress',
    'suiteFloor',
    'building',
    'city',
    'stateProvidenceDistrict',
    'postalCode',
    'country'
  ];
  // Reset fields in contactInformation at the given index
  fieldsToClear.
    forEach
    (
      (field) => {
        personInfo.contactInformation[index][field] = '';
      });
}
typeChangeonChange1(0);

console.timeEnd("code refactor 2");

console.time("code refactor 3");

function typeChangeonChange1(index) {
  let personInfo = {
    contactInformation: [{
      'value': '',
      'companyId': '',
      'streetAddress': '',
      'suiteFloor': '',
      'building': '',
      'city': '',
      'stateProvidenceDistrict': '',
      'postalCode': '',
      'country': '',
    }]
  };
  // cle
  function clearFields(obj, fields) {
    fields.forEach((field) => {
      obj[field] = '';
    });
  }
  // gfdg
  const contactInfo = personInfo.contactInformation[index];

  clearFields(contactInfo, [
    'value',
    'companyId',
    'streetAddress',
    'suiteFloor',
    'building',
    'city',
    'stateProvidenceDistrict',
    'postalCode',
    'country'
  ]);


}
typeChangeonChange1(0);

console.timeEnd("code refactor 3");

