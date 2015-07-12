CP.Views.GardenNewView = Marionette.ItemView.extend({
    template: JST['garden/new'],
    ui: {
        'submit': '[type="submit"]',
        'title': '[name="title"]'
    },
    events: {
        'click @ui.submit': 'createGarden',
        'input @ui.title': 'enableSubmit'
    },
    createGarden: function(){
        var title = this.ui.title.val();
        this.model.save({
            title: title
        },{
            success: function(response, model){
                var id = model.id
                Backbone.history.navigate('gardens/' + id, { trigger: true })
            }
        });
    },
    enableSubmit: function(){
        var val = this.ui.title.val();

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
