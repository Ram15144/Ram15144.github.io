var App = App || {};

let map_view = function()
{
	let self = this;
	let legend;
	
	/*---------------- Cancer Death Variables ----------------------------*/
	
	self.dict = {}; //Holds cancer deaths in each ward
	self.ca_dict = {}; //Holds cancer deaths in each community area
	self.ca77 = new Array(77); // Holds the patient data of 77 community areas
	
	let first = true; //Holds if it the first time execution of the program. This is mainly to prevent the legend from loading twice and two possible legends appearing on the screen.
	let ward_block_data = ""; //Holds the data from the ward_block.json file
	let ca_income = ""; //Holds the data from the chicago-community-areas.csv file
	let button_submit = 0; //Checks if the button submit was used
	let year = 0; // Holds the category of input year
	let cancerSiteGrp = 0; // Holds the category of input cancer site group
	let age = 0; // Holds the category of input age
	let geojson_cancer; // Holds the layer of the map loaded that contains the cancer deaths
	let cancer_grades = [0, 50, 100, 500, 1000, 2000, 3000, 3500];
	
	/*---------------- Average Income Variables ----------------------------*/
	
	let geojson_income; // Holds the layer of the map loaded that contains the ward income data
	
	self.ward_incomeData = {}; 	// Holds the average annual income for each of the wards
	
	let switch_data = 0;		// If this letiable is 0 (which is the default value) it is the cancer data that is displayed in the map. It this letiable is 1 then the income data is displayed.
	let income_grades = [0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000];
	
	//------------------------------------------------------------------------
	
	//App.helper = new helper(); // Variable to access the functions from helper.js file
	
	self.map = L.map('map').setView([41.774978, -87.654509], 10); // The basic background map that is loaded
	
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://github.com/uic-evl/EnglewoodSocialServices/blob/master/data/EnglewoodCommunityAreaBoundaries.geojson">Englewood project</a>',
		id: 'mapbox.light'
	}).addTo(self.map);
	
	// control that shows state info on hover
	self.info = L.control();

	self.info.onAdd = function (map) {
	
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		this.load();
		return this._div;
	};

	self.info.update = function (props) {
		let temp_arr = [' people',' $'];
		let heading = ['Illinois Cancer Patient Data', 'Illinois Average Income Data'];
		this._div.innerHTML = '<h6>'+heading[switch_data]+'</h6>' +  (props ?
			'Ward Number: <b>' + props.ward + '</b><br />' + getPatientCount(props.ward) + temp_arr[switch_data]
			: 'Hover over a ward');
	};
	
	self.info.load = function() {
		const filePath = "./CA_DATA/ward_blocks.json";
		
		const income_filePath = "./CA_DATA/averageWardIncome.json";
		d3.json(income_filePath).then(function(data) {
			self.ward_incomeData = data;
		});
		
		const geoObject = d3.json(filePath).then(function(data) {
			ward_block_data = data; 
			find_ward_data();
		});
	};
	
	
	//Loaing community area data from files
	let community_area_data;
	function readTextFile(file)
	{
	    let rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function ()
	    {
	        if(rawFile.readyState === 4)
	        {
	            if(rawFile.status === 200 || rawFile.status == 0)
	            {
	                let allText = rawFile.responseText;
	                community_area_data = allText;
	            }
	        }
	    }
	    rawFile.send(null);
	}
	
	
	function find_ward_data()
	{
		if(button_submit == 0) // If submit is zero then it's the first time loading the data or it's the default input values
		{
			for(let i=1; i<=50;i++) // Calculating the deaths in each ward
			{
				let deaths =0;
				//console.log(i);
				let ward_no = i.toString();
				for(let j=0;j<ward_block_data.wards[ward_no].length; j++)
				{
					//const { properties } = data.features[j];
					let cancer_deaths = ward_block_data.wards[ward_no][j].cancer_deaths;
					if(cancer_deaths != "NULL") 
						deaths = deaths + parseInt(cancer_deaths);
				}
				self.dict[ward_no] = deaths;
			}
		}
		else // When the user inputs differ data then submit becomes 1 indicating the need for redrawing the map
		{
			button_submit = 0;
			for(let i=1; i<=50;i++)
			{
				let deaths =0;
				let ward_no = i.toString();
				for(let j=0;j<ward_block_data.wards[ward_no].length; j++)
				{
					let pop_weight = parseFloat(ward_block_data.wards[ward_no][j].pop_weight);
					let comm_area = ward_block_data.wards[ward_no][j].comm_area;
					let cancer_deaths = self.ca_dict[comm_area] * pop_weight;
					if(cancer_deaths != "NULL") 
						deaths = deaths + parseFloat(cancer_deaths);
				}
				self.dict[ward_no] = Math.round(deaths);
			}
		}
		//console.log(self.dict);
		if(first)
			load_cancer_data();		
	}
	
	function getPatientCount(d)
	{
		if(switch_data == 0)
			return self.dict[d];
		else
			//console.log(self.ward_incomeData);
			return self.ward_incomeData[d];
	}
	
	function estimateCount(d)
	{
		if(switch_data == 0)
			return getColor(self.dict[d]);	
		//console.log(d + " : " +self.ward_incomeData[d] + typeof(d));
		return getColor(self.ward_incomeData[d]);	
	}
	
	self.info.addTo(self.map);

	// get color depending on population density value
	function getColor(d) {
		if(switch_data == 0)
			return d > 3500  ? '#b10026' :
					d > 3000 ? '#e31a1c' :
					d > 2000 ? '#fc4e2a' :
					d > 1000 ? '#fd8d3c' :
					d > 500  ? '#feb24c' :
					d > 100  ? '#fed976' :
					d > 50   ? '#ffeda0' :
								'#FFFFCC';
		return d > 80000 		? '#00441b' :
					d > 70000  	? '#006d2c' :
					d > 60000  	? '#238b45' :
					d > 50000  	? '#41ae76' :
					d > 40000   ? '#66c2a4' :
					d > 30000   ? '#99d8c9' :
					d > 20000   ? '#ccece6' :
					d > 10000   ? '#e5f5f9' :
								'#f7fcfd';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: estimateCount(feature.properties.ward)
		};
	}

	function highlightFeature(e) {
		let layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		self.info.update(layer.feature.properties);
	}

	

	function resetHighlight(e) {
		geojson_cancer.resetStyle(e.target);
		self.info.update();
	}

	function zoomToFeature(e) {
		self.map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}
	
	
	function load_cancer_data() // This is loaded initially only during the fist call
	{
		geojson_cancer = L.geoJson(wardData, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(self.map);
		
		
		self.map.attributionControl.addAttribution('Cancer data &copy; <a href="http://www.idph.state.il.us/cancer/statistics.htm">Illinois State Cancer Registry</a>');
		addLegend();
		if(first)
		{
			//App.scatterPlot = new scatter_plot();
			self.map.invalidateSize();
		}
		first = false;
		
		
	}
	
	function addLegend()
	{
		let curr_grades;
		if(switch_data==0)
			curr_grades = cancer_grades;
		else
			curr_grades = income_grades;
	
		if(!first)
		{
			//console.log("Here I am again :P");
			legend.remove();
		}
		
		legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

			let div = L.DomUtil.create('div', 'info legend'),
				grades = curr_grades,
				labels = [],
				from, to;

			for (let i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};
		legend.addTo(self.map);
	}
	
	function getDeaths(data)
	{
		let number_of_deaths = 0;
		button_submit = 1;
		for(let j=0; j<data.length; j++)
		{
			if(cancerSiteGrp == 0)
			{
				if(age == 0)
				{
					if(year == 0)
					{
						// This case is taken care of before
					}
					else
					{
						if(data!="" && data[j][2] == year)
							number_of_deaths = number_of_deaths + 1;
					}
				}
				else
				{
					if(year == 0)
					{
						if(data!="" && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
				}
			}
			else
			{
				if(age == 0)
				{
					if(year == 0)
					{
						if(data!="" && data[j][4] == cancerSiteGrp)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][4] == cancerSiteGrp)
							number_of_deaths = number_of_deaths + 1;
					}
				}
				else
				{
					if(year == 0)
					{
						if(data!="" && data[j][4] == cancerSiteGrp && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
					else
					{
						if(data!="" && data[j][2] == year && data[j][4] == cancerSiteGrp && data[j][5] == age)
							number_of_deaths = number_of_deaths + 1;
					}
				}							
			}
		}
		return number_of_deaths;
	}
	
	function calc_deaths()
	{	
		let comm_area = "";
		let file_name = "";
		
		if(cancerSiteGrp == 0 && age == 0 && year == 0)
		{
			button_submit = 0;
		}
		else
		{
			if(self.ca77[76] === undefined || self.ca77[76].length == 0)
			{	
				for(let i=0; i<77; i++)
				{
					comm_area = (i+1).toString();
					file_name = "./CA_DATA/community_data/"+comm_area+".txt";
					
					readTextFile(file_name);
					//App.helper = new helper();
					//let data = App.helper.readTextFile(file_name);
					//console.log("Hello!");
					//console.log(data);
					let data = community_area_data.split("\n");
					//data = data.split("\n");
					self.ca77[i] = data;
					
					self.ca_dict[comm_area] = getDeaths(data); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
				}
			}
			else
			{
				for(let i=0; i<77; i++)
				{
					comm_area = (i+1).toString();
					
					self.ca_dict[comm_area] = getDeaths(self.ca77[i]); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
				}
			}
		}
		
		// Now Calculating the number of deaths in each ward
		find_ward_data();
	}

	
	self.updateMap = function() 
	{
	    let y = document.getElementById("inputState");
	    let csg = document.getElementById("inputCancerGrp");
		let input_age = document.getElementById("inputAgeGrp");
		
	    //Digits 3 = 2
	    switch(y.options[y.selectedIndex].value)
	    {
	    	case "2006 - 2010": year = 1;
	    						break;
			case "2011 - 2015": year = 2;
								break;
			default: year = 0;
	    }

	    //Digits 4-5  = 3-4
	    switch(csg.options[csg.selectedIndex].value)
	    {
	    	case "Colorectal": cancerSiteGrp = 1;
	    						break;
			case "Lung and Bronchus": cancerSiteGrp = 2;
								break;
			case "Female Breast Invasive": cancerSiteGrp = 3;
											break;
			case "Cervix": cancerSiteGrp = 4;
							break;
	        case "Prostate": cancerSiteGrp = 5;
	        					break;
	        case "All other cancers": cancerSiteGrp = 6;
	        							break;
	        case "Female breast-insitu": cancerSiteGrp = 7;
	        								break;
			default: cancerSiteGrp = 0;
	    }
		
		switch(input_age.options[input_age.selectedIndex].value)
		{
			case "Less than 5": age = 1;
									break;
			case "5 - 14": 	age = 2;
							break;
			case "15 - 34":	age = 3;
							break;
			case "35 - 44":	age = 4;
							break;
			case "45 - 54": age = 5;	
							break;
			case "55 - 64":	age = 6;
							break;
			case "65 +":	age = 7;
							break;
			default: age = 0;
		}
		
	    self.redraw();

	}

	self.redraw = function()
	{	
		if(switch_data == 0)
		{
			// Recalculating the deaths in each community area and assigning them to each ward
			if(geojson_cancer)
				geojson_cancer.remove();
			if(geojson_income)
				geojson_income.remove();
			calc_deaths();
			
			geojson_cancer = L.geoJson(wardData, {
				style: style,
				onEachFeature: onEachFeature
			}).addTo(self.map);
		}
		else
		{
			if(geojson_cancer)
				geojson_cancer.remove();
			geojson_income = L.geoJson(wardData, {
				style: style,
				onEachFeature: onEachFeature
			}).addTo(self.map);
		}
		addLegend();
		self.info.update();
	}
	
	self.toggle = function(){
		let toggle_output = document.getElementsByName('options');
		
		
		if(toggle_output[0].checked)
		{
			if(switch_data != 0)
			{	
				//console.log(toggle_output[0].value);
				switch_data = 0;
				self.redraw();
			}
		}
		else
		{
			if(switch_data != 1)
			{
				//console.log(toggle_output[1].value);
				switch_data = 1;
				self.redraw();
			}
		}
	}
}