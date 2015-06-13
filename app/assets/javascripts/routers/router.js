var channel = Backbone.Radio.channel('global');

window.CP.Router = Backbone.Router.extend({
    routes: {
        'gardens/:id': 'showGarden'
    },
    showGarden: function(){        
        var mainRegion = channel.request('main');
        var model = new CP.Models.Garden();
        var view = CP.Views.GardenLayoutView({model: model});
        mainRegion.show(view);
    }
});