// Japan Comedy Gif

var topics = ["Hitoshi Matsumoto", "Lucky Star", "Owarai","Ken Shimura","Danshi Koukousei no Nichijou", "Seitokai Yakuindomo", "Nichijou", "Konosuba Kazuma" , "Nyaruko", "Gintama", "One Punch Man", "Non Non Biyori"];

var button;
// new topic input by user
var newTopic = []; 

//create buttons for topics array

var buttonGen = function() {
	//empty div elements
	$("#buttonArea").empty();
	//loop through array and create button for each topic
	for (i = 0; i < topics.length; i++) {
		button = $("<button type=" + "button" + ">" + topics[i] + "</button>").addClass("btn btn-primary").attr("data", topics[i]);
		$("#buttonArea").append(button);
	};
}

//user will select a button of a desire topic, which will generate 15 gif static

$("#buttonArea").on("click", ".btn", function() {
    var userInput = $(this).attr("data");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=kBLAHc3QvhZNUvhrP9e9NVG4Itg5U7om&limit=10";

    // call the fuction using ajax
    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response){
    	console.log(response);

    	var results = response.data;

    	for(var i = 0; i < results.length; i++) {
    		//creating a div on the html for each topic gifs
    		var topicDiv = $("<div>");

    		//display rating for each gif (PG, G)
    		var p = $("<p>");
    		p.text(results[i].rating);
    		var p = $("<p>").text("Rating: " + results[i].rating);

    		//add in still gif when click to generate, and will played when click
    		var topicImage = $("<img>");

    		topicImage.attr("src", results[i].images.fixed_height_still.url);
    		topicImage.attr("data-still", results[i].images.fixed_height_still.url);
    		topicImage.attr("data-animate", results[i].images.fixed_height.url);
    		topicImage.attr("data-state", "still");
    		topicImage.addClass("gif");

    		//append gif to div
    		topicDiv.append(topicImage);

    		//rating append below div
    		topicDiv.append(p);

    		//New stuff will be on top
    		$("#gifArea").prepend(topicDiv);



    	}
	})
})

$("#gifArea").on("click", ".gif", function(event) {
    event.preventDefault();

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})

$(".submit").on("click", function(event) {
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic 
    newTopic = $("#topic-input").val();
    // new topic is added to the topics array 
    topics.push(newTopic);
    console.log(topics);
    // call the function that creates the new button
    buttonGen();
});



buttonGen();