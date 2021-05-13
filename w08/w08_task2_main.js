d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task2.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:30}
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
     
    }

    update() {
        let self = this;

       
        self.render();
    }

    render() {
        let self = this;
        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );

  // Draw bars
  
        const line = d3.line()
            .x( d => d.x )
            .y( d => d.y );

        self.svg.append('path')
                .attr('d', line(self.data))
                .attr('stroke', 'black')
                .attr('fill', 'none');

       
    }
}