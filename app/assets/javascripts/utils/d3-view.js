// An object to wrap up d3 UI in a Backbone.View-like container
// @events: a hash of events bound to the el of the form {'key': 'method'}
//          handlers defined this way are called in the context of D3View
//          and have the signature function(node, d, i){ ... }
// @modelEvents: a hash of events bound to the model, of the form {'key': 'method'}

CP.Utils.D3View = Mn.Object.extend({
    constructor: function(options){
        this.options = _.extend({}, _.result(this, 'options'), options);
        this.model = this.getOption('model');
        this.scale = this.getOption('scale');
        this.el = this.getOption('el');

        if (!this.el) {
            throw new Marionette.Error({
                name: 'NoElError',
                message: 'An "el" must be specified for a region.'
            });
        }

        this.d3 = d3.select(this.el);
        this.bindEvents();
        this.bindModelEvents();
        this.initialize.apply(this, arguments);
    },
    bindModelEvents: function(){
        var events = this.getOption('modelEvents');
        if (!events) return;
        _.each(events, function(val, key){
            var method = val;
            if (!_.isFunction(method)) method = this.getOption(val);
            if (!method) return;
            this.listenTo(this.model, key, method);
        }, this);
    },
    bindEvents: function(){
        var events = this.getOption('events');
        if (!events) return;
        _.each(events, function(val, key){
            var method = val;
            if (!_.isFunction(method)) method = this.getOption(val);
            if (!method) return;
            this.d3.on(key + '.' + this.cid, this.bindEvent(method))
        }, this);
    },
    bindEvent: function(callback) {
        var view = this;

        return function(d, i){
            var node = this;
            callback.call(view, node, d, i);
        }
    },
    destroy: function(){
        Mn.Object.prototype.destroy.call(this);
        this.unbindEvents();
        this.unbindModelEvents();
    },
    unbindEvents: function(){
        this.d3.on('.' + this.cid, null);
    },
    unbindModelEvents: function(){
        this.stopListenting(this.model);
    }
});
