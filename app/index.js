/**
 * PoliteJS Workspace Boilerplate
 * ==============================
 * 
 * This is the main entry point of you application.
 * require here the modules your app needs to startup.
 *
 * NOTE: Non essential modules should be loaded asynchronously!
 * (http://webpack.github.io/docs/code-splitting.html)
 */

var React = require('react');

var SessionPlayer = require('session-player');
var sessionData = require('session/test.json');


var training = React.createElement(SessionPlayer, {
    session: sessionData,
    isRunning: false
});

React.render(
    training,
    document.getElementById('app')
);


//
//var training = new TrainingSession(trainingData);
//training.start();
//
//if (false) {
//    setTimeout(function() {
//        training.pause();
//    }, 100);
//
//    setTimeout(function() {
//        training.resume();
//    }, 1000);
//
//    setTimeout(function() {
//        training.pause();
//    }, 1200);
//
//    setTimeout(function() {
//        training.resume();
//    }, 3000);
//
//    setTimeout(function() {
//        training.pause();
//    }, 3400);
//
//    setTimeout(function() {
//        training.resume();
//    }, 5600);
//}
