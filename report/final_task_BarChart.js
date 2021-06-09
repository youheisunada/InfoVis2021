class BarChart {
    constructor (config, data) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10},
        };
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select(self.config.parent)
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleBand()
            .range([0, self.inner_width])
            .paddingInner(0.2)
            .paddingOuter(0.1);

        self.yscale = d3.scaleLinear()
            .range([0,self.inner_height]);

        self.xaxis = d3.axisBottom(self.xscale)
            .ticks(['s18','s19','s20'])
            .tickSizeOuter(0);

        self.yaxis = d3.axisLeft(self.yscale)
            .ticks(5)
            .tickSizeOuter(0);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);

        self.yaxis_group = self.chart.append('g');

        const xlabel_space = 40;
        self.svg.append('text')
            .style('font-size', '12px' )
            .attr('x', self.config.width / 2 )
            .attr('y', self.inner_height + self.config.margin.top + xlabel_space)
            .text('Year');

        const ylabel_space = 50;
        self.svg.append('text')
            .style('font-size', '12px')
            .attr('transform', `rotate(-90)`)
            .attr('y', self.config.margin.left - ylabel_space)
            .attr('x', -(self.config.height / 2))
            .attr('text-anchor', 'middle')
            .attr('dy', '1em')
            .text("Annual Sales(10,000)");
    }

    update() {
        let self = this;
        const s18sum = d3.sum( self.data, d => d.s18 );
        const s19sum = d3.sum( self.data, d => d.s19 );
        const s20sum = d3.sum( self.data, d => d.s20 );
            //self.yscale.domain(self.data.map(d => d.l))
        
            var data2 = [
                {l:'sale_18', s:s18sum, c:'red'},
                {l:'sale_19', s:s19sum, c:'blue'},
                {l:'sale_20', s:s20sum, c:'green'}
            ];
                      
            self.xscale.domain( data2.map(d => d.l));
            self.yscale.domain([d3.max(data2, d => d.s),0 ] );
            self.render(data2);
    }
    
    render(data2) {
        let self = this;
        
        self.chart.selectAll(".bar")
        .data(data2)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => self.xscale( d.l) )
        .attr("y", d => self.yscale( d.s ) )
        .attr("width", self.xscale.bandwidth())
        .attr("height", d => self.inner_height - self.yscale( d.s ))
        .attr("fill", d => d.c);
       
        
        self.xaxis_group
            .call(self.xaxis);

        self.yaxis_group
            .call(self.yaxis);

           
    }
}
