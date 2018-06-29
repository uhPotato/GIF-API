// GifTastic Javascript Engine

// begin document.ready function
$(document).ready(function() {

    
    var gifObj = {
        gifBtnArray: ["Cowboy Bebop", "Mario", "the legend of zelda", "Pokemon", "Futurama", "One Piece Anime", "Naruto", "Trigun", "Samurai Champloo", "fullmetal alchemist"],
        currentSelection: "",
        userInput: "",
        giphyApiUrl: "https://api.giphy.com/v1/gifs/search?",
        giphyApiKey: "AoIrxKSctQ7dGjn2zf1MwIwfK5gwnM82",
        renderButtons: function() {
            //empty the buttons bar/column
            $("#buttonsBar").empty();
            // cycle through the gifBtnArray array and populate the buttons
            for (var i = 0; i < this.gifBtnArray.length; i++) {
                var a = $("<button>");
                a.addClass("buttons btn");
                a.attr("data-name", this.gifBtnArray[i]);
                a.text(this.gifBtnArray[i]);
                $("#buttonsBar").append(a);
            }
            
            $(".buttons").on("click", function() {
                
                gifObj.currentSelection = $(this).attr("data-name");
                gifObj.gifDisplay();
            });
        },
        gifDisplay: function() {
            console.log(this.currentSelection);
            // first build the ajax query based on current button clicked
            var gifToDisplay = this.currentSelection;
            
            var queryURL = this.giphyApiUrl + "&q=" + gifToDisplay + "&limit=10&api_key=" + this.giphyApiKey;
    
            // make the ajax query and store the response
            $.ajax({url: queryURL, method: "GET"}).done(function(response) {
                console.log(response);
                
                $("#gifsWindow").empty();
                for (var i = 0; i < response.data.length; i++) {
                    
                    var showObject = response.data[i];
                    var showStill = response.data[i].images.fixed_height_small_still.url;
                    var showMoving = response.data[i].images.fixed_height_small.url;
                    var showRating = response.data[i].rating;
                    console.log("Object: " + showObject);
                    console.log("Still: " + showStill);
                    console.log("Moving: " + showMoving);
                    console.log("Rating: " + showRating);
    
    
                    var gifDiv = $("<div class='show col-md-4'>");
                    // first in the div will be the rating
                    var pOne = $("<p>").text("Rating: " + showRating);
                    
                    gifDiv.append(pOne);
                    
                    var image = $("<img>").attr("src", showStill);
                    
                    image.addClass("gifImage");
                    image.attr("data-still", showStill);
                    image.attr("data-moving", showMoving);
                    
                    gifDiv.append(image);
                    
                    $("#gifsWindow").append(gifDiv);
                }
    
               
                $(".gifImage").on("click", function() {
                   
                    if ($(this).attr("src") == $(this).attr("data-still")) {
                        $(this).attr("src", $(this).attr("data-moving"));
                    } else if ($(this).attr("src") == $(this).attr("data-moving")) {
                        $(this).attr("src", $(this).attr("data-still"));
                    }
    
                });
    
            });
        }
    };
    
    
    $("#addGif").on("click", function() {
        gifObj.userInput = $("#gifInput").val().trim();
        
        if (gifObj.userInput != "") {
            
            gifObj.gifBtnArray.unshift(gifObj.userInput);
            gifObj.renderButtons();
        }
        // reset the form
        $("input#gifInput").val("");
        return false;
    });
    
    
    
    gifObj.renderButtons();
    
    
    });