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

var PlantSuggestionsView = Mn.CompositeView.extend({
    template: JST['garden/menu-plant-suggestions'],
    ui: {
        addSuggestion: '[name="add_suggestion"]'
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
    }
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    ui: {
        'emptyText': '[data-ui="emptyText"]'
    },
    regions: {
        detail: '[data-region="detail"]',
        plantSuggestions: '[data-region="plantSuggestions"]',
    },
    initialize: function(){
        var plantings = this.model.getPlantings();
        this.listenTo(plantings, 'select', this.updateMenu);
    },
    updateMenu: function(model){
        this.ui.emptyText.hide();
        this.showChildView('detail', new DetailView({model: model}));
        this.showChildView('plantSuggestions', new PlantSuggestionsView({model: model}));
    }
});
