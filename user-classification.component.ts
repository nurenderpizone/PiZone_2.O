function checkUserClassification(row: any, isSelectAll: any, isDeSelectAll: any) {
    if (isSelectAll) {
        if (this.personCreate.companyName.some((company: any) => company.companyId == this.personCreate.allData.systemSettingsApplicationOwnerCompany.id)) {
            let classification = [
                { 'id': 'Administrator (Application)', 'itemName': 'Administrator (Application)', 'isDisabled': false },
                { 'id': 'Administrator (System)', 'itemName': 'Administrator (System)', 'isDisabled': false },
                { 'id': 'Administrator (User)', 'itemName': 'Administrator (User)', 'isDisabled': false },
                { 'id': 'User (Internal)', 'itemName': 'User (Internal)', 'isDisabled': false },
                { 'id': 'Administrator (External Company)', 'itemName': 'Administrator (External Company)', 'isDisabled': false }
            ];
            row.classification = classification
        } else {
            let classification = [
                { 'id': 'Administrator (Application)', 'itemName': 'Administrator (Application)', 'isDisabled': false },
                { 'id': 'Administrator (System)', 'itemName': 'Administrator (System)', 'isDisabled': false },
                { 'id': 'Administrator (User)', 'itemName': 'Administrator (User)', 'isDisabled': false },
                { 'id': 'User (External)', 'itemName': 'User (External)', 'isDisabled': false },
                { 'id': 'Administrator (External Company)', 'itemName': 'Administrator (External Company)', 'isDisabled': false }
            ];
            row.classification = classification
        }

    } else if (isDeSelectAll) {
        row.classification = []
    }
    if (row.classification.findIndex((item: any) => item.id == 'User (Internal)') != -1) {
        return true
    } else {
        return false
    }
}


//   
function checkUserClassification1(row: any, isSelectAll: any, isDeSelectAll: any): boolean {
    // Define common classifications
    const baseClassifications = [
        { id: 'Administrator (Application)', itemName: 'Administrator (Application)', isDisabled: false },
        { id: 'Administrator (System)', itemName: 'Administrator (System)', isDisabled: false },
        { id: 'Administrator (User)', itemName: 'Administrator (User)', isDisabled: false },
        { id: 'Administrator (External Company)', itemName: 'Administrator (External Company)', isDisabled: false },
    ];

    // Determine classifications based on conditions
    if (isSelectAll) {
        const additionalClassification = this.personCreate.companyName.some(
            (company: any) => company.companyId === this.personCreate.allData.systemSettingsApplicationOwnerCompany.id
        )
            ? { id: 'User (Internal)', itemName: 'User (Internal)', isDisabled: false }
            : { id: 'User (External)', itemName: 'User (External)', isDisabled: false };

        row.classification = [...baseClassifications, additionalClassification];
    } else if (isDeSelectAll) {
        row.classification = [];
    }

    // Check for 'User (Internal)' in classification
    return row.classification.some((item: any) => item.id === 'User (Internal)');
}