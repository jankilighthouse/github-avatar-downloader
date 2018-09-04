var request = require('request');
 var secret = require('./secrets.js');
 var fs = require('fs');

 var input = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  if(input.length!==2) {
    console.log("process should not attempt a request");
    process.exit();
  }

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
getRepoContributors(input[0], input[1], function(err, result) {
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