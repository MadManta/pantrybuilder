$("#submit").on("click", function(event) {
    event.preventDefault();
    var additem = $("#additem").val().trim();
    $("#listfood").empty();


    var queryURL = "https://api.nal.usda.gov/ndb/search/?&format=json&q=" + additem +"&ds=Standard+Reference&sort=r&max=10&offset=0&api_key=uyNSkR4G2nmzLN1z7unvxh1JMdwZ0IXiPP8k1QXE";
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {

        console.log(response);

        var results = response.list.item;
        
        for (var i = 0; i < results.length; i++) {
            var foodDiv = $("<div>");
            var list = $("<li>");
            list.html(results[i].name);
            list.attr("data-id", results[i].name);
            foodDiv.append(list);
            $("#listfood").append(foodDiv);

        };
        console.log(results)
        
        $("li").on("click", function(event) {
            var newFood = $(this).data("id");
            $("#pantry").append("<li>" + newFood + "</li>");
            console.log(newFood);
        });
    });

});
        //end of api and search

    // Create an initial toDoCount variable
    var toDoCount = 0;

    //  On Click event associated with the add-to-do function
    $("#add-to-food").on("click", function(event) {
      event.preventDefault();

      // Get the to-do "value" from the textbox and store it a variable
      var toDoTask = $("#to-food").val().trim();

      // Create a new variable that will hold a "<p>" tag.
      // Then give it an ID in the following form:
      // "item-4" or "item-3" or "item-99", where the number is equal to toDoCount.
      // Then append the to-do "value" as text to this <p> element.
      var toDoItem = $("<p>");

      toDoItem.attr("id", "item-" + toDoCount);
      toDoItem.append(" " + toDoTask);

      // Create a button with unique identifiers based on what number it is in the list. Again use jQuery to do this.
      // Give your button a data attribute called data-to-do and a class called "checkbox".
      // Lastly append the letter X inside.

      var toDoClose = $("<button>");

      toDoClose.attr("data-to-food", toDoCount);
      toDoClose.addClass("checkbox");
      toDoClose.append("✓");

      // Append the button to the to do item
      toDoItem = toDoItem.prepend(toDoClose);

      // Add the button and to do item to the to-dos div
      $("#to-dos").append(toDoItem);

      // Clear the textbox when done
      $("#to-food").val("");

      // Add to the toDoCount
      toDoCount++;
    });

    // When a user clicks a check box then delete the specific content
    // (NOTE: Pay attention to the unusual syntax here for the click event.
    // Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)
    $(document.body).on("click", ".checkbox", function() {

      // Get the number of the button from its data attribute and hold in a variable called  toDoNumber.
      var toDoNumber = $(this).attr("data-to-food");

      // Select and Remove the specific <p> element that previously held the to do item number.
      $("#item-" + toDoNumber).remove();
    });

    </script>
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>

  </body>

  
</html>