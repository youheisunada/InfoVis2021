class LineChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
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
            .domain([0, d3.max(self.data, d => d.s20)])
            .range( [0, self.inner_width  ] );

        self.yscale = d3.scaleLinear()
            .domain([0, d3.max(self.data, d => d.mon)])
            .range([0, self.inner_height]);

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(12);
            
        self.yaxis = d3.axisLeft( self.yscale  )
            .ticks(5);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`);

            const xlabel_space = 40;
            self.svg.append('text')
                .style('font-size', '12px')
                .attr('x', self.config.width / 2 )
                .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
                .text('Month');
    
            const ylabel_space = 50;
            self.svg.append('text')
                .style('font-size', '12px')
                .attr('transform', `rotate(-90)`)
                .attr('y', self.config.margin.left - ylabel_space)
                .attr('x', -(self.config.height / 2))
                .attr('text-anchor', 'middle')
                .attr('dy', '1em')
                .text("Monthly Sales(10,000)");
     
    }

    update() {
        let self = this;
        self.sale18 = d => d.s18;
        self.sale19 = d => d.s19;
        self.sale20 = d => d.s20;
        self.xscale.domain( [1, 12] );
        const ymax18 = d3.max(self.data, d => d.s18);
        const ymax19 = d3.max(self.data, d => d.s19);
        const ymax20 = d3.max(self.data, d => d.s20);
        const ymax = Math.max(ymax18,ymax19,ymax20);
        self.yscale.domain( [ ymax,0] );
        self.render();
    }

    render() {
        let self = this;
       

  // Draw lines
        
        const line18 = d3.line()
            .x( d => self.xscale(d.mon) )
            .y( d => self.yscale(d.s18) );

        const line19 = d3.line()
            .x( d => self.xscale(d.mon) )
            .y( d => self.yscale(d.s19) );
            
        const line20 = d3.line()
            .x( d => self.xscale(d.mon) )
            .y( d => self.yscale(d.s20) );

        self.chart.append('path')
            .attr('d', line18(self.data))
            .attr('stroke', 'red')
            .attr('fill', 'none');

        self.chart.append('path')
            .attr('d', line19(self.data))
            .attr('stroke', 'blue')
            .attr('fill', 'none');
        
        self.chart.append('path')
            .attr('d', line20(self.data))
            .attr('stroke', 'green')
            .attr('fill', 'none');
            
        

        self.xaxis_group
            .call( self.xaxis );
    
        
        self.yaxis_group
            .call( self.yaxis );
       
    }
}