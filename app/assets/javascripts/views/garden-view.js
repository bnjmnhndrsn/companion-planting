var PlantingView = Mn.ItemView.extend({
    className: 'planting',
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
    childViewContainer: '.plantings-container',
    events: {
        'click .square': 'addPlanting'
    },
    initialize: function(){
        this.collection = this.model.getPlantings();
    },
    template: JST['garden/garden'],
    addPlanting: function (e) {
        var $square = $(e.currentTarget);
        var planting = this.collection.add({
            top: +$square.data('top'),
            left: +$square.data('left'),
            right: +$square.data('right'),
            bottom: +$square.data('bottom')
        });

        planting.save({}, {
            success: function () {
                planting.trigger('select', planting);
            }
        });
    },
    onRender: function(){
        this.$('#grid').css({
            height: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('height') + 1) + "px",
            width: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('width') + 1) + "px"
        });
    }
});
