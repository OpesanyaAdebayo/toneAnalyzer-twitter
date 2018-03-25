const readline = require('readline');
require("dotenv").config();

const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const getTweets = require('./getTweets');

const tone_analyzer = new ToneAnalyzerV3({
  username: process.env.TONE_ANALYZER_USERNAME,
  password: process.env.TONE_ANALYZER_PASSWORD,
  version_date: process.env.TONE_ANALYZER_VERSION_DATE
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter a twitter Handle for Watson to analyze...', (handle) => {

  console.log("Your results should show up soon. Thank you.");

  getTweets(handle).then((tweets) => {
    let params = {
      tone_input: tweets,
      content_type: 'text/plain',
      sentences: false
    };
    tone_analyzer.tone(params, function (error, response) {
      if (error) {
        console.error(error);
      } else {
        console.log(JSON.stringify(response, null, 2));
      }
    });

    rl.close();
  }).catch(err => console.error(err));

});