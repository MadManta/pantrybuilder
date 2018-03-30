//DOM selectors
var $recipeSearch = $("#recipeSearch"),
    $go = $("#go"),
    $recipeSearchResults = $("#recipeSearchResults"),
    $ingredients = $("#ingredients"),
    $recipeName = $("#recipeName");
    $directions = $("#directions"),
    $addRecipe = $("#addRecipe"),
    $recipeListCard = $("#recipeListCard");
//array of recipe objects
var myRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
//array of units of measure to match
var unitsOfMeasure = ["tsp" ,"tsp.", "teaspoon" , "teaspoons" , "tbsp" ,"tbsp.", 
                    "tablespoon" , "tablespoons" , "oz" ,"oz.", "ounce" , "ounces" , "cup" , "cups" , "c.",
                    "pint", "pints" , "qt" ,"qt.", "quart" , "quarts" , "gal" ,"gal.", "gallon" , "gallons" ,
                    "lbs" ,"lbs.",  "pound" , "pounds" , "ml" , "milliliter" , "milliliters" , "l" ,
                    "liter" , "liters" , "mg" , "milligram" , "milligrams" , "kg" , "kilogram" ,
                    "kilograms"];
//Empty object to store search results
var searchResults = {};
//ingredient counter for adding recipes
var currentIngredient = 1;

//sample pantry
var pantryArray = {
    names: ["flour", "butter", "sugar", "eggs", "baking soda", "baking powder", "salt", "bing cherries"],
    amounts: [10, 2, 10, 4, 8, 2, 1, 24],
    units: ["lbs", "lbs", "lbs", "-----", "oz", "oz", "lbs", "-----"]
};

//function to convert a recipe to a recipe object.
function objectify(recipe) {
    //the values of our object
    var ingredientNames = [],
        measures = [],
        units = [],
        name = recipe.recipe.label,
        source = recipe.recipe.source;
    //grab our ingredints in an array
    var ingredients = recipe.recipe.ingredientLines;
    //split each ingredient string into the parts for our object
    for (var i = 0; i<ingredients.length; i++) {
        ingredientNames.push(ingredients[i]);
        var ingArray = ingredients[i].split(" ");
        for (var j = 0; j<ingArray.length; j++) {
            if (parseInt(ingArray[j].charAt(0))) {
                measures.push(ingArray[j]) ; break;
                }
            if (j === ingArray.length-1) {
                measures.push(0);
                }
            }
        for (var k = 0; k < ingArray.length; k++) {
            if (unitsOfMeasure.indexOf(ingArray[k]) >= 0) {
                units.push(ingArray[k]); break;
                }
            if (k === ingArray.length - 1) {
                units.push("-----");
                }
                }
        }
    //add a url to find directions 
    var directions = "Check out the directions for this recipe at <a href = '" + recipe.recipe.url + "' target = '_/blank'>" + recipe.recipe.url + "</a>";
    //then create a new object with the constructed values
    var recipeObject = {
        name: name,
        ingredients: ingredientNames,
        measures: measures,
        units: units,
        directions: directions,
        source: source
        };
    return recipeObject;
};

//function to display the label of a search result.
function displayResult(object) {
    $recipeSearchResults.append("<button class = 'button btn-light expandButton resultButton' type = button data-toggle='collapse' id='result" + searchResults.hits.indexOf(object) +"' aria-expanded='false' aria-controls='result" + searchResults.hits.indexOf(object) +"'>" +
                                    object.recipe.label +
                                "</button>" +
                                "<div class = 'collapse resultCollapse' id = 'collapse-result" + searchResults.hits.indexOf(object) +"'>" +
                                    "<div class = 'card card-body'>" +
                                        "<a href = " + object.recipe.url + " target = '_/blank'>Source: " + object.recipe.source + "</a>" +
                                        "<img src = '" + object.recipe.image + "' alt = recipePic>" + 
                                        "<button class = 'button btn-success searchResultAddButton' id = " + searchResults.hits.indexOf(object) + ">Add to My Recipes</button>" +
                                    "</div>" +
                                "</div>"
                            )
};

