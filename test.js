// hello  ok ok ok ok ok



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
