CP.Views.GardenLayoutView = Mn.LayoutView.extend({
    className: "row",
    events: {
        'click': 'onClick'
    },
    template: JST['garden/layout'],
    regions: {
        menu: "#menu",
        garden: "#garden"
    },
    onClick: function(){
        this.model.getPlantings().deselect();
        CP.Collections.plants.deselect();
    },
    onShow: function(){
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
