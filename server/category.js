'use strict';
const categoryFieldType = {
    name:'required',
    created:'required',
};

function cleanupCategory(category) {
    const cleanedUpCategory = {};
    Object.keys(category).forEach(field => {
        if (categoryFieldType[field]) cleanedUpCategory[field] = category[field];
    });
    return cleanedUpCategory;
}

function validateCategory(category) {
    const errors = [];
    Object.keys(categoryFieldType).forEach(field => {
        if (categoryFieldType[field] === 'required' && !category[field]) {
            errors.push(`Missing mandatory field: ${field}`);
        }
    });

    return (errors.length ? errors.join('; ') : null);
};

function convertCategory(category) {
    if(category.created) category.created = new Date(category.created);
    return cleanupCategory(category);
};

module.exports = {
    validateCategory: validateCategory, //property being set to validate function
    cleanupCategory: cleanupCategory,
    convertCategory: convertCategory,
};