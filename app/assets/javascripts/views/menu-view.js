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
    },
    templateHelpers: function(){
        debugger;
        return {};
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

var PlantingsView = Mn.CompositeView.extend({
    events: {
        'change @ui.plant': 'selectPlant'
    },
    template: JST['garden/menu-plantings'],
    ui: {
        plant: '[name="plant"]'
    },
    childViewContainer: 'ul',
    childView: PlantSuggestionView,
    selectPlant: function(){
        this.model.trigger('edit:end');
    },
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
            view.model.trigger('edit:end', view.model);
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
        this.listenTo(plantings, 'select', function(model){
            if (model.get('plant')){
                this.showDetail(model);
            } else {
                this.showEditor(model);
            }
        });
        this.listenTo(plantings, 'edit:start', this.showEditor);
        this.listenTo(plantings, 'edit:end', this.showDetail);
    },
    showEditor: function(model){
        this.ui.emptyText.hide();
        this.showChildView('plantings', new PlantingsView({model: model}));
    },
    showDetail: function(model){
        this.ui.emptyText.hide();
        this.showChildView('plantings', new DetailView({model: model}));
    }
});
