
module.exports = SessionModel;

function SessionModel(sessionSchedule, options) {
    this.session = sessionSchedule;
    this.options = options;
    
    this.hasRan;
    this.isRunning;
    this.isPaused;
    this.isPaused = false;
    
    this.__timer;
    this.startTime;
    this.elapsedTime;

    this.pauseStartTime;
    this.pauseElapsedTime;

    this.previousStepIndex;
    this.previousStep;
    
    this.currentStepIndex;
    this.currentStep;
    this.stepStartTime;
    this.stepDuration;
    this.stepElapsedTime;
    this.stepPausedTime;
    this.stepActivityTime;
    this.stepCountdown;
    this.__stepPartialPausedTime;
    
    this.__eventHandlers = [];
}

SessionModel.prototype.reset = function() {
    this.hasRan = false;
    this.isRunning = false;
    
    this.startTime = null;
    this.elapsedTime = 0;

    this.pauseStartTime = null;
    this.pauseElapsedTime = 0;

    this.previousStepIndex = null;
    this.previousStep = null;
    
    this.currentStepIndex = null;
    this.currentStep = null;
    this.stepStartTime = now();
    this.stepDuration = 0;
    this.stepElapsedTime = 0;
    this.stepPausedTime = 0;
    this.stepActivityTime = 0;
    this.stepCountdown = 0;
    this.__stepPartialPausedTime = 0;
    
    this.emit('reset');
};

SessionModel.prototype.start = function() {
    this.reset();
    this.isRunning = true;
    this.step(0);
    this.tick();
    this.__timer = setInterval(this.tick.bind(this), 100);
    this.emit('start');
};

SessionModel.prototype.stop = function() {
    clearInterval(this.__timer);
    if (this.isPaused) {
        this.resume();
    }
    this.hasRan = true;
    this.isRunning = false;
    this.emit('stop');
};

SessionModel.prototype.pause = function() {
    this.isPaused = true;
    this.pauseElapsedTime = 0;
    this.pauseStartTime = now();
    this.emit('pause');
};

SessionModel.prototype.resume = function() {
    this.isPaused = false;
    this.stepDuration += this.pauseElapsedTime;
    this.__stepPartialPausedTime += this.pauseElapsedTime;
    this.emit('resume');
};

SessionModel.prototype.finish = function() {
    this.stop();
    this.emit('finish');
};

SessionModel.prototype.tick = function() {
        
    this.elapsedTime = now() - this.startTime;
    this.stepElapsedTime = now() - this.stepStartTime;
    this.stepCountdown = this.stepDuration - this.stepElapsedTime;
    
    if (this.isPaused) {
        this.pauseElapsedTime = now() - this.pauseStartTime;
        this.stepCountdown += this.pauseElapsedTime;
        this.stepPausedTime = this.__stepPartialPausedTime + this.pauseElapsedTime;
    }
    
    if (!this.isPaused && this.stepElapsedTime > this.stepDuration) {
        this.stepElapsedTime = this.stepDuration;
    }

    this.stepActivityTime = this.stepElapsedTime - this.stepPausedTime;

    if (this.stepActivityTime > this.stepDuration) {
        this.stepActivityTime = this.stepDuration;
    }
    
    if (this.stepCountdown < 0) {
        this.stepCountdown = 0;
    }
    
    this.emit('tick');
    
    if (this.stepCountdown === 0) {
        this.walk();
    }
};

SessionModel.prototype.walk = function() {
    var nextStepIndex = this.currentStepIndex + 1;
    
    if (nextStepIndex >= this.session.schedule.length) {
        this.finish();
        return;
    }
    
    this.previousStepIndex = this.currentStepIndex;
    this.previousStep = this.currentStep;
    this.step(nextStepIndex);
};

SessionModel.prototype.step = function(stepIndex) {
    this.currentStepIndex = stepIndex;
    this.currentStep = this.session.schedule[this.currentStepIndex];
    this.stepStartTime = now();
    this.stepElapsedTime = 0;
    this.stepPausedTime = 0;
    this.__stepPartialPausedTime = 0;
    this.stepActivityTime = 0;
    this.stepDuration = this.currentStep.duration;
    this.emit('step');
};

SessionModel.prototype.emit = function(eventName) {
    this.__eventHandlers.forEach(function(eventHandler) {
        eventHandler(eventName, this);
    }.bind(this));
};

SessionModel.prototype.subscribe = function(eventHandler) {
    this.__eventHandlers.push(eventHandler);
};

function now() {
    return (new Date()).getTime();
}
