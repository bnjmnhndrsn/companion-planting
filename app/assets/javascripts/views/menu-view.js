var DetailView = Mn.ItemView.extend({
    template: JST['garden/menu-detail']
});

var PlantSelectView = Mn.ItemView.extend({
    tagName: 'select',
    template: _.template(""),
    onShow: function(){
        var suggestions = this.model.getSuggestions().toJSON();
        debugger;
        this.$el.select2({
            data: suggestions
        });
    }
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    regions: {
        detail: '[data-region="detail"]',
        plantSelect: '[data-region="plantSelect"]',
    },
    initialize: function(){
        var gardenSquares = this.model.getGardenSquares();
        this.listenTo(gardenSquares, 'select', this.updateMenu);
    },
    updateMenu: function(model){
        this.showChildView('detail', new DetailView({model: model}));
        this.showChildView('plantSelect', new PlantSelectView({model: model}));
    }
});
