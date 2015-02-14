
module.exports = TrainingSession;

function TrainingSession(sessionSchedule, options) {
    this.sessionSchedule = sessionSchedule;
    this.options = options;
    
    this.hasRan;
    this.isRunning;
    this.sessionEvents;
    
    this.__timer;
    this.startTime;
    this.elapsedTime;
    
    this.currentStepIndex;
    this.currentStep;
    this.stepStartTime;
    this.stepElapsedTime;
    this.stepDuration;
    this.stepCountdown;
    
    this.previousStepIndex;
    this.previousStep;
    
    this.isPaused;
    this.pauseStartTime;
    this.pauseElapsedTime;
    
    this.__eventHandlers = [];
}

TrainingSession.prototype.reset = function() {
    this.hasRan = false;
    this.isRunning = false;
    this.sessionEvents = [];
    
    this.startTime = now();
    this.elapsedTime = 0;
    
    this.currentStepIndex = null;
    this.currentStep = null;
    this.stepStartTime = now();
    this.stepElapsedTime = 0;
    this.stepDuration = 0;
    this.stepCountdown = 0;
    
    this.previousStepIndex = null;
    this.previousStep = null;
    
    this.isPaused = false;
    this.pauseElapsedTime = 0;

    this.emit('reset');
};

TrainingSession.prototype.start = function() {
    this.reset();
    this.isRunning = true;
    this.step(0);
    this.tick();
    this.__timer = setInterval(this.tick.bind(this), 100);
    this.emit('start');
};

TrainingSession.prototype.stop = function() {
    if (this.isPaused) {
        this.resume();
    }
    clearInterval(this.__timer);
    this.hasRan = true;
    this.isRunning = false;
    this.emit('stop');
};

TrainingSession.prototype.pause = function() {
    this.isPaused = true;
    this.pauseStartTime = now();
    this.emit('pause');
};

TrainingSession.prototype.resume = function() {
    this.isPaused = false;
    this.stepDuration += this.pauseElapsedTime;
    this.emit('resume');
};

TrainingSession.prototype.finish = function() {
    this.stop();
    this.emit('finish');
};

TrainingSession.prototype.tick = function() {
    var stepCountdown;
    
    this.elapsedTime = now() - this.startTime;
    this.stepElapsedTime = now() - this.stepStartTime;
    this.stepCountdown = this.stepDuration - this.stepElapsedTime;
    
    if (this.isPaused) {
        this.pauseElapsedTime = now() - this.pauseStartTime;
        this.stepCountdown += this.pauseElapsedTime;
    }
    
    if (!this.isPaused && this.stepElapsedTime > this.stepDuration) {
        this.stepElapsedTime = this.stepDuration;
    }
    
    if (this.stepCountdown < 0) {
        this.stepCountdown = 0;
    }
    
    this.emit('tick');
    
    if (this.stepCountdown === 0) {
        this.walk();
    }
};

TrainingSession.prototype.walk = function() {
    var nextStepIndex = this.currentStepIndex + 1;
    
    if (nextStepIndex >= this.sessionSchedule.activities.length) {
        this.finish();
        return;
    }
    
    this.previousStepIndex = this.currentStepIndex;
    this.previousStep = this.currentStep;
    this.step(nextStepIndex);
};

TrainingSession.prototype.step = function(stepIndex) {
    this.currentStepIndex = stepIndex;
    this.currentStep = this.sessionSchedule.activities[this.currentStepIndex];
    this.stepStartTime = now();
    this.stepElapsedTime = 0;
    this.stepDuration = this.currentStep.duration;
    this.emit('step');
};

TrainingSession.prototype.emit = function(eventName) {
    this.__eventHandlers.forEach(function(eventHandler) {
        eventHandler(eventName, this);
    }.bind(this));
};

TrainingSession.prototype.subscribe = function(eventHandler) {
    this.__eventHandlers.push(eventHandler);
};

TrainingSession.prototype.push = function(data) {
    this.sessionEvents.push(data);
    this.emit('event-data', data);
};

function now() {
    return (new Date()).getTime();
}
