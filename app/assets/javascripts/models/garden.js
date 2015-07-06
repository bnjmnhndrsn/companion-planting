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
        if (this.get('plant')) {
            this._listenToPlant();
        }

        this.listenTo(this, 'sync', this._selectSuggestion);
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
            response.plant = new Backbone.Model(response.plant);
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
    },
    selectSuggestion: function(){
        var plant = this.get('plant');

        var suggestions = this.getSuggestions();

        if (!plant) {
            suggestions.deselect({silent: true});
            return;
        }

        var model = suggestions.get(plant.id);

        if (model) {
            model.select({silent: true});
        }
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
    }
});
