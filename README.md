# LIRI-Bot

BY runing the folowing comands the bot will return a ressponce from the approptiate API>

my-tweets
spotify-this-song
movie-this
do-what-it-says


Bounus works, type: node liri.js do-what-it-says


keys and NPM pakages should be exclued from git hub. 


keys and code clips.....



OMDB key -- 683df97c

http://www.omdbapi.com/?apikey=683df97c&

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


