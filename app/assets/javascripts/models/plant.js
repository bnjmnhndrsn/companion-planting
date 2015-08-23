CP.Models.Plant = Backbone.Model.extend({
    initialize: function(){
        Backbone.Select.Me.applyTo( this );
    },
    urlRoot: 'api/plants'
});
