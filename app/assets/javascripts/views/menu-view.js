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
        this.listenTo(CP.Collections.plants, 'deselect:one', this.onPlantDeselect);
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
        var plantId = (planting.get('plant') || {}).id;
        var currentVal = this.ui.plants.val();
        if (plantId != currentVal) {
            this.ui.plants.val(String(plantId)).change();
        }
    },
    onPlantingDeselect: function(planting){
        if (!this.plantings.selected) {
            this.ui.plants.val(null).change();
        }
    },
    onPlantDeselect: function(){
        this.ui.plants.val(null).change();
    },
    changePlant: function(){
        var val = this.ui.plants.val();
        var plant = CP.Collections.plants.get(val);
        if (this.plantings.selected) {
            this.plantings.selected.save({'plant': plant});
        } else {
            if (plant) plant.select();
        }
    }
});
