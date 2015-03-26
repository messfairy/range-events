Object.prototype.clones = function(){
    if(Object.create) {
        return Object.create(this);
    }else{
        var OneShotConstructor = function(){};
        OneShotConstructor.prototype = this;
        return new OneShotConstructor();
    }
};

Object.prototype.forEachIn = function(callback) {
    for(var name in this)
        if(this.hasOwnProperty(name))
            callback(name, this[name]);
};

Object.prototype.mixins = function(fields) {
    var self = this;
    fields&&fields.forEachIn(function(name, value) {
        self[name] = value;
    });
    return this;
};

Object.prototype.extends = function(fields) {
    var result = this.clones();
    result.mixins(fields);
    return result;
};

Object.prototype.creates = function() {
    var object = this.clones();
    if (typeof object['construct'] === 'function')
        object['construct'].apply(object, arguments);
    return object;
};

Object.prototype.isA = function (prototype) {
    var DummyConstructor = function () {};
    DummyConstructor.prototype = prototype;
    return this instanceof DummyConstructor;
};
