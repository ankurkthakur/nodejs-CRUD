var Sentiment = require('sentiment');

const sentimentanaly = function(sentiment) {
    this.sentence = sentiment.sentence;
  };

  sentimentanaly.sentimentAnaly = (data, res) => {
    console.log(data.sentence);
    var options = {
        extras: {
          'done': -1
        }
      };
    var sentiment = new Sentiment();
    var result = sentiment.analyze(data.sentence,options);
    // console.dir(result);
    console.log(result)
    res(null, { sentiment: result});
  }

  module.exports = sentimentanaly;