var _ = require('lodash');
const array = require("./db");

const specialCategories = [
    'Best Performance by an Actor in a Leading Role',
    'Best Performance by an Actress in a Leading Role',
    'Best Performance by an Actor in a Supporting Role',
    'Best Performance by an Actress in a Supporting Role'
]

const ORIGINAL_SOUNDTRACK = "Best Achievement in Music Written for Motion Pictures (Original Song)";
const FOREINGN_MOVIE = "Best Foreign Language Film of the Year";

let arrayCategories = [];
let arrayIndicated = [];


/**
 * CATEGORIES
 */

array.categories.map( (data, index) => {
    let id = index + 1;
    let objectCategory = {
        id,
        name: ''
    }
    
    objectCategory.id = id;
    objectCategory.name = data.categoryName.toLocaleUpperCase();
    
    arrayCategories.push(objectCategory)
})
// console.log(JSON.stringify(arrayCategories));

/**
 * FEATURES
 */

let ids = 1;
let insertedIndicated = [];

array.categories.map( (data, index) => {
    data.nominations.map(indicated => {
        let currentIndicatedName = indicated.primaryNominees[0].name;
        let objectFeature = {
            id: 0,
            name: currentIndicatedName,
            feature_id: null
        };
        
        if (insertedIndicated.indexOf(currentIndicatedName) == -1) {
            objectFeature.id = ids
            arrayIndicated.push(objectFeature)
            insertedIndicated.push(currentIndicatedName)
                
            ids = ids + 1;
        }
    })
})

array.categories.map((data, index) => {
    data.nominations.map(indicated => {
        let currentIndicatedName = indicated.secondaryNominees[0].name;
       
        if (specialCategories.indexOf(indicated.categoryName) == -1) {

        }
        
    })
})

console.log(JSON.stringify(arrayIndicated));

console.log(`${arrayIndicated.length} Features`);
console.log(`${arrayCategories.length} Categories`);