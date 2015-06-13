var channel = Backbone.Radio.channel('global');

window.CP.Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'gardens/:id': 'showGarden'
    },
    showGarden: function(id){        
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