//function to display a recipe from myrecipes
function displayRecipe(recipe, int) {
    console.log(recipe);
    var match = "";
    $recipeListCard.append(
        "<button class = 'btn btn-dark expandButton resultButton' id = 'myRecipe" + int + "'>" + recipe.name + "</button>" +
            "<div class = 'collapse' id = 'collapse-myRecipe" + int + "'>" +
                "Recipe Source: " + recipe.source +"<br>" +
                "Ingredients: <br>" +
                "<table class = ' table table-bordered'>" +
                    "<thead>" +
                        "<th class = 'myRecipeNames'>Ingredient</th>" +
                        "<th class = 'myRecipeMeasures'>Amt.</th>" +
                        "<th class = 'myRecipeUnits'>Unit</th>" +
                        "<th class = 'mrRecipeAvailable'></th>" +
                    "</thead>" +
                    "<tbody id = 'ingredients-myRecipe" + int + "' >" +
                    "</tbody>" +
                "</table>" +
                "<h5>Directions:</h5>" +
                "<p>" + recipe.directions + "</p>" +
                "<button class = 'btn btn-danger deleteRecipe' id = 'delete" + int + "'>Delete Recipe</button>" +
            "</div>"
    );
    // loop to update each ingredient in our table
    for (var i = 0; i<recipe.ingredients.length; i++) {
        //first, we need to see if the ingredient is in our pantry
        var inPantry = false;
        //make an array from the ingredient name...
        var splitIngredient = recipe.ingredients[i].split(" ");
        //then check each word in the name against our pantry. if we get a hit, inPantry is set to true
        for (var j = 0; j<splitIngredient.length; j++) { 
            for (var k = 0; k<pantryArray.names.length; k++){
                var splitPantry = pantryArray.names[k].split(" ");
                for (var l = 0; l<splitPantry.length; l++) {
                    if (splitIngredient[j].toLowerCase() === splitPantry[l].toLowerCase()) {
                    inPantry = true; 
                    match = pantryArray.names[k];
                    break;
                }
                }
                
            
            }
        }
        //if it's in our pantry, add the ingredient with a green button and a description of the match
        if (inPantry) {
            $("#ingredients-myRecipe" + int).append(
                "<tr>" +
                    "<td><p>" + recipe.ingredients[i] + "</p></td>" +
                    "<td><p>" + recipe.measures[i] + "</p></td>" +
                    "<td><p>" + recipe.units[i] + "</p></td>" +
                    "<td><p><span id = 'myRecipe" + int + "-available" + i + "'><button class = 'btn btn-success'>+</button></span></p>" +
                    match + " found in pantry</td>" +
                "</tr>"
            );
        }
        //Otherwise, add it with a blue button and a notice that no match was found.
        else {
            $("#ingredients-myRecipe" + int).append(
                "<tr>" +
                    "<td><p>" + recipe.ingredients[i] + "</p></td>" +
                    "<td><p>" + recipe.measures[i] + "</p></td>" +
                    "<td><p>" + recipe.units[i] + "</p></td>" +
                    "<td><p><span id = 'myRecipe" + int + "-available" + i + "'><button class = 'btn btn-primary'>+</button></span></p> " +
                    "No matches in pantry</td>" +
                "</tr>"
            );
        }
    };
};

//click event listener for search button
$go.click(function(event){
    event.preventDefault(); 
    var queryURL = "https://api.edamam.com/search?q="+ $recipeSearch.val().trim() +"&app_id=604fe6ae&app_key=04fae8d1362d3d0b9a9eade3d98b4b49";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        searchResults = response;
        console.log(searchResults);
        $recipeSearchResults.empty();
        searchResults.hits.map(displayResult);
        $recipeSearchResults.append(
            "<button class = 'btn btn-danger clearButton expandButton'>Clear Search Results</button>"
        );
        });
        $recipeSearch.val("");    
});

//click event to add a search result to my recipes
$(document).on("click", ".searchResultAddButton", function(event){
    var myRecipe = objectify(searchResults.hits[event.currentTarget.id]);
    myRecipes.push(myRecipe);
    //update the local storage (eventually the database)
    localStorage.clear();
    localStorage.setItem("recipes", JSON.stringify(myRecipes));
    //add the recipe to the 'myrecipes' folder
    displayRecipe(myRecipe, myRecipes.length - 1);
});

