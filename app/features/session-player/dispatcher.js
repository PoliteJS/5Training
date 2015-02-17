
var subscribable = require('jqb-subscribable');

var channel;

if (!channel) {
    channel = subscribable.create();
}

module.exports = {
    dispatch: function(payload) {
        channel.emit('payload', payload);
    },
    register: function(fn) {
        return channel.on('payload', fn);
    }
};
