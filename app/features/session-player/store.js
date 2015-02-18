
var subscribable = require('jqb-subscribable');

var playerDispatcher = require('./dispatcher');
var SessionModel = require('./session-model');
var LogModel = require('./log-model');

var channel;
var sessionModel;
var logModel;
var dispatcherIndex;

exports.init = function() {
    console.log('init session training player store');
    channel = subscribable.create();
    dispatcherIndex = playerDispatcher.register(dispatcherCallback);
};

exports.configSession = function(session, options) {
    if (sessionModel) {
        this.disposeSession();
    }
    sessionModel = new SessionModel(session, options);
    sessionModel.subscribe(computeStatus);

    if (logModel) {
        this.dispose();
    }
    logModel = new LogModel(session, options);
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
            break;
        case 'data':
            // this should go into a "sessionLog" model!!!
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

// singleton initialisation
if (!channel) {
    exports.init();
}
