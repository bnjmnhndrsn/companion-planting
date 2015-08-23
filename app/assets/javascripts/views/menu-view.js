CP.Views.MenuView = Mn.ItemView.extend({
    ui: {
        'plants': '[data-ui="plants"]'
    },
    events: {
        'change @ui.plants': 'changePlant'
    },
    template: JST['garden/menu'],
    initialize: function(){
        this.plantings = this.model.getPlantings();
        this.listenTo(this.plantings, 'select:one', this.onPlantingSelect);
        this.listenTo(this.plantings, 'deselect:one', this.onPlantingDeselect);
    },
    templateHelpers: function(){
        return {
            plants: CP.Collections.plants.toJSON()
        };
    },
    onShow: function(){
        this.ui.plants.select2();
    },
    onPlantingSelect: function(planting){
        this.ui.plants.val(planting.get('plant').id).change();
    },
    onPlantingDeselect: function(planting){
        this.ui.plants.val(null);
    },
    changePlant: function(){
        var val = this.ui.plants.val();
        var plant = CP.Collections.plants.get(val);
        if (this.plantings.selected) {
            this.plantings.selected.save({'plant': plant});
        } else {
            plant.select();
        }
    }
});
