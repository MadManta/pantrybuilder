var queryURL = "https://api.edamam.com/search?q=mushroom+risotto&app_id=604fe6ae&app_key=04fae8d1362d3d0b9a9eade3d98b4b49";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {



        console.log(response);

        //console.log(hits.0.recipe.ingredients)
        });