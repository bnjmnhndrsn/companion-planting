var DetailView = Mn.ItemView.extend({
    template: JST['garden/menu-detail']
});

CP.Views.MenuView = Mn.LayoutView.extend({
    template: JST['garden/menu'],
    regions: {
        detail: '[data-region="detail"]'  
    },
    initialize: function(){
        var gardenSquares = this.model.getGardenSquares();
        this.listenTo(gardenSquares, 'select', this.showGardenSquare);
    },
    showGardenSquare: function(model){
        var view = new DetailView({model: model});
        this.showChildView('detail', view);
    }
});