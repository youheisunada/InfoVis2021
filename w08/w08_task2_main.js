d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.x = +d.x;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:30}
        };

        const line_chart = new LineChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 216,
            height: config.height || 216,
            margin: config.margin || {top:30, right:10, bottom:40, left:70}
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

        self.yscale = d3.scaleBand()
            .domain([0, d3.max(self.data, d => d.y)])
            .range([0, self.inner_height])
           
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            
            
        self.yaxis = d3.axisLeft( self.yscale  )
            

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
        
    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [0, xmax] );
        self.domain([0, d3.max(self.data, d => d.y)])
        self.render();
    }

    render() {
        let self = this;
        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );

  // Draw bars
  
        self.line = d3.line()
            .x( d => d.x )
            .y( d => d.y );

        self.svg.append('path')
                .attr('d', self.line(self.data))
                .attr('stroke', 'black')
                .attr('fill', 'none');


        self.chart.selectAll("text")
                  .data(self.data)
                  .enter()
                  .append("text")
                  .attr("x", (xmin + xmax)/2 - 40)
                  .attr("y", -10)
                  .text("Bace stats of Pachirisu");

        self.xaxis_group
            .call( self.xaxis );
      
          
        self.yaxis_group
            .call( self.yaxis );
        
    }
}