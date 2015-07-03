var Suggestion = Backbone.Model.extend({
    defaults: {
        'name': 'Ginger',
        'suitability': '100',
        'id': 1
    }
});

var Suggestions = Backbone.Collection.extend({
    model: Suggestion
});

var GardenSquare = Backbone.Model.extend({
    getSuggestions: function(){
        this._suggestions = this._suggestions || new Suggestions();
        return this._suggestions;
    },
    parse: function(response){
        var suggestions = this.getSuggestions();
        suggestions.set(response.suggestions || [], {parse: true});
        delete response.suggestions;
        return response;
    }
});

var GardenSquares = Backbone.Collection.extend({
    model: GardenSquare
});

CP.Models.Garden = Backbone.Model.extend({
    urlRoot: '/api/gardens',
    getGardenSquares: function(){
        this._gardenSquares = this._gardenSquares || new GardenSquares();
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
