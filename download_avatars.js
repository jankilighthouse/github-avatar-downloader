var dotenv = require('dotenv').config();


var request = require('request');
 var secret = require('./secrets.js');
 var fs = require('fs');

var GITHUB_USER = process.env.GITHUB_USER;

var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (repoOwner === undefined || repoName === undefined) {
  console.log("Need both repo owner and repo name as arguments.");
  console.log("Use form: node download-avatars.js <repoowner> <reponame>");
} else {
  getRepoContributors(repoOwner, repoName, function(err, result) {
    console.log("Errors:", err);
    console.log("Result:", result);
  });
}
// Error handling for .env params

// if(!process.env.GITHUB_USER || !process.env.GITHUB_TOKEN)
// {
//         console.log("Error: Your GitHub username & token are required in .env file");
//         return;
// };

var repoOwner = process.argv[2];
var repoName = process.argv[3];

 // var input = process.argv.slice(2);
 // var githubAccount = userInput[0];
 // var githubRepo = userInput[1];


console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
var GITHUB_USER = process.env.GITHUB_USER;
  var GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  // if(input.length!==2) {
  //   console.log("process should not attempt a request");
  //   process.exit();
  // }

  var options = {

    // url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     url:'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',

    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secret.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);

      var parsed = JSON.parse(body);
});

}
getRepoContributors(repoOwner,repoName, function(err, result) {
  if (err) {
      throw err;
    }
  var contributors = JSON.parse(result);

  for(var i = 0; i < contributors.length; i++) {
    var contributor = contributors[i];
    var output_url = contributor.avatar_url;

    var avatar_path = "janaki_photos/" + contributor.login + ".jpg";

    downloadImageByURL(output_url, avatar_path);
  }

});

function downloadImageByURL(url, filePath) {
    request.get(url)
         .on('error', function (err) {
           throw err;
         })
         .on('response', function (response) {
           console.log('Response Status Code: ', response.statusCode);
         })
         .pipe(fs.createWriteStream(filePath));


}