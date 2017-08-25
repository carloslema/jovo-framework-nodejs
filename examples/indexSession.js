'use strict';

const webhook = require('../index').Webhook;

webhook.listen(3000, function() {
    console.log('Example server listening on port 3000!');
});

const app = require('../index').Jovo;
app.enableRequestLogging();
app.enableResponseLogging();

// listen for post requests
webhook.post('/webhook', function(req, res) {
    app.handleRequest(req, res, handlers);
    app.execute();
});


let handlers = {

    'LAUNCH': function() {
        app.tell('App launched');
    },
    'HelloWorldIntent': function() {
        app.addSessionAttribute('name', 'John Doe');
        app.tell('Hello World');
    },
    'SessionIntent': function() {
        app.tell('Hello ' + app.getSessionAttribute('name'));
    },
};