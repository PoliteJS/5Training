
module.exports = LogModel;

function LogModel(session, options) {
    this.session = session;
    this.options = options;
    this.sessionEvents;
}

LogModel.prototype.reset = function() {
    this.sessionEvents = [];
};

LogModel.prototype.push = function(data) {
    this.sessionEvents.push(data);
};
