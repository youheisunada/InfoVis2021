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
  
 
  // 2. SVG領域の設定

  const g = self.svg.append("g").attr("transform", "translate(" + self.config.width / 2 + "," + self.config.height / 2 + ")");
  
  var radius = Math.min( self.config.width, self.config.height ) / 2;
  // 4. pieチャートデータセット用関数の設定
  
  
  var pie = d3.pie()
              .value( d => d.w );
 
  // 5. pieチャートSVG要素の設定
  var pieGroup = g.selectAll("pie")
    .data(pie(self.data))
    .enter()
    .append("g")
    .attr("class", "pie");
 
  arc = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
 
  pieGroup.append("path")
    .data(self.data)
    .enter()
    .attr("d", arc)
    .attr("fill", function(d) { return d.c })
    .attr("opacity", 0.75)
    .attr("stroke", "white");
 
  // 6. pieチャートテキストSVG要素の設定
  var text = d3.arc()
    .outerRadius(radius - 30)
    .innerRadius(radius - 30);
 
  pieGroup.append("text")
    .data(self.data)
    .enter()
    .attr("fill", "black")
    .attr("transform", function(d) { return "translate(" + text.centroid(d) + ")"; })
    .attr("dy", "5px")
    .attr("font", "10px")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.l; });
    }
}