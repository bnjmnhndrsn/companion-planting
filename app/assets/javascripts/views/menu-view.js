var DetailView = Mn.ItemView.extend({
    template: JST['garden/menu-detail'],
    ui: {
        'edit': '[data-ui="edit"]'
    },
    events: {
        'click @ui.edit': 'startEditing'
    },
    startEditing: function(e){
        e.preventDefault();
        this.model.trigger('edit:start', this.model);
    }
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

var EditorView = Mn.CompositeView.extend({
    events: {
        'change @ui.plant': 'selectPlant'
    },
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
    selectPlant: function(){
        var view = this;
        var plant = CP.Collections.plants.get(this.ui.plant.val());
        var promise = this.model.save({
            plant: plant,
            radius: plant.get('radius')
        });

        promise.done(function(){
            view.model.trigger('unselect', view.model);
        })

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
            plants: CP.Collections.plants.toJSON(),
            hasSuggestions: this.collection.length > 0
        };
    },
    onRender: function(){
        this.ui.plant.select2();
    }
});

var OptionsView = Mn.LayoutView.extend({
    template: JST['garden/menu-options'],
    ui: {
        plant: '[name="plant"]'
    },
    onRender: function(){
        this.ui.plant.select2();
    },
    events: {
        'change @ui.plant': 'selectPlant'
    },
    selectPlant: function(){
        var plant = CP.Collections.plants.get(this.ui.plant.val());
        this.model.set('selected', plant);
    },
    templateHelpers: function(){
        return {
            plants: CP.Collections.plants.toJSON()
        };
    },
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    regions: {
        plantings: '[data-region="plantings"]'
    },
    initialize: function(){
        var plantings = this.model.getPlantings();
        this.listenTo(plantings, 'select', this.showEditor);
        this.listenTo(plantings, 'unselect', this.showOptions);
    },
    showOptions: function(){
        this.showChildView('plantings', new OptionsView({model: this.model}));
    },
    showEditor: function(model){
        this.showChildView('plantings', new EditorView({model: model}));
    },
    onShow: function(){
        this.showOptions();
    }

});
