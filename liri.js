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

        default:
        getTweets(search);
        break;
    }
}

runApi(userCommand, userSearch);
