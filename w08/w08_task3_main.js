d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task3.csv")
    .then( data => {
        data.forEach( d => { d.w = +d.w;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:30, left:30}
        };

        const pie_chart = new PieChart( config, data );
        pie_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class PieChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 216,
            height: config.height || 216,
            margin: config.margin || {top:0, right:10, bottom:30, left:30}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
            .append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

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
        

  // Draw bars
        var radius = Math.min( self.config.width, self.config.height ) / 2;
        
        const pie = d3.pie()
              .value( d => d.w );
  
        const arc = d3.arc()
              .innerRadius(0)
              .outerRadius(radius);

        const  text_arc = d3.arc()
              .outerRadius(128)
              .innerRadius(128);
  
        self.svg.selectAll('pie')
            .data( pie(self.data) )
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('stroke', 'white')
            .data(self.data)
            .attr('fill',function(d){ return d.c; })    
            .style('stroke-width', '2px');
            
            self.svg.selectAll('text')
            .data(self.data)
            .enter()
            .append('text')
            .attr("transform", function(d) { return "translate(" + text_arc.centroid(d) + ")" })
            .text(function(d){ return d.l});       
    }
}