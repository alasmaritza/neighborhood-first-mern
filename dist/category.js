'use strict';

var categoryFieldType = {
    name: 'required',
    created: 'required'
};

function cleanupCategory(category) {
    var cleanedUpCategory = {};
    Object.keys(category).forEach(function (field) {
        if (categoryFieldType[field]) cleanedUpCategory[field] = category[field];
    });
    return cleanedUpCategory;
}

function validateCategory(category) {
    var errors = [];
    Object.keys(categoryFieldType).forEach(function (field) {
        if (categoryFieldType[field] === 'required' && !category[field]) {
            errors.push('Missing mandatory field: ' + field);
        }
    });

    return errors.length ? errors.join('; ') : null;
};

function convertCategory(category) {
    if (category.created) category.created = new Date(category.created);
    return cleanupCategory(category);
};

module.exports = {
    validateCategory: validateCategory, //property being set to validate function
    cleanupCategory: cleanupCategory,
    convertCategory: convertCategory
};
//# sourceMappingURL=category.js.map