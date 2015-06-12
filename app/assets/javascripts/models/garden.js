CP.Models.Garden = Backbone.Model.extend({
    getGardenSquares: function(){
        this._gardenSquares = this._gardenSquares || new Backbone.Collection();
        return this._gardenSquares;
    },
    parse: function(response){
        var gardenSquares = this.getGardenSquares();
        gardenSquares.set(response.garden_squares || [], {parse: true});
        delete response.garden_squares;
        return response;
    }
});