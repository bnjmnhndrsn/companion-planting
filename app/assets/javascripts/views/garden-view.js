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
    createScale: function(){
        this.width = this.$el.width();

        this.scale = d3.scale.linear()
            .domain([0, this.model.get('width')])
            .range([0, this.width]);
    },
    createSvg: function(){
        this.svg = d3.select('#grid').attr({
            height: this.scale(this.model.get('width')),
            width: this.scale(this.model.get('height'))
        });
    },
    getDimensions: function(){
    },
    createGridLines: function(){
        var view = this;
        var xCoords = d3.range(0, this.model.get('width') + 6, 6);
        var yCoords = d3.range(0, this.model.get('height') + 6, 6);

        this.svg.append('g')
            .selectAll('line')
            .data(xCoords)
            .enter()
            .append('line')
            .attr('x1', function(d){ return view.scale(d) })
            .attr('x2', function(d){ return view.scale(d) })
            .attr('y1', function(d){ return 0 })
            .attr('y2', function(d){ return view.scale(view.model.get('height')) });

        this.svg.append('g')
            .selectAll('line')
            .data(yCoords)
            .enter()
            .append('line')
            .attr('y1', function(d){ return view.scale(d) })
            .attr('y2', function(d){ return view.scale(d) })
            .attr('x1', function(d){ return 0 })
            .attr('x2', function(d){ return view.scale(view.model.get('width')) });
    },
    createGridNodes: function(){
        var view = this;
        var width = this.model.get('width'), height = this.model.get('height');
        var coords = [];
        
        for (var y = 6; y < height; y += 6) {
            for (var x = 6; x < width; x += 6) {
                coords.push({cx: x, cy: y});
            }
        }


        this.svg.append('g')
            .selectAll('circle')
            .data(coords)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cx', function(d){
                return view.scale(d.cx);
            })
            .attr('cy', function(d){
                return view.scale(d.cy);
            });
    },
    onShow: function(){
        this.getDimensions();
        this.createScale();
        this.createSvg();
        this.createGridLines();
        this.createGridNodes();
    }
});
