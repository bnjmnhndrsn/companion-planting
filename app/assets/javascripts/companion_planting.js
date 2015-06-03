window.CP = {}

window.CP.App = Marionette.Application.extend({
    onStart: function(){
        new CP.Router();
        
        if (Backbone.history){
            Backbone.history.start();
        }
        
        
    }
});

$(document).ready(function(){
    var app = new CP.App();
    app.start();
});
