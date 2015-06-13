CP.Views.GardenLayoutView = Mn.LayoutView.extend({
    template: JST['garden/layout'],
    regions: {
        menu: "#menu",
        garden: "#garden"
    },
    onBeforeShow: function(){
        var view = new CP.Views.GardenView({
            model: this.model,
            collection: this.model.getGardenSquares()
        });
        
        this.showChildView('garden', view);
    }
});