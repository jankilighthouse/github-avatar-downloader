var request = require('request');
 var secret = require('./secrets.js');
 var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
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
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
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