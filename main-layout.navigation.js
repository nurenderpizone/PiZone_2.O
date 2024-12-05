
console.time("Start");
function getNavigationData() {
  this.navigationData = {
    'Permission Granted': {
      permissions: [],
    },
    'Work Product Enrollment': {
      permissions: [],
    },
    'General Settings': {
      permissions: [],
    },
    'List': {
      permissions: [],
    },
    'User Permission': {
      permissions: [],
    },
    'Password Settings': {
      permissions: [],
    },
    'Model View': {
      permissions: [],
    },
    'Contact Information': {
      permissions: [],
    },
    'Company Person': {
      permissions: [],
    },
    'Person Company': {
      permissions: [],
    },
    'List Value': {
      permissions: [],
    },
    'Permission Link': {
      permissions: [],
    },
    'PTM': {
      permissions: [],
    },
    'Model Property': {
      permissions: [],
    },
    'Organizational Relationship': {
      permissions: [],
    },
    'Application Owner': {
      permissions: [],
    },
    'Work Product': {
      permissions: [],
    },
    'Administration': {
      permissions: [],
    },
    'Pick List': {
      permissions: [],
    },
    'User Session Operation': {
      permissions: [],
    },
    'Base Model Table': {
      permissions: [],
    },
    'Person Classification': {
      permissions: [],
    },
    'Classification': {
      permissions: [],
    },
    'Navigation': {
      permissions: [],
    },
    'Permission Classification': {
      permissions: [],
    },
    'User Session': {
      permissions: [],
    },
    'Person Name': {
      permissions: [],
    },
    'Property Automation': {
      permissions: [],
    },
    'Company Name': {
      permissions: [],
    },
    'Group Design': {
      permissions: [],
    },
    'Test System Design': {
      permissions: [],
    },
    'Test System': {
      permissions: [],
    },
    'Species': {
      permissions: [],
    },
    'Person': {
      permissions: [],
    },
    'Permission User': {
      permissions: [],
    },
    'System Setting': {
      permissions: [],
    },
    'System Settings': {
      permissions: [],
    },
    'Company': {
      permissions: [],
    },
    'Permission': {
      permissions: [],
    },
    'Unit': {
      permissions: [],
    },
    'User Administration': {
      permissions: [],
    },
    'Email Settings': {
      permissions: [],
    },
    'Communication': {
      permissions: [],
    },
    'Record Manager': {
      permissions: [],
    }, 'Related Create View': {
      permissions: [],
    },
    'Related Company': {
      permissions: [],
    },
    'Contact Management': {
      permissions: [],
    },
    'Location': {
      permissions: [],
    },
    'View Design': {
      permissions: [],
    },
    'Required Qualifier': {
      permissions: [],
    },
    'Related Filter': {
      permissions: [],
    },
    'Validation Qualifier': {
      permissions: [],
    },
    'Related Dependency': {
      permissions: [],
    },
    'Editable Qualifier': {
      permissions: [],
    }, 'View Tab': {
      permissions: [],
    },
    'Display Qualifier': {
      permissions: [],
    },
    'Validation': {
      permissions: [],
    },
    'Related_Dependency': {
      permissions: [],
    },
    'Editable Qualifier Extension': {
      permissions: [],
    },
    'Editable Qualifier Group': {
      permissions: [],
    }, 'Required Qualifier Group': {
      permissions: [],
    },
    'Standard Schedule': {
      permissions: [],
    },
    'Form Design View': {
      permissions: [],
    }, 'Form Design Property': {
      permissions: [],
    }, 'Form Design': {
      permissions: [],
    }, 'Pick List (Property)': {
      permissions: [],
    },
    'Pick List (Common)': {
      permissions: [],
    },
    'Boilerplate Text': {
      permissions: [],
    },
  };
}
getNavigationData();
console.timeEnd("Start");








const keys = [
  'Permission Granted',
  'Work Product Enrollment',
  'General Settings',
  'List',
  'User Permission',
  'Password Settings',
  'Model View',
  'Contact Information',
  'Company Person',
  'Person Company',
  'List Value',
  'Permission Link',
  'PTM',
  'Model Property',
  'Organizational Relationship',
  'Application Owner',
  'Work Product',
  'Administration',
  'Pick List',
  'User Session Operation',
  'Base Model Table',
  'Person Classification',
  'Classification',
  'Navigation',
  'Permission Classification',
  'User Session',
  'Person Name',
  'Property Automation',
  'Company Name',
  'Group Design',
  'Test System Design',
  'Test System',
  'Species',
  'Person',
  'Permission User',
  'System Setting',
  'System Settings',
  'Company',
  'Permission',
  'Unit',
  'User Administration',
  'Email Settings',
  'Communication',
  'Record Manager',
  'Related Create View',
  'Related Company',
  'Contact Management',
  'Location',
  'View Design',
  'Required Qualifier',
  'Related Filter',
  'Validation Qualifier',
  'Related Dependency',
  'Editable Qualifier',
  'View Tab',
  'Display Qualifier',
  'Validation',
  'Related_Dependency',
  'Editable Qualifier Extension',
  'Editable Qualifier Group',
  'Required Qualifier Group',
  'Standard Schedule',
  'Form Design View',
  'Form Design Property',
  'Form Design',
  'Pick List (Property)',
  'Pick List (Common)',
  'Boilerplate Text',
];
console.time("code refactor 1");
function setpermission(acc, key) {
  acc[key] = { permissions: [] };
  return acc;
}
const navigationDataOptional1 = keys.reduce(setpermission, {});
console.timeEnd("code refactor 1");

console.time("code refactor 2");
const navigationDataOptional2 = Object.fromEntries(
  keys.map((key) => [key, { permissions: [] }])
);
console.timeEnd("code refactor 2");