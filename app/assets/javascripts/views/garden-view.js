var GardenSquareView = Mn.ItemView.extend({
    template: JST['garden/garden_square'],
    className: 'square',
    modelEvents: {
        'change:plant': 'render'
    },
    onRender: function(){
        this.$el.css({
            top: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('row') ) + "px",
            left: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('column') ) + "px",
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
    initialize: function(){
        this._populateCollection();
    },
    childView: GardenSquareView,
    childViewContainer: '#squares',
    template: JST['garden/garden'],
    _populateCollection: function(){
        var collection = this.collection = this.model.getGardenSquares(),
            width = this.model.get('width'),
            height = this.model.get('height');
            grid = _.times(height, function(){
                return _.times(width, function(){ });
            });

        this.collection.each(function(model){
            grid[model.get('row')][model.get('column')] = true;
        });

        _.each(grid, function(row, i){
            _.each(row, function(cell, j){
                if (!cell) {
                    collection.add({row: i, column: j});
                }
            });
        });
    },
    onRender: function(){
        this.$('#squares').css({
            height: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('height') ) + "px",
            width: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('width') ) + "px"
        });
    }
});
