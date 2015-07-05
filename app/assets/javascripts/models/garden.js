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

var GardenSquare = Backbone.Model.extend({
    defaults: function(){
        return {
            garden_id: this.collection.garden_id
        };
    },
    getSuggestions: function(){
        this._suggestions = this._suggestions || new Suggestions();
        return this._suggestions;
    },
    parse: function(response){
        var suggestions = this.getSuggestions();
        suggestions.set(response.suggestions || [], {parse: true});
        delete response.suggestions;

        var plant =
        return response;
    },
    fetchOrCreate: function(options){
        return (this.isNew()) ?  this.save({}, options) : this.fetch(options);
    },
    urlRoot: '/api/garden_squares',
    toJSON: function(){
        var attrs = _.clone(this.attributes);
        attrs.plant =
    }
});

var GardenSquares = Backbone.Collection.extend({
    initialize: function (models, options){
        this.garden_id = options.garden_id;
    },
    model: GardenSquare
});

CP.Models.Garden = Backbone.Model.extend({
    urlRoot: '/api/gardens',
    getGardenSquares: function(){
        this._gardenSquares = this._gardenSquares || new GardenSquares([], {garden_id: this.id});
        return this._gardenSquares;
    },
    parse: function(response){
        var gardenSquares = this.getGardenSquares();
        gardenSquares.set(response.garden_squares || [], {parse: true});
        delete response.garden_squares;
        return response;
    },
    getGardenSquare: function(i, j){
        return this.getGardenSquares.where({column: j, row: i});
    }
});
