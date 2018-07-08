require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");


var client = new Twitter({
  consumer_key: keys.twitter.consumer_key,
  consumer_secret: keys.twitter.consumer_secret,
  access_token_key: keys.twitter.access_token_key,
  access_token_secret: keys.twitter.access_token_secret
});

var spotify = new Spotify(keys.spotify);

// if line 16 doesn't work, use this:
// var spotify = new Spotify({
//     id: keys.spotify.id,
//     secret: keys.spotify.secret
// });


// default is @piratesaz
function getTweets(twitterHandle){
if(!twitterHandle){
    twitterHandle = "piratesaz";
}
var params = {screen_name: twitterHandle};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);

    for(var i = 0; i < tweets.length; i++){
        console.log("Tweet: " + tweets[i].text)
        console.log("User: " + tweets[i].user.name)
        console.log("Created at: " + tweets[i].created_at)
    }
  }
});
}

function runSpotify(search){
    if(!search){
        search = "I want it that way";
    }



    console.log("run spotify api")
    console.log("search this artist: " + search);

    spotify.search({ type: 'track', query: search }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
     // console.log(JSON.stringify(data, null, 2));
        // console.log(data)
    // Album
    // Artist 
    // Song name
    // preview link from Spotify

      var spotifyArray = data.tracks.items;

    //   console.log(spotifyArray[0]);

      console.log("Artist: ", spotifyArray[0].album.artists[0].name);
      console.log("Song: " +  spotifyArray[0].name)
      console.log("Preview URL: " + spotifyArray[0].album.artists[0].external_urls.spotify )
      console.log("Album: ", spotifyArray[0].album.name);

        // for(var i = 0; i < spotifyArray.length; i++){
        //     console.log(spotifyArray[i]);
        // }
      });   // copy here
}

function runMovie(movie){

    if(!movie){
        movie = "Mr. Nobody";
    }

    // Movie Title
    // Year
    // Rating - IMBD
    // Rotten Tomatoes
    // Country
    // Plot
    // Actors

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body){
        if(!error && response.statusCode === 200){
            // console.log(body);
            var movieData = JSON.parse(body);
            // console.log(movieData);

            console.log("Title: " + movieData.Title)
            console.log("Year: " + movieData.Year)
            console.log("IMBD Rating: " + movieData.Rated)
            console.log("Rotten Tomatoes: " + movieData.Ratings[1].Value)
            console.log("Country: " + movieData.Country)
            console.log("Plot: " + movieData.Plot)
            console.log("Actors: " + movieData.Actors)
        }
    })



}

function runDoWhat(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }

        // console.log(data);

        var commandArray = data.split(",");

        // console.log(commandArray);

        runApi(commandArray[0], commandArray[1]);
    })
}

// getTweets("piratesaz");

var userCommand = process.argv[2];

var userSearch = process.argv[3];


function runApi(command, search){
    switch(command){
        case "tweet-this":
        getTweets(search);
        break;

        case "spotify-this":
        runSpotify(search);
        break;

        case "movie-this":
        runMovie(search);
        break;

        case "do-what-it-says":
        runDoWhat();
        break;

        default:
        getTweets(search);
        break;
    }
}

runApi(userCommand, userSearch);
