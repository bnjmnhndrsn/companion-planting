CP.Views.GardenNewView = Marionette.ItemView.extend({
    template: JST['garden/new'],
    ui: {
        'submit': '[type="submit"]',
        'name': '[name="name"]'
    },
    events: {
        'click @ui.submit': 'createGarden',
        'input @ui.name': 'enableSubmit'
    },
    createGarden: function(){
        var name = this.ui.name.val();
        this.model.save({
            name: name
        },{
            success: function(response, model){
                var id = model.id
                Backbone.history.navigate('gardens/' + id, { trigger: true })
            }
        });
    },
    enableSubmit: function(){
        var val = this.ui.name.val();

        if (val && val.length) {
            this.ui.submit.removeClass('disabled');
        } else {
            this.ui.submit.addClass('disabled');
        }
    },
    onRender: function(){
        this.enableSubmit();
    }
});
