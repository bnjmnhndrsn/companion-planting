var Suggestion = Backbone.Model.extend({
    initialize: function(options){
        Backbone.Select.Me.applyTo( this );
    }
});

var Suggestions = Backbone.Collection.extend({
    initialize: function(models, options){
        Backbone.Select.One.applyTo( this, models, options );
    },
    model: Suggestion
});

var Planting = Backbone.Model.extend({
    defaults: function(){
        return {
            garden_id: this.collection.garden_id
        };
    },
    initialize: function () {
        var plant = this.get('plant');

        if (plant) {
            this._listenToPlant();
            this.getSuggestions().add( plant ).select();
        }
    },
    getSuggestions: function(){
        this._suggestions = this._suggestions || new Suggestions();
        return this._suggestions;
    },
    parse: function(response){
        var suggestions = this.getSuggestions();
        suggestions.set(response.suggestions || [], {parse: true});
        delete response.suggestions;

        if (response.plant) {
            response.plant = new Suggestion(response.plant);
        }

        return response;
    },
    fetchOrCreate: function(options){
        return (this.isNew()) ?  this.save({}, options) : this.fetch(options);
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
        this.garden_id = options.garden_id;
    },
    model: Planting
});

CP.Models.Garden = Backbone.Model.extend({
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
        return this.getPlantings().findWhere({i: i, j: j});
    }
});
