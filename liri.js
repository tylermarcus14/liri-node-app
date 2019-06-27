require("dotenv").config();
var keys = require("./keys.js");
var axios = require ("axios");
var moment = require ("moment");
var fs = require ("fs");
var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);

var whatToDo = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

switch (whatToDo){
    case "spotify-this-song":
        spotifyThis()
    break;

    case "concert-this":
        concertThis()
    break;

    case "movie-this":
        movieThis()
    break;

    case "do-this":
        doThis()
    break;
}

function spotifyThis (){
  spotify
  .search({ type: 'track', query: userInput, limit: 1})
  .then(function(response) {
    // console.log(response);
    // console.log(JSON.stringify(response, null, 2));
    console.log("------ Song Info ------");
    console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
    console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movieThis() {
movieName = userInput;
var queryURL = "http://www.omdbapi.com/?t=" +movieName + "&y=&plot=short&apikey=trilogy"; 
axios.get(queryURL).then(
  function(response){
      console.log("------ Movie Info ------");
      console.log(JSON.stringify("Title: " + response.data.Title));
      console.log(JSON.stringify("Release Year: " + response.data.Year));
      console.log(JSON.stringify("Rating: " + response.data.Rated));
      console.log(JSON.stringify("Country: " + response.data.Country));
      console.log(JSON.stringify("Language: " + response.data.Language));
      console.log(JSON.stringify("Plot: " + response.data.Plot));
      console.log(JSON.stringify("Actors: " + response.data.Actors));
  })   
}

function concertThis(){
  artist = userInput;
  var bandQueryUrl=  "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(bandQueryUrl).then(
    function(response){
      console.log("------ Concert Info ------");
      console.log("Artist: " + artist);
      console.log(JSON.stringify("Venue: " + response.data[0].venue.name));
      console.log(JSON.stringify("Location: " + response.data[0].venue.country));
      console.log(JSON.stringify("Date: " + response.data[0].datatime));
    })
}

function doThis() {
  fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
          return console.log(error);
      }
      var dataArray = data.split(",");
      var option = dataArray[0];
      var randomSearch = dataArray[1];   
    if (option == "spotify-this-song"){
      spotify
      .search({ type: 'track', query: randomSearch, limit: 1})
      .then(function(response) {
        // console.log(response);
        // console.log(JSON.stringify(response, null, 2));
        console.log("------ Song Info ------");
        console.log(JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
        console.log(JSON.stringify(response.tracks.items[0].name, null, 2));
        console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
        console.log(JSON.stringify(response.tracks.items[0].preview_url, null, 2));
      })
  }
})}
