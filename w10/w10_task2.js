d3.csv("https://youheisunada.github.io/InfoVis2021/w10/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:50}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 216,
            height: config.height || 216,
            margin: config.margin || {top:30, right:10, bottom:40, left:50}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            
            .range( [0, self.inner_width ] );

        self.yscale = d3.scaleLinear()
            .range( [0, self.inner_height] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6);
            

        self.yaxis = d3.axisLeft( self.yscale  )
            .ticks(6);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);
            
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ ymax,0] );

        self.render();
    }

    render() {
       
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
       

       let circles =  self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

            self.chart.selectAll("text")
            .data(self.data)
            .enter()
            .append("text")
            .attr("x", (xmin + xmax)/2)
            .attr("y", ymin - 35)
            .text("task2");

        self.xaxis_group
            .call( self.xaxis );

    
        self.yaxis_group
            .call( self.yaxis );

        self.svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 20)
           .attr("x", -160)
           .text("y Label");

        self.svg.append("text")
           .attr("x",(xmin + xmax)/2)
           .attr("y", 256)
           .text("x Label");

        
           circles
           .on('mouseover', (e,d) => {
               d3.select('#tooltip')
                   .style('opacity', 1)
                   .html(`<div class="tooltip-label">${d.label}</div>(${d.x}, ${d.y})`);
                   e.style("fill","red");
           })
           .on('mousemove', (e) => {
               const padding = 10;
               d3.select('#tooltip')
                   .style('left', (e.pageX + padding) + 'px')
                   .style('top', (e.pageY + padding) + 'px');
           })
           .on('mouseleave', () => {
               d3.select('#tooltip')
                   .style('opacity', 0);
                   circles.attr('fill',"block");
           });


        
    
    }
}

