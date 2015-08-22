window.CP = {
    Views: {},
    Models: {},
    Collections: {},
    Routers: {},
    Utils: {}
};

var channel = Backbone.Radio.channel('global');

window.CP.App = Marionette.Application.extend({
    onStart: function(){
        var promises = this.setUpEntities();
        $.when(promises).done(this.setUpAppView.bind(this));
    },
    setUpEntities: function(){
        var plants = CP.Collections.plants = new CP.Collections.Plants();
        return [plants];
    },
    setUpAppView: function(){
        var appView = new CP.Views.AppView({el: this.getOption('$el')})

        appView.render();

        channel.reply('get:region', function(region){
            return appView.getRegion(region);
        });

        new CP.Router();

        if (Backbone.history){
            Backbone.history.start({pushState: true});
        }
    }
});

$(document).ready(function(){
    var app = new CP.App({$el: $('#app')});
    app.start();
});
