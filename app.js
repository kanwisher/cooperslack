var Slack = require('slack-node');
var express = require('express');
var url = require('url');
var app = express();


////////////// THE SETUP ///////////////////////////////////////////

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'))

app.get('/', function (request, response) {

    var urlObject = url.parse(request.url, true).query
    console.log(urlObject)
    sendMessage(urlObject);

}); //app.get


/////////////// THE SEND MESSAGE //////////////////////////////////////////

function sendMessage(urlObject) {

    slack = new Slack();
    slack.setWebhook(urlObject.response_url);


    //   /mySlashCommand catfish    'catfish' is stored in var userCommand
    var userText = urlObject.text;

    var userCommand = userText.split(" ", 1);

    slack.webhook({
        channel: urlObject.channel_name,

        text: "Hello, you asked the magic 8 ball: " + userText + ", the Magic 8 Ball says: " + eightBall() + " Command: " + userCommand // the response back to slack

    }, function (err, response) {
        if (err) {
            console.log(err)
        }
    });
}

/////////////////////////////////////////////////////////

function eightBall() {
    var responseArray = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ]

    var randResponse = Math.floor(Math.random() * responseArray.length);

    return responseArray[randResponse];
}
