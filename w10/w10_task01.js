var data = [
    {label:'Apple', value:100},
    {label:'Banana', value:200},
    {label:'Cookie', value:50},
    {label:'Doughnut', value:120},
    {label:'Egg', value:80}
];

var width = 256;
var height = 128;
var margin = {top:10, right:10, bottom:20, left:60};

 svg = d3.select('#drawing_region')
    .attr('width', width)
    .attr('height', height);

 chart = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
const inner_width = width - margin.left - margin.right;
const inner_height = height - margin.top - margin.bottom;

init(data);
Dgraph(data);


function init(data){
    // Initialize axis scales
    xscale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([0, inner_width]);
    
     yscale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, inner_height])
    .paddingInner(0.1);
    
    // Initialize axes
     xaxis = d3.axisBottom( xscale )
    .ticks(5)
    .tickSizeOuter(0);
    
     yaxis = d3.axisLeft( yscale )
    .tickSizeOuter(0);
}
      function Dgraph(data){  
  // Draw the axis
  xaxis_group = chart.append('g')
        .attr('transform', `translate(0, ${inner_height})`)
        .call( xaxis )
        .join();
  
   yaxis_group = chart.append('g')
        .call( yaxis )
        .join();
  
// Draw bars
chart.selectAll("rect")
    .data(data)
    .join("rect")
    .transition().duration(1000)
    .attr("x", 0)
    .attr("y", d => yscale(d.label))
    .attr("width", d => xscale(d.value))
    .attr("height", yscale.bandwidth());
}

d3.select('#reverse')
    .on('click', d => {
        data.reverse();
        init(data);
        Dgraph(data);
    });