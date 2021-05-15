d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task3.csv")
    .then( data => {
        data.forEach( d => { d.w = +d.w;});
        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:20, bottom:20, left:10}
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
            margin: config.margin || {top:10, right:20, bottom:20, left:10}
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
        var pie = d3.pie()
              .value( function(d){ return d.w} )
              .sort(null);
  
        var arc = d3.arc()
              .innerRadius(70)
              .outerRadius(radius);

        var text_arc = d3.arc()
              .innerRadius(radius- 30)
              .outerRadius(radius -30);

       var pc = self.svg.selectAll('pie')
            .data( pie(self.data) )
            .enter()
            .append("g")
            .attr("class","pie");

        pc.append('path')
          .attr('d', arc)
          .attr('fill',function(d){ return d.data.c; })
          .attr("opacity", 0.75)
          .attr('stroke', 'white') ;
        
        pc.append("text")
          .attr("fill", "black")
          .attr("transform", function(d) { return "translate(" + text_arc.centroid(d) + ")"; })
          .attr("dy", "5px")
          .attr("font", "10px")
          .attr("text-anchor", "middle")
          .text(function(d){ return d.data.l + d.data.w ;});  
        
          pc.append("text")
          .attr("fill", "black")
          .attr("x", -40)
          .attr("y", -0)
          .text("My life style");
        
          pc.append("text")
          .attr("fill", "black")
          .attr("x", -20)
          .attr("y", 20)
          .text("24H");
    }
}