const SlackClient = require('./slackClient.js');

module.exports.report = (errorMessage, event, token) => {
    SlackClient.send(event, "Sorry about that, something went wrong :cry:",
        [
            {
                "title": errorMessage,
                "color": "danger",
                "mrkdwn_in": ["title"]
            }
        ],
        token);
}