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
    }
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    regions: {
        detail: '[data-region="detail"]',
        plantSuggestions: '[data-region="plantSuggestions"]',
    },
    initialize: function(){
        var gardenSquares = this.model.getGardenSquares();
        this.listenTo(gardenSquares, 'select', this.updateMenu);
    },
    updateMenu: function(model){
        model.fetchOrCreate({
            success: _.bind(function(){
                this.showChildView('detail', new DetailView({model: model}));
                this.showChildView('plantSuggestions', new PlantSuggestionsView({model: model}));
            }, this)
        });
    }
});
