var GardenSquareView = Mn.ItemView.extend({
    template: _.template('')
});

CP.Views.GardenView = Mn.CompositeView.extend({
    childView: GardenSquareView,
    childViewContainer: '#squares',
    template: JST['garden/garden']
});
