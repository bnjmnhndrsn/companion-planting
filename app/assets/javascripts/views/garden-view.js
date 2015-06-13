CP.Views.GardenView = Mn.ItemView.extend({
    template: JST['garden/garden'],
    childView: GardenSquareView,
    childViewContainer: '#squares'
});
