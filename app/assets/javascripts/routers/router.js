var channel = Backbone.Radio.channel('global');

window.CP.Router = Backbone.Router.extend({
    routes: {
        'gardens': 'gardenIndex',
        'gardens/new': 'gardenNew',
        'gardens/:id': 'gardenShow'
    },
    gardenIndex: function(){
        var mainRegion = channel.request('get:region', 'main');
        var collection = new CP.Collections.Gardens();
        collection.fetch({
            success: function(){
                var view = new CP.Views.GardenIndexView({collection: collection});
                mainRegion.show(view);
            }
        });
    },
    gardenNew: function(){
        var mainRegion = channel.request('get:region', 'main');
        var model = new CP.Models.Garden();
        var view = new CP.Views.GardenNewView({model: model});
        mainRegion.show(view);
    },
    gardenShow: function(id){
        var mainRegion = channel.request('get:region', 'main');
        var model = new CP.Models.Garden({id: id});
        var modelPromise = model.fetch();
        model.fetch().done(function(){
            var view = new CP.Views.GardenLayoutView({model: model});
            mainRegion.show(view);
        });
    }
});
