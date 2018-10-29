var App = App || {};

let ca_boundaries = function()
{
	let self = this;
	let range;
	let geojson_ca;	// Community area boundary map
	
	let info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};
	info.update = function (props) {
		this._div.innerHTML = '<h4>Illinois Community Areas</h4>' +  (props ?
			'<b>' + props.community + '</b><br />' : 'Hover over a community area');
	};
	
	
	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'black',
			dashArray: '3',
			fillOpacity: range,
			fillColor: '#de2d26'
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

		//info.update(layer.features.properties);
		info.update(layer.feature.properties);
	}

	function resetHighlight(e) {
		geojson_ca.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	
	let enabled = function()
	{
		if(geojson_ca)
		{
			info.remove();
			geojson_ca.remove();
		}	
		geojson_ca = L.geoJson(ca_data, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(App.map_view.map);
		info.addTo(App.map_view.map);
	}
	let disabled = function()
	{
		if(geojson_ca)
		{
			info.remove();
			geojson_ca.remove();
		}
	}
	
	self.activation = function()
	{
		let checkBox = document.getElementById("customControlAutosizing");
		let slider = document.getElementById("myRange");
		range = slider.value/100;
		if(checkBox.checked == true)
		{	
			//document.getElementById("rangeSlider").style.visibility = "visible";
			enabled();
		}
		else
		{
			//document.getElementById("rangeSlider").style.visibility = "collapse";
			disabled();
		}
	}
}