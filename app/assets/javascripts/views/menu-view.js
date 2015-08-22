CP.Views.MenuView = Mn.LayoutView.extend({
    ui: {
        'plants': '[data-ui="plants"]'
    },
    events: {
        'change ui.plants': 'changePlant'
    },
    template: JST['garden/menu'],
    templateHelpers: function(){
        return {
            plants: CP.Collections.plants.toJSON()
        };
    },
    onShow: function(){
        this.ui.plants.select2();
    },
    changePlant: function(){
        var val = this.ui.plants.val();
        var plant = CP.Collections.plants.get(val);
        this.model.set('selected', plant);
    }
});
