var GardenSquareView = Mn.ItemView.extend({
    template: _.template(''),
    className: 'garden-square',
    events: {
        'mouseenter': function(){ console.log('asdfasdfadf'); }
    }
});

CP.Views.GardenView = Mn.CompositeView.extend({
    template: JST['garden/garden'],
    childView: GardenSquareView,
    childViewContainer: '#squares'
});
