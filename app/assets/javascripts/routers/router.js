var channel = Backbone.Radio.channel('global');

window.CP.Router = Backbone.Router.extend({
    routes: {
        'gardens': 'gardenIndex',
        'gardens/new': 'gardenCreate',
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
        })
    },
    gardenCreate: function(){
        var mainRegion = channel.request('get:region', 'main');
    },
    gardenShow: function(id){
        var mainRegion = channel.request('get:region', 'main');
        var model = new CP.Models.Garden({id: id});
        model.fetch({
            success: function(){
                var view = new CP.Views.GardenLayoutView({model: model});
                mainRegion.show(view);
            }
        });
    }
});
