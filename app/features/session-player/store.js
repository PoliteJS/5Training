
var subscribable = require('jqb-subscribable');

var playerDispatcher = require('./dispatcher');
var SessionModel = require('./session-model');
var LogModel = require('./log-model');

var channel;
var sessionModel;
var logModel;
var dispatcherIndex;

exports.init = function(session, options) {
    console.log('>> init player store');
    channel = subscribable.create();

    sessionModel = new SessionModel(session, options);
    logModel = new LogModel(session, options);

    // collect subscriptions for dispose?
    sessionModel.subscribe(computeStatus);
    playerDispatcher.register(dispatcherCallback);
};

exports.dispose = function() {
    console.log('<< dispose player store');
    // dispose models
    // dispose dispatcher
};

exports.disposeSession = function() {
    sessionModel = null;
};

exports.subscribe = function(fn) {
    channel.on('new-state', fn);
};

function dispatcherCallback(action) {
    switch (action.actionType) {
        case 'start':
            logModel.reset();
            sessionModel.start();
            break;
        case 'stop':
            sessionModel.stop();
            break;
        case 'pause':
            sessionModel.pause();
            break;
        case 'resume':
            sessionModel.resume();
            break;
        case 'reset':
            sessionModel.reset();
            logModel.reset();
            break;
        case 'data':
            logModel.push(action.data);
            break;
    }
}

function computeStatus() {

    var state = {
        // clock model
        hasRan: sessionModel.hasRan,
        isRunning: sessionModel.isRunning,
        isPaused: sessionModel.isPaused,
        elapsedTime: sessionModel.elapsedTime,
        currentStep: sessionModel.currentStep,
        stepElapsedTime: sessionModel.stepElapsedTime,
        stepPausedTime: sessionModel.stepPausedTime,
        stepActivityTime: sessionModel.stepActivityTime,
        stepCountdown: sessionModel.stepCountdown,

        // log model
        tempResults: logModel.sessionEvents
    };

    channel.emit('new-state', state);
}
