CP.Views.GardenLayoutView = Mn.LayoutView.extend({
    template: JST['garden/layout'],
    regions: {
        menu: "#menu",
        garden: "#garden"
    },
    onBeforeShow: function(){
        var gardenView = new CP.Views.GardenView({
            model: this.model
        });
        
        this.showChildView('garden', gardenView);
        
        var menuView = new CP.Views.MenuView({
            model: this.model
        });
        
        this.showChildView('menu', menuView);
    }
});