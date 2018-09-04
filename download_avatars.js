var request = require('request');
 var secret = require('./secrets.js');

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
  var parse=JSON.parse(result);

  for(var i=0;i<parse.length;i++)
  {
    var output_url = parse[i].avatar_url;
          console.log(output_url);


  }

});