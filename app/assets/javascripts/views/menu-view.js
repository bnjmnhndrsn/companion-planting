CP.Views.MenuView = Mn.ItemView.extend({
    ui: {
        'plants': '[data-ui="plants"]'
    },
    events: {
        'change ui.plants': 'changePlant'
    },
    template: JST['garden/menu'],
    initialize: function(){
        this.plantings = this.model.getPlantings();
        this.listenTo('plantings', 'select')
    },
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
        var selected = this.model.get('selected');
        if (selected && !(selected instanceof CP.Models.Plant)) {
            //its a node
        }

        this.model.set('selected', plant);
    }
});
