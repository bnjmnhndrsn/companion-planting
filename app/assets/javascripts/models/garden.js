var Planting = Backbone.Model.extend({
    defaults: function(){
        return {
            garden_id: this.collection.garden_id
        };
    },
    initialize: function (options) {
        Backbone.Select.Me.applyTo( this );
        var plant = this.get('plant');

        if (plant) {
            this._listenToPlant();
        }
    },
    parse: function(response){
        if (response.plant) {
            response.plant = new CP.Models.Plant(response.plant);
        }

        return response;
    },
    urlRoot: '/api/plantings',
    toJSON: function(){
        var attrs = _.clone(this.attributes);
        if (attrs.plant) {
            attrs.plant = attrs.plant.toJSON();
        }
        return attrs;
    },
    _listenToPlant: function(){
        this.listenTo(this.get('plant'), 'change', function(){
            this.trigger('change:plant');
        });
    }
});

var Plantings = Backbone.Collection.extend({
    initialize: function (models, options){
        Backbone.Select.One.applyTo( this, models );
        this.garden_id = options.garden_id;
        this._matrix = [];
        this.on('add', this.onAdd);
    },
    _createMatrix: function(){
        this.each(function(planting){

        }, this);
    },
    get: function(i, j){
        if (arguments.length < 2) {
            return Backbone.Collection.prototype.get.call(this, i);
        }

        return (this._matrix[i] || {})[j];
    },
    onAdd: function(model){
        var i = +model.get('i'), j = +model.get('j');
        this._matrix[i] = (this._matrix[i] || []);
        this._matrix[i][j] = model;
    },
    model: Planting
});

CP.Models.Garden = Backbone.Model.extend({
    defaults: {
        gridInterval: 6
    },
    urlRoot: '/api/gardens',
    getPlantings: function(){
        this._plantings = this._plantings || new Plantings([], {garden_id: this.id});
        return this._plantings;
    },
    parse: function(response){
        var plantings = this.getPlantings();
        plantings.set(response.plantings || [], {parse: true});
        delete response.plantings;
        return response;
    },
    getPlanting: function(i, j) {
        return this.getPlantings().get(i, j);
    }
});
