var App = App || {};

/*let activation = function(){
	
}
*/
let scatter_plot = function(){	
	//console.log(App.map_view.dict); 			// Y axis
	//console.log(App.map_view.ward_incomeData);	// X axis
	
	let xarr = [];
	let yarr = [];
	let ward = [];
	
	for(let i=1; i<=50; i++)
	{
		//console.log(i+" "+App.map_view.dict[i]);
		yarr.push(parseInt(App.map_view.dict[i]));
		xarr.push(parseInt(App.map_view.ward_incomeData[i]));
		ward.push(i.toString());
	}		
	//console.log(xarr);
	//console.log(yarr);
	/*let trace1 = {
	  x: [1, 2, 3, 4, 5],
	  y: [1, 6, 3, 6, 1],
	  mode: 'markers+text',
	  type: 'scatter',
	  name: 'Team A',
	  text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
	  textposition: 'top center',
	  textfont: {
		family:  'Raleway, sans-serif'
	  },
	  marker: { size: 12 }
	};

	let trace2 = {
	  x: [1.5, 2.5, 3.5, 4.5, 5.5],
	  y: [4, 1, 7, 1, 4],
	  mode: 'markers+text',
	  type: 'scatter',
	  name: 'Team B',
	  text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
	  textfont : {
		family:'Times New Roman'
	  },
	  textposition: 'bottom center',
	  marker: { size: 12 }
	};*/
	
	let trace = {
	  x: xarr,
	  y: yarr,
	  mode: 'markers+text',
	  type: 'scatter',
	  name: 'Team B',
	  text: ward,
	  textfont : {
		family:'Times New Roman'
	  },
	  textposition: 'bottom center',
	  marker: { size: 12 }

	}

	let data = [ trace ];

	let layout = { 
	  xaxis: {
		range: [ 0, 85000 ] 
	  },
	  yaxis: {
		range: [0, 4000]
	  },
	  legend: {
		y: 0.5,
		yref: 'paper',
		font: {
		  family: 'Arial, sans-serif',
		  size: 20,
		  color: 'grey',
		}
	  },
	  title:'Ward cancer deaths vs Ward Income'
	};

	Plotly.newPlot('scatterPlot', data, layout);
}