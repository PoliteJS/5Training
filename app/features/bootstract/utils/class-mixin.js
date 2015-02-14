/**
 * Class list utility, it takes two lists of classes and returns
 * the resulting ClassMap instance.
 *
 * the first list is a "safe list", all items are added.
 * the second list is filtered with an optional custom logic
 *
 * the resulting list is transformed with a custom logic that you
 * can use to prefix or postfix your classes.
 */

var ClassMap = require('./class-map');

module.exports = classMixin;

function classMixin(origin, addons, filterFn, transformFn) {
    origin = toArray(origin);
    addons = toArray(addons).filter(filterFn || filterAll);
    return new ClassMap(origin.concat(addons).map(transformFn || untouch));
}

function toArray(str) {
    if (!str) {
        return [];
    }
    if ('string' === typeof str) {
        return str.split(' ');
    }
    return str;
}

function filterAll() {
    return true;
}

function untouch(item) {
    return item;
}
