var Suggestion = Backbone.Model.extend({
    defaults: {
        'plant_name': 'Ginger',
        'suitability': '100'
    }
});

var Suggestions = Backbone.Collection.extend({
    model: Suggestion
});

var GardenSquare = Backbone.Model.extend({
    getSuggestions: function(){
        this._suggestions = this._suggestions || new Suggestions();
        return this._gardenSquares;
    },
    parse: function(response){
        var gardenSquares = this.getGardenSquares();
        gardenSquares.set(response.garden_squares || [], {parse: true});
        delete response.garden_squares;
        return response;
    }
});

var GardenSquares = Backbone.Collection.extend({
    model: GardenSquare
});

CP.Models.Garden = Backbone.Model.extend({ 
    getGardenSquares: function(){
        this._gardenSquares = this._gardenSquares || new GardenSquares();
        return this._gardenSquares;
    },
    parse: function(response){
        var gardenSquares = this.getGardenSquares();
        gardenSquares.set(response.garden_squares || [], {parse: true});
        delete response.garden_squares;
        return response;
    }
});