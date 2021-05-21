d3.csv("https://youheisunada.github.io/InfoVis2021/w08/w08_task1.csv")
    .then( data => {
        data.forEach( d => { d.w = +d.w;  });
         var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:30, right:10, bottom:40, left:70}
        };

        bar_chart = new BarChart( config, data );
        bar_chart.update();

        d3.select('#reverse')
          .on('click', d => {
             data = sorting(data);
            if(bar_chart){
                delete bar_chart.config;
            }
            
            bar_chart = new BarChart( config, data );
            bar_chart.update();
            
    });
        

    })
    .catch( error => {
        console.log( error );
    });

function sorting(data){
    data.sort(function(a,b){
        if(a.w < b.w) return -1;
        if(a.w > b.w) return 1;
        return 0;
    });
    console.log(data);
     
    return data;
}


class BarChart {
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
            .domain([0, d3.max(self.data, d => d.w) ])
            .range( [0, self.inner_width  ] );

        self.yscale = d3.scaleBand()
            .domain(self.data.map(d => d.l))
            .range([0, self.inner_height])
            .paddingInner(0.1);
           
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
            
        self.yaxis = d3.axisLeft( self.yscale  )
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
        

    }

    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.w );
        const xmax = d3.max( self.data, d => d.w );
        self.xscale.domain( [0, xmax + 20] );
        self.yscale.domain(self.data.map(d => d.l))
        self.render();
    }

    render() {
        let self = this;
        const xmin = d3.min( self.data, d => d.w );
        const xmax = d3.max( self.data, d => d.w );

  // Draw bars
        self.chart.selectAll("rect")
                  .data(self.data)
                  .join("rect")
                  .transition().duration(1000)
                  .attr("x", 0)
                  .attr("y", d => self.yscale(d.l))
                  .attr("width", d => self.xscale(d.w))
                  .attr("height", self.yscale.bandwidth());

        self.chart.selectAll("text")
                  .data(self.data)
                  .join("text")
                  .attr("x", (xmin + xmax)/2 - 60)
                  .attr("y", -10)
                  .text("Bace stats of Pachirisu");

        self.xaxis_group
            .call( self.xaxis );
      
          
        self.yaxis_group
            .call( self.yaxis ); 
    }
    
}

