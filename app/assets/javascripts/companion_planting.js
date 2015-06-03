window.CP = {
    Views: {},
    Models: {},
    Collection: {},
    Routers: {}
}

var channel = Backbone.Radio.channel('global');

window.CP.App = Marionette.Application.extend({
    onStart: function(){
        new CP.Router();
        
        if (Backbone.history){
            Backbone.history.start();
        }
        
        var appView = new CP.Views.AppView({el: this.getOption('$el')})
        
        appView.render();
        
        channel.comply('get:region', function(region){
            return appView.getRegion(region);
        });
        
    }
});

$(document).ready(function(){
    var app = new CP.App({$el: $('#app')});
    app.start();
});
