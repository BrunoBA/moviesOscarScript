var _ = require('lodash');
const array = require("./db");
const categories = require("./categories");
const data = array.categories;

function categoryMovie(category) {
    if (
        category == "Best Performance by an Actor in a Leading Role" ||
        category == "Best Performance by an Actress in a Leading Role" ||
        category == "Best Performance by an Actor in a Supporting Role" ||
        category == "Best Performance by an Actress in a Supporting Role"
    ) {
        return false
    }

    return true
}

function existFeature(features, featureName) {
    if (_.findIndex(features, element => element.name == featureName) == -1) {
        return false
    }
    return true
}

function getCategoryIdByName(categories, category) {
    return categories.indexOf(category)
}

function showFeatures(features) {
    console.log('[')
    features.map(feature => {
        console.log(`['id' => ${feature.id + 1}, 'name' => "${feature.name}", 'feature_id' => ${feature.feature_id}],`)
    })
    console.log(']')
}

function showPictures(features) {
    console.log('[')
    features.map(feature => {
        console.log(`['id' => ${feature.id + 1}, 'path' => "PATH${feature.picture}"],`)
    })
    console.log(']')
}

function showCategories(categories) {
    console.log('[')
    categories.map((feature, index) => {
        console.log(`['id' => ${index + 1}, 'name' => "${feature}"],`)
    })
    console.log(']')
}

function showPersonFeature(feature) {
    for (var key in feature) {
        if (feature.hasOwnProperty(key)) {
            console.log(key, feature[key]);
        }
    }
}

function getFeatureIdByName(features, featureName) {
    return _.findIndex(features, element => element.name == featureName) + 1
}

function pathName(string) {
    return string.toLowerCase()
        .replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
        .replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
        .replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
        .replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
        .replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
        .replace(new RegExp('[Ç]', 'gi'), 'c')
        .replace(/[.]/g, '')
        .replace(/[,]/g, '')
        .replace(/[\\]/g, '')
        .replace(/[\/]/g, '')
        .replace(/[)]/g, '')
        .replace(/[()]/g, '')
        .replace(/[']/g, '')
        .replace(/[ -]/g, '_')
        .replace(/[.,?:-]/g, '');
}

/* MOVIES AND ACTORS */
let features = [];
let urlImages = [];
data.forEach((category, featureId) => {
    category.nominations.forEach((element, featureId) => {
        let feature = {
            id: features.length + 1,
            name: element.primaryNominees[0].name,
            feature_id: null,
            picture: '',
        };

        let pictureObject = {
            path: '',
            imageName: ''
        };

        if (categoryMovie(category.categoryName)) {
            if (!existFeature(features, feature.name)) {
                feature.picture = pathName(feature.name)
                features.push(feature)

                pictureObject.path = element.primaryNominees[0].imageUrl
                pictureObject.imageName = pathName(feature.name)

                urlImages.push(pictureObject)
            }
        } else {
            feature.name = element.secondaryNominees[0].name;
            if (!existFeature(features, feature.name)) {
                feature.picture = pathName(feature.name)
                features.push(feature)

                pictureObject.path = element.primaryNominees[0].imageUrl
                pictureObject.imageName = pathName(feature.name)

                urlImages.push(pictureObject)
            }
        }
    })
})

data.forEach((category, featureId) => {
    category.nominations.forEach((element, featureId) => {

        let feature = {
            id: features.length + 1,
            name: element.primaryNominees[0].name,
            feature_id: null,
            picture: '',
        };

        let pictureObject = {
            path: '',
            imageName: ''
        };

        if (!categoryMovie(category.categoryName)) {
            if (!existFeature(features, feature.name)) {
                feature.feature_id = getFeatureIdByName(features, element.secondaryNominees[0].name)
                feature.picture = pathName(feature.name)
                features.push(feature)

                pictureObject.path = element.primaryNominees[0].imageUrl
                pictureObject.imageName = pathName(feature.name)

                urlImages.push(pictureObject)
            }
        }
    })
})

let categoriesFeaturesArray = [];
data.forEach((category, featureId) => {
    category.nominations.forEach((element, featureId) => {

        let categoriesFeatures = {
            feature_id: 0,
            category_id: 0,
            winner: false
        }
        
        categoriesFeatures.feature_id = getFeatureIdByName(features, element.primaryNominees[0].name)
        categoriesFeatures.category_id = getCategoryIdByName(categories, category.categoryName.toUpperCase()) + 1
        
        categoriesFeaturesArray.push(categoriesFeatures);
        // console.log(`[ 'winner' => false, 'feature_id' => ${categoriesFeatures.feature_id}, 'category_id' => "${categoriesFeatures.category_id}"],`)
    })
});
// console.log(']')


// console.log(JSON.stringify(features));
// console.log(JSON.stringify(categoriesFeaturesArray));
console.log(JSON.stringify(urlImages));
// showCategories(categories)