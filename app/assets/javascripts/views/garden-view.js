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

var CircleView = Backbone.View.extend({
    initialize: function(options){
        this.scale = options.scale;
        this.d3 = d3.select(this.el);
        var view = this;

        this.d3
        .attr('r', this.makeNodeRadiusCallback())
        .attr('cx', function(d){
            return view.scale(d.get('j'));
        })
        .attr('cy', function(d){
            return view.scale(d.get('i'));
        })
        .on('mouseenter', this.makeNodeAnimationCallback(4 / 3))
        .on('mouseleave', this.makeNodeAnimationCallback(1))
        .on('click', function(d){
            d.trigger('select', d);
        });

    },
    nodeRadius: .5,
    makeNodeRadiusCallback: function(scalar){
        var view = this;
        scalar = scalar || 1;

        return function(d){
            var radius = d.get('radius') || view.nodeRadius;
            return view.scale(radius * scalar);
        };
    },
    makeNodeAnimationCallback: function(scalar){
        var radiusCallback = this.makeNodeRadiusCallback(scalar);

        return function(d){
            d3.select(this).transition().attr('r', radiusCallback);
        }
    },
});

CP.Views.GardenView = Mn.ItemView.extend({
    // childView: PlantingView,
    childViewContainer: '.plantings-container',
    events: {
        'click .square': 'addPlanting'
    },
    template: JST['garden/garden'],
    initialize: function(){
        this.collection = this.model.getPlantings();
        this.createPlantingsMatrix();
    },
    createPlantingsMatrix: function(){
        var view = this;
        this.plantingsMatrix = [];
        var height = this.model.get('height');

        for (var i = this.gridInterval; i < height; i += this.gridInterval) {
            this.plantingsMatrix[i] = [];
        }

        this.collection.each(function(planting){
            view.plantingsMatrix[planting.get('i')][planting.get('j')] = planting;
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
    createGridLines: function(){
        var view = this;
        var xCoords = d3.range(0, this.model.get('width') + this.gridInterval, this.gridInterval);
        var yCoords = d3.range(0, this.model.get('height') + this.gridInterval, this.gridInterval);

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
        var data = [];
        var childViews = [];

        for (var i = this.gridInterval; i < height; i += this.gridInterval) {
            for (var j = this.gridInterval; j < width; j += this.gridInterval) {
                var model = this.plantingsMatrix[i][j] || this.collection.add({i: i, j: j});
                data.push(model);
            }
        }

        this.svg.append('g')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'planting')
            .each(function(d){
                childViews.push(
                    new CircleView({
                        el: this,
                        model: d,
                        scale: view.scale
                    })
                );
            });
    },
    gridInterval: 6,
    onShow: function(){
        this.createScale();
        this.createSvg();
        this.createGridLines();
        this.createGridNodes();
    }
});
