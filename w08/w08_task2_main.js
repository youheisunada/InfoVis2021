d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x+ 30; d.y = +d.y+10 ;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 128,
            margin: {top:10, right:10, bottom:30, left:30}
        };

        const line_chart = new LineChart( config, data );
        line_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 128,
            margin: config.margin || {top:0, right:10, bottom:30, left:30}
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
            .domain([0, d3.max(self.data, d => d.x)])
            .range( [0, self.inner_width  ] );

        self.yscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.y)])
            .range([0, self.inner_height]);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5);
            
        self.yaxis = d3.axisLeft( self.yscale  )
            .ticks(5);

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
        self.yscale.domain( [ 0,ymax] );

        self.render();
    }

    render() {
        let self = this;
        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );

  // Draw bars
  
        const line = d3.line()
            .x( d => self.xscale(d.x) )
            .y( d => self.yscale(d.y) );

            

        self.svg.append('path')
                .attr('d', line(self.data))
                .attr('stroke', 'black')
                .attr('fill', 'none');
        
        self.svg.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx",function(d){ return self.xscale(d.x); })
            .attr("cy",function(d){ return self.yscale(d.y); })
            .attr("r",5)
            .style('fill', '#000');

        self.xaxis_group
            .call( self.xaxis );
    
        
        self.yaxis_group
            .call( self.yaxis );
       
    }
}