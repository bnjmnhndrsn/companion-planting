var DetailView = Mn.ItemView.extend({
    template: JST['garden/menu-detail']
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    regions: {
        detail: '[data-region="detail"]',
        plantSelect: '[data-region="plantSelect"]',
    },
    ui: {
        plantSelect: '[name="plant"]'
    },
    initialize: function(){
        var gardenSquares = this.model.getGardenSquares();
        this.listenTo(gardenSquares, 'select', this.updateMenu);
    },
    updateMenu: function(model){
        var view = new DetailView({model: model});
        this.showChildView('detail', view);
        this.updatePlantSelect(model);
    },
    updatePlantSelect: function(model){
        var data = [{ id: 0, text: 'enhancement' }, { id: 1, text: 'bug' }, { id: 2, text: 'duplicate' }, { id: 3, text: 'invalid' }, { id: 4, text: 'wontfix' }];

        this.ui.plantSelect.select2({
            data: data
        });
    }
});
