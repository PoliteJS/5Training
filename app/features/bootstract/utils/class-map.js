//'use strict';

/**
 * Represent a list of classes to be given to a React's component
 *
 *   var classes = new ClassMap(['foo','fii',faa']);
 *   classes.set('fii', false);
 *   return <div className={classes} />
 *   ---> <div class="foo faa"></div>
 */

module.exports = ClassMap;

function ClassMap(classes) {
    this.list = [];
    this.map = {};
    this.prefix = null;
    this.suffix = null;
    this.add(classes);
}

ClassMap.prototype.setPrefix = function(val) {
    this.prefix = val;
    return this;
};

ClassMap.prototype.setSuffix = function(val) {
    this.suffix = val;
    return this;
};

ClassMap.prototype.add = function(classes) {
    if (classes) {
        if ('string' === typeof classes) {
            classes = classes.split(' ');
        }
        classes.forEach(this.addClass.bind(this));
    }
    return this;
};

ClassMap.prototype.set = function(cname, val) {
    this.addClass(cname);
    this.map[cname] = val;
    return this;
};

ClassMap.prototype.addClass = function(cname) {
    if (undefined === cname) {
        return;
    }
    if (undefined === this.map[cname]) {
        this.list.push(cname);
    }
    this.map[cname] = true;
    return this;
};

ClassMap.prototype.toString = function(prefix, suffix) {
    var map = this.map;

    prefix = prefix || this.prefix;
    suffix = suffix || this.suffix;

    function prefixFn(item) {
        if (prefix) {
            item = prefix + item;
        }
        if (suffix) {
            item = item + suffix;
        }
        return item;
    }

    function reduceFn(val, item) {
        if (true !== map[item]) {
            return val;
        }
        return [val, prefixFn(item)].join(' ');
    }

    return this.list
        .reduce(reduceFn, '')
        .trim();
};
