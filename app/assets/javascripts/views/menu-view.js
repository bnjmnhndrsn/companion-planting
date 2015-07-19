var DetailView = Mn.ItemView.extend({
    template: JST['garden/menu-detail']
});

var PlantSuggestionView = Mn.ItemView.extend({
    events: {
        'change @ui.checkbox': 'select'
    },
    modelEvents: {
        'deselected': 'deselect'
    },
    ui: {
        'checkbox': 'input[type="checkbox"]'
    },
    template: JST['garden/menu-plant-suggestion'],
    tagName: 'li',
    className: 'form-inline',
    select: function(){
        this.model.select();
    },
    deselect: function(){
        this.ui.checkbox.prop('checked', false);
    },
    templateHelpers: function(){
        return {
            isSelected: this.model.selected
        };
    }
});

var PlantingsView = Mn.CompositeView.extend({
    template: JST['garden/menu-plantings'],
    ui: {
        plant: '[name="plant"]'
    },
    childViewContainer: 'ul',
    childView: PlantSuggestionView,
    initialize: function(){
        this.collection = this.model.getSuggestions();
        this.listenTo(this.collection, 'select:one', this.selectSuggestion);
    },
    selectSuggestion: function(suggestion, collection){
        this.model.save({
            plant: suggestion
        }, {
            success: function () {
                console.log('garden square saved');
            }
        });
    },
    templateHelpers: function(){
        return {
            hasSuggestions: this.collection.length > 0
        };
    },
    onRender: function(){
        this.ui.plant.select2();
    }
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    ui: {
        'emptyText': '[data-ui="emptyText"]'
    },
    regions: {
        plantings: '[data-region="plantings"]'
    },
    initialize: function(){
        var plantings = this.model.getPlantings();
        this.listenTo(plantings, 'select', this.updateMenu);
    },
    updateMenu: function(model){
        this.ui.emptyText.hide();
        this.showChildView('plantings', new PlantingsView({model: model}));
    }
});
