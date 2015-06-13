CP.Views.GardenLayoutView = Mn.LayoutView.extend({
    template: JST['garden/layout'],
    regions: {
        menu: "#menu",
        garden: "#garden"
    },
    onBeforeShow: function(){
        var view = new CP.Views.GardenView({
            model: this.model
        });
        
        this.showChildView('garden', view);
    }
});