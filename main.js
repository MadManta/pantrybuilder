

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