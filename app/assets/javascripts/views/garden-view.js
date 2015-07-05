var PlantingView = Mn.ItemView.extend({
    template: JST['garden/planting'],
    modelEvents: {
        'change:plant': 'render'
    },
    onRender: function(){
        this.$el.css({
            top: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('top') ) + "px",
            left: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('left') ) + "px",
        })
    },
    events: {
        'click': 'selectSquare'
    },
    selectSquare: function(){
        this.model.trigger('select', this.model);
    },
    templateHelpers: function(){
        return {
            hasPlant: !!this.model.get('plant')
        };
    }
});

CP.Views.GardenView = Mn.CompositeView.extend({
    childView: PlantingView,
    childViewContainer: '#grid',
    template: JST['garden/garden'],
    onRender: function(){
        this.$('#grid').css({
            height: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('height') + 1) + "px",
            width: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('width') + 1) + "px"
        });
    }
});
