let input_data;
let annual_data;
let oridinal_data;
let line_chart;
let bar_chart;
let annual_chart;
let sta = [];
let flag = 0;

d3.csv("https://youheisunada.github.io/InfoVis2021/report/game.csv")
    .then( data => {
        input_data = data;
        annual_data = data;
        oridinal_data = data;
        input_data.forEach( d => {
            d.s18 = +d.s18;
            d.s19 = +d.s19;
            d.s20 = +d.s20; 
        })
        annual_data = data;
        annual_data.forEach( d => {
            d.s18 = d.s18;
            d.s19 = d.s19;
            d.s20 = d.s20; 
        });

        line_chart = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
        }, input_data );
        line_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:50, left:50},
        }, input_data );
        bar_chart.update();

      

        d3.select('#sta18')
        .on('click', d => {
            if(annual_chart){
                annual_chart.del();
            }
            annual_chart = new Annual_LineChart( {
                parent: '#drawing_region_annualcomparison',
                width: 256,
                height: 256,
                margin: {top:10, right:10, bottom:50, left:50},
            }, annual_data );  
            flag = 18;
            annual_chart.update(flag);
        });

        d3.select('#sta19')
        .on('click', d => {
            if(annual_chart){
                annual_chart.del();
            }
            annual_chart = new Annual_LineChart( {
                parent: '#drawing_region_annualcomparison',
                width: 256,
                height: 256,
                margin: {top:10, right:10, bottom:50, left:50},
            }, annual_data );
            flag = 19;
            annual_chart.update(flag);
        });

        d3.select('#sta20')
        .on('click', d => {
            if(annual_chart){
                annual_chart.del();
            }
            annual_chart = new Annual_LineChart( {
                parent: '#drawing_region_annualcomparison',
                width: 256,
                height: 256,
                margin: {top:10, right:10, bottom:50, left:50},
            }, annual_data);
            flag = 20;
            annual_chart.update(flag,input_data);
        });

    })

    .catch( error => {
        console.log( error );
    });

   