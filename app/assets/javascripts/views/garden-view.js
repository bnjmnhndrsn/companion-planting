// var PlantingView = Mn.ItemView.extend({
//     className: 'planting',
//     template: JST['garden/planting'],
//     modelEvents: {
//         'change:plant': 'render'
//     },
//     onRender: function(){
//         this.$el.css({
//             top: (CP.Utils.Constants.SQUARE_HEIGHT * this.model.get('top') ) + "px",
//             left: (CP.Utils.Constants.SQUARE_WIDTH * this.model.get('left') ) + "px",
//         })
//     },
//     events: {
//         'click': 'selectSquare'
//     },
//     selectSquare: function(){
//         this.model.trigger('select', this.model);
//     },
//     templateHelpers: function(){
//         return {
//             hasPlant: !!this.model.get('plant')
//         };
//     }
// });

CP.Views.GardenView = Mn.ItemView.extend({
    // childView: PlantingView,
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
    onShow: function(){
        this.width = this.$el.width();
        this.height = this.$el.height();



        var scale = this.scale = d3.scale.linear()
        .domain([0, this.model.get('width')])
        .range([0, this.width]);

        var xAxis = d3.svg.axis().ticks(10)
            .scale(scale)
            .orient("bottom")
            .innerTickSize(-scale(this.height))
            .outerTickSize(0);

        var yAxis = d3.svg.axis().ticks(10)
            .scale(scale)
            .orient("left")
            .innerTickSize(-this.width)
            .outerTickSize(0);

        this.svg = d3.select('#grid').attr({
            height: this.scale(this.model.get('width')),
            width: this.scale(this.model.get('height'))
        });

        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + scale(this.height) + ")")
            .call(xAxis);

        this.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }
});