//event listener to add an ingredient
$(document).on("click", ".addIngredient", function(event) {
    event.preventDefault();
    //hide the current button.
    $("#addIng" + currentIngredient).css({"visibility": "hidden"});
    //Increment the ingredient counter
    currentIngredient++;
    //append a new row to the ingredients table
    $ingredients.append ( "<tr>" +
        "<div class = 'form-group row'>" +
            "<td>" +
                "<input type = 'text' class = 'form-control ingredient' id = 'ing" + currentIngredient + "'>" +
            "</td>" +
            "<td>" +
                "<input type = 'number' class = 'form-control measure' id = 'meas"+ currentIngredient +"'>" +
            "</td>" +
            "<td>" +
                "<select class = 'form-control unit' id = 'unit" + currentIngredient + "'>" +
                    "<option>-----</option>" +
                    "<option>each</option>" +
                    "<option>tsp</option>" +
                    "<option>Tbsp</option>" +
                    "<option>cup(s)</option>" +
                    "<option>qt</option>" +
                    "<option>gal</option>" +
                    "<option>oz</option>" +
                    "<option>lbs</option>" +
                    "<option>ml</option>" +
                    "<option>L</option>" +
                    "<option>mg</option>" +
                    "<option>g</option>" +
                    "<option>Kg</option>" +
                "</select>" +
            "</td>" +
            "<td>" + 
                "<button class = 'addIngredient' id = 'addIng" + currentIngredient + "'><strong>+</strong></button>" +
            "</td>" +
        "</div></tr>"
    );       
});

//event listener to submit a recipe
$addRecipe.click(function(event){
    //pull the values from the form as variables
    var name = $recipeName.val().trim();
    var directions = $directions.val().trim();
    var ingredients = [],
        measures = [],
        units = [];
    for( var i = 1; i<= currentIngredient; i++) {
        ingredients.push($("#ing" + i).val().trim());
        measures.push($("#meas" + i).val());
        units.push($("#unit" + i).val());
    }
    //create a new object from the values
    var recipe = {
        name: name,
        ingredients: ingredients,
        measures: measures,
        units: units,
        directions: directions,
        source: "User Submitted Recipe"
    }
    console.log(recipe);
    //add our new recipe to myRecipes
    myRecipes.push(recipe);
    //Add our new recipe to the 'myrecipes' folder
    displayRecipe(recipe, myRecipes.length - 1);
    //update the local storage (eventually the database)
    localStorage.clear();
    localStorage.setItem("recipes", JSON.stringify(myRecipes));
    //reset the form
    currentIngredient = 1;
    $directions.val("");
    $recipeName.val("");
    $ingredients.html ( "<tr>" +
        "<div class = 'form-group row'>" +
            "<td>" +
                "<input type = 'text' class = 'form-control ingredient' id = 'ing" + currentIngredient + "'>" +
            "</td>" +
            "<td>" +
                "<input type = 'number' class = 'form-control measure' id = 'meas"+ currentIngredient +"'>" +
            "</td>" +
            "<td>" +
                "<select class = 'form-control unit' id = 'unit" + currentIngredient + "'>" +
                    "<option>-----</option>" +
                    "<option>each</option" +
                    "<option>tsp</option>" +
                    "<option>Tbsp</option>" +
                    "<option>cup(s)</option>" +
                    "<option>qt</option>" +
                    "<option>gal</option>" +
                    "<option>oz</option>" +
                    "<option>lbs</option>" +
                    "<option>ml</option>" +
                    "<option>L</option>" +
                    "<option>mg</option>" +
                    "<option>g</option>" +
                    "<option>Kg</option>" +
                "</select>" +
            "</td>" +
            "<td>" + 
                "<button class = 'addIngredient' id = 'addIng" + currentIngredient + "'><strong>+</strong></button>" +
            "</td>" +
        "</div></tr>"
    );       
});

//function to allow dynamically-created collapses to display
$(document).on("click", ".resultButton", function(event){
    var target = "collapse-" + event.currentTarget.id;
    $("#" + target).collapse("toggle");
});

//click listener for the clear button
$(document).on("click", ".clearButton", function(event){
    $recipeSearchResults.empty();
})

//click listener for the delete recipe button
$(document).on("click", ".deleteRecipe", function(event) {
    var itemVal = parseInt(event.currentTarget.id.substr(6));
    myRecipes.splice(itemVal, 1);
    $recipeListCard.empty();
    for (var i = 0; i < myRecipes.length; i++){
        displayRecipe(myRecipes[i], i);
    }
});

//function to initialize my recipes on load
$(document).ready(function(){
    for (var i = 0; i < myRecipes.length; i++){
        displayRecipe(myRecipes[i], i);
    }
});