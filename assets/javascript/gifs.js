//array list of bands
var giffys = [
    "dog", 
    "cat",
    "baby",
    "funny",
    "sleep",
    "love",
    "singing",
    "llama",
    "monkey",
    "dance",
    "sloth",
    "disney"
];
//making buttons
function makeGiffyButton(giffy) {
    var button = $('<button>').text(giffy).addClass("giffyButton");
    $('#giffyButtonsDiv').append(button);
}
for (var index in giffys) {
    makeGiffyButton(giffys[index]);  
}
//on click
$('#addNew').on('click', function() {
    event.preventDefault();
    var newGiffy = $('input').val().trim(); 
    makeGiffyButton(newGiffy);
    $('input').val('');
});
//get the data from the Giphy API
function getGiphy(giffy) {
    var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + giffy + "&api_key=CiDMBeOZvWlkCCNOFU4kpvo7fa0HIAAI&limit=10";

    $.ajax({url: giphyQueryURL})
    .then(function(giphyResponse) { 
        $('#displayGifs').empty();

        for (var i in giphyResponse["data"]) {
            var stillLink = giphyResponse["data"][i]["images"]["fixed_width_still"]["url"];
            var animatedLink = giphyResponse["data"][i]["images"]["fixed_width"]["url"];
            var rating = $('<p>').text("rating: " + giphyResponse["data"][i]["rating"]);
            var img = $("<img>");
            
            img.attr({
                src: stillLink,
                class: "giphy",
                "data-state": "still",
                "data-still": stillLink,
                "data-animate": animatedLink,
                "data-rating": giphyResponse["data"][i]["rating"]
            });

            var imgDiv = $('<div>').append(img, rating).addClass("imgDiv"); 
            $('#displayGifs').prepend(imgDiv);
        }
    });
}

//when you click on the button
$(document).on('click', '.giffyButton', function() {
    var giffyName = $(this).text();
    
    getGiphy(giffyName);

});
//when you click on a gif, it will animate when it is still and vice versa
$(document).on("click", ".giphy", function() {
    var gif = $(this);
    var state = gif.attr('data-state');
    var animate = gif.attr('data-animate');
    var still = gif.attr('data-still');

    if (state === "still") {
        gif.attr('src', animate);
        gif.attr('data-state', "animate");
    } else {
        gif.attr('src', still);
        gif.attr('data-state', "still");
    }
});