var NodeView = CP.Utils.D3View.extend({
    events: {
        'mouseenter': 'onMouseEnter',
        'mouseleave': 'onMouseLeave',
        'click': 'onClick'
    },
    modelEvents: {
        'highlight': 'onHighlight',
        'unhighlight': 'onUnhighlight'
    },
    nodeRadius: .5,
    selected: false,
    initialize: function(options){
        var view  = this;

        this.d3
        .attr('cx', function(d){
            return view.scale(d.get('j'));
        })
        .attr('cy', function(d){
            return view.scale(d.get('i'));
        });

        this.setRadius(1);
    },
    onHighlight: function(){
        this.d3.style('fill', 'black');
    },
    onUnhighlight: function(){
        this.d3.transition().style('fill', '#888888');
    },
    onMouseEnter: function(node, d, i){
        if (this.selected) {
            return;
        }
        this.onHighlight();
    },
    onMouseLeave: function(node, d, i){
        if (this.selected) {
            return;
        }
        this.onUnhighlight();
    },
    onClick: function(node, d, i){
        this.selected = true;
        d.trigger('select', d);
    },
    setRadius: function(scalar){
        var radius = this.nodeRadius;
        radius = this.scale(radius * scalar);
        this.d3.transition().attr('r', radius);
    }
});

var PlantingView = CP.Utils.D3View.extend({
    nodeRadius: .5,
    initialize: function(options){
        var view  = this;

        this.d3
        .attr('cx', this.scale(this.model.get('j')))
        .attr('cy', this.scale(this.model.get('i')))
        .attr('r', this.scale(this.model.get('plant').get('radius')));
    }
});

var SVGView = CP.Utils.D3View.extend({
    events: {
        'mouseenter': 'bindShadow',
        'mouseleave': 'unbindShadow',
        'click': 'onClick'
    },
    initialize: function(options){
        this.d3.attr({
            height: this.scale(this.model.get('width')),
            width: this.scale(this.model.get('height'))
        });

        this.gridInterval = this.model.get('gridInterval');

        this.createGridLines();
        this.createGridNodes();
        this.createPlantings();
    },
    bindShadow: function(d, i){
        var view = this;
        var selected = this.model.get('selected');
        if (!selected instanceof CP.Models.Plant) {
            return;
        }

        this.d3
        .append('circle')
        .attr('class', 'shadow')
        .attr('r', this.scale(6))
        .attr('cx', d3.event.offsetX)
        .attr('cy', d3.event.offsetY);

        this.d3.on('mousemove', function(){
            view.onDragOver();
        });
    },
    unbindShadow: function(d, i){
        this.d3.on('mousemove');
        this.d3.selectAll('.shadow').remove();
    },
    createGridLines: function(){
        var view = this;
        var xCoords = d3.range(0, this.model.get('width') + this.gridInterval, this.gridInterval);
        var yCoords = d3.range(0, this.model.get('height') + this.gridInterval, this.gridInterval);

        this.d3.append('g')
            .selectAll('line')
            .data(xCoords)
            .enter()
            .append('line')
            .attr('x1', function(d){ return view.scale(d) })
            .attr('x2', function(d){ return view.scale(d) })
            .attr('y1', function(d){ return 0 })
            .attr('y2', function(d){ return view.scale(view.model.get('height')) });

        this.d3.append('g')
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

        for (var i = this.gridInterval; i < height; i += this.gridInterval) {
            for (var j = this.gridInterval; j < width; j += this.gridInterval) {
                var model = this.model.getPlanting(i, j) || this.model.getPlantings().add({i: i, j: j});
                data.push(model);
            }
        }

        this.d3.append('g')
            .selectAll('.node')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'node')
            .each(function(d){
                new NodeView({
                    el: this,
                    model: d,
                    scale: view.scale
                })
            });
    },
    createPlantings: function(){
        var view = this;

        this.d3.append('g')
            .selectAll('.planting')
            .data(this.model.getPlantings().filter(function(model){
                return model.has('plant');
            }))
            .enter()
            .append('circle')
            .attr('class', 'planting')
            .each(function(d){
                new PlantingView({
                    el: this,
                    model: d,
                    scale: view.scale
                });
            });
    },
    getClosestNode: function(i, j) {
        var interval = this.gridInterval;
        var iRemainder = i % interval, jRemainder = j % interval;
        var closestI = i - iRemainder, closestJ = j - jRemainder;
        if (iRemainder > interval / 2) closestI += interval;
        if (jRemainder > interval / 2) closestJ += interval;

        if (closestI > 0 && closestJ > 0) {
            return this.model.getPlanting(closestI, closestJ);
        }
    },
    onDragOver: function(){
        var x = d3.event.offsetX, y = d3.event.offsetY;

        this.d3.selectAll('.shadow')
            .attr('cx', x)
            .attr('cy', y);

        var closestNode = this.getClosestNode(this.scale.invert(y), this.scale.invert(x));

        if (closestNode && this._closestNode !== closestNode) {
            if (this._closestNode) {
                this._closestNode.trigger('unhighlight');
            }

            this._closestNode = closestNode;
            this._closestNode.trigger('highlight');
        } else if (!closestNode && this._closestNode) {
            this._closestNode.trigger('unhighlight');
            this._closestNode = undefined;
        }
    },
    onClick: function(){
        var node = this._closestNode;
        if (!node) return;

        var selected = this.model.get('selected');
        if (selected) {
            var promise = node.save({'plant': selected});
            promise.done(this.createPlantings.bind(this));
        }

    }
});

CP.Views.GardenView = Mn.ItemView.extend({
    childViewContainer: '.plantings-container',
    template: JST['garden/garden'],
    initialize: function(){
        this.collection = this.model.getPlantings();
    },
    createScale: function(){
        this.width = this.$el.width();

        this.scale = d3.scale.linear()
            .domain([0, this.model.get('width')])
            .range([0, this.width]);
    },
    createSvg: function(){
        var view = this;

        var svg = document.getElementById('grid');

        this.svgView = new SVGView({
            el: svg,
            model: this.model,
            scale: this.scale
        });

    },
    onShow: function(){
        this.createScale();
        this.createSvg();
    }
});
