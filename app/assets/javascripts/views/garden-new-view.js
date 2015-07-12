CP.Views.GardenNewView = Marionette.ItemView.extend({
    template: JST['garden/new'],
    ui: {
        'submit': '[type="submit"]',
        'title': '[name="title"]',
        'width': '[name="width"]',
        'height': '[name="height"]'
    },
    events: {
        'click @ui.submit': 'createGarden',
        'input input': 'enableSubmit',
        'change input': 'enableSumit'
    },
    createGarden: function(){
        this.model.save(this.getInput(), {
            success: function(response, model){
                var id = model.id;
                Backbone.history.navigate('gardens/' + id, { trigger: true });
            }
        });
    },
    getInput: function(){
        return {
            title: this.ui.title.val(),
            width: this.ui.width.val(),
            height: this.ui.height.val()
        };
    },
    enableSubmit: function(){
        var hasInput = _.all(this.getInput(), function(val, key){
            return val && val.length;
        });

        this.ui.submit.toggleClass('disabled', !hasInput);

    },
    onRender: function(){
        this.enableSubmit();
    }
});
