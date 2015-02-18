
module.exports = LogModel;

function LogModel() {
    this.sessionEvents = [];
}

LogModel.prototype.dispose = function(evt, fn) {
    
};

LogModel.prototype.push = function(data) {
    this.sessionEvents.push(data);
};
