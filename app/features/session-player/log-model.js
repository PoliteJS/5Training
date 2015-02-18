
module.exports = LogModel;

function LogModel() {
    this.sessionEvents = [];
}

LogModel.prototype.push = function(data) {
    this.sessionEvents.push(data);
};
