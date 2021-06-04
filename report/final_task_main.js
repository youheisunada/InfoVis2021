let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://youheisunada.github.io/InfoVis2021/report/game.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.s18 = +d.s18;
            d.s19 = +d.s19;
            d.s20 = +d.s20;
            
        });
        line_chart = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.species ) );
    }
    scatter_plot.update();
}
