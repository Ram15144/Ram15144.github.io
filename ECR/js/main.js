
var App = App || {};

(function() {
	App.start = function()
	{
		console.log("I'm here!");
		App.map_view = new map_view();
		App.comm_area_boundaries = new ca_boundaries();
		//App.scatterPlot; // initialized in map_view.js
	}
	App.show_progress_bar = function()
	{
		let bar = document.getElementById("myModal");
		bar.style.display='block';
		console.log("modal showing");
		setTimeout(App.update_map(), 3000);
	}
	App.update_map = function()
	{
		App.map_view.updateMap();
	}

	App.toggle_switch = function()
	{
		App.map_view.toggle();
	}
	App.ca_map = function()
	{
		//document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
		let checkBox = document.getElementById("customControlAutosizing");
		if(checkBox.checked == true)
		{	
			document.getElementById("rangeSlider").style.visibility = "visible";
		}
		else
		{
			document.getElementById("rangeSlider").style.visibility = "hidden";
		}
		App.comm_area_boundaries.activation();
	}
	
}) ();


//When using the original function change mapview_view1 ot map_view