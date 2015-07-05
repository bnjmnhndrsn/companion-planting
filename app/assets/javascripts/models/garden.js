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
    urlRoot: '/api/garden_squares',
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
            this.suggestions.deselect({silent: true});
            return;
        }

        var model = suggestions.get(plant.id);

        if (model) {
            model.select({silent: true});
        }
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
