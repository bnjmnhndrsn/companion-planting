CP.Collections.Plants = Backbone.Collection.extend({
    initialize: function(models, options){
        Backbone.Select.One.applyTo( this, models );
    },
    model: CP.Models.Plant,
    url: '/api/plants'
});
