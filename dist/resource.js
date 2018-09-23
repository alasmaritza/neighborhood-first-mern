'use strict';

var resourceFieldType = {
    category: 'required',
    name: 'required',
    address: 'optional',
    phone: 'optional',
    website: 'optional',
    comments: 'optional',
    created: 'required',
    isActive: 'optional'
};

function cleanupResource(resource) {
    var cleanedUpResource = {};
    Object.keys(resource).forEach(function (field) {
        if (resourceFieldType[field]) cleanedUpResource[field] = resource[field];
    });
    return cleanedUpResource;
}

function validateResource(resource) {
    var errors = [];
    Object.keys(resourceFieldType).forEach(function (field) {
        if (resourceFieldType[field] === 'required' && !resource[field]) {
            errors.push('Missing mandatory field: ' + field);
        }
    });
    // if (!validResouceStatus[resource.status]) {
    //     errors.push(`${resource.status} is not a valid status.`);
    // }

    return errors.length ? errors.join('; ') : null;
};

function convertResource(resource) {
    if (resource.created) resource.created = new Date(resource.created);
    return cleanupResource(resource);
};

module.exports = {
    validateResource: validateResource, //property being set to validate function
    cleanupResource: cleanupResource,
    convertResource: convertResource
};
//# sourceMappingURL=resource.js.map