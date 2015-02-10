/**
 * Created by hasee-pc on 2015/2/11.
 */
var undefined;
var clone = function (object) {
    if (Object.create) return Object.create(object);
    var DummyConstructor = function () {};
    DummyConstructor.prototype = object;
    return new DummyConstructor;
};

var forEachIn = function (object, fn) {
    for (var name in object) {
        if (Object.prototype.hasOwnProperty.call(object, name))
            fn(name, object[name]);
    }
};
var mixInto = function (object, mixIn) {
    forEachIn(mixIn, function(name, value){
        object[name] = value;
    });
};
Object.prototype.create = function () {
    var object = clone(this);
    if (object.construct != undefined)
        object.construct.apply(object, arguments);
    return object;
};

Object.prototype.extend = function (properties) {
    var result = clone(this);
    forEachIn(properties, function (name, value) {
        result[name] = value;
    });
    return result;
};

Object.prototype.isA = function (prototype) {
    var DummyConstructor = function () {
    };
    DummyConstructor.prototype = prototype;
    return this instanceof DummyConstructor;
};