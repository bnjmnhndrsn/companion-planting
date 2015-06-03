var channel = Backbone.Radio.channel('global');

window.CP.Router = Backbone.Router.extend({
    routes: {
        '': 'showGarden'
    },
    showGarden: function(){        
        var mainRegion = channel.request('main');
        
    }
});