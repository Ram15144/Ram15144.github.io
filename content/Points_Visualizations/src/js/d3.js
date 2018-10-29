//var width=1000,height=1000;

var width = d3.select('.particleDiv').node().clientWidth;
var height = width * 0.75;

var svg1=d3.select(".segment")
          .append("svg")
          .attr("fill",0x2F4F4F)
          .attr("width",width)
          .attr("height",height)
          .attr("float","center");

var rectangle = svg1.append("rect")
	.attr("width","100%")
	.attr("height","100%")
  .attr("fill","#6e8900");
	//.attr("fill","#2C3E50");

//console.log(intersectPoints);

var jsonCircles = [
  { "x_axis": width/2 - 30, "y_axis": height/2, "radius": 10, "color" : "red" },
  { "x_axis": width/2, "y_axis": height/2, "radius": 10, "color" : "green"},
  { "x_axis": width/2 + 30, "y_axis": height/2, "radius": 10, "color" : "blue"}];

var jsonCircles1 = [
  { "x_axis": 60, "y_axis": 90, "radius": 10, "color" : "green" },
  { "x_axis": 234, "y_axis": 50, "radius": 10, "color" : "purple"},
  { "x_axis": 134, "y_axis": 123, "radius": 10, "color" : "red"}];

var svgContainer = svg1.append("svg");
var circles = svgContainer.selectAll("circle")
                          .data(jsonCircles)
                          .enter()
                          .append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d.x_axis; })
                       .attr("cy", function (d) { return d.y_axis; })
                       .attr("r", function (d) { return d.radius; })
                       .style("fill", function(d) { return d.color; });
                       
function plotpts(intersectPoints)
{
	svgContainer.remove();
	svgContainer = svg1.append("svg");
	circles = svgContainer.selectAll("circle")
	                          .data(intersectPoints)
	                          .enter()
	                          .append("circle");

	circleAttributes = circles
	                       .attr("cx", function (d) { return (width/2) + (d.x * 50); })
	                       .attr("cy", function (d) { return (height/2) + (d.y * 50); })
	                       .attr("r", function (d) { return 4; })
	                       .style("fill", function(d) { return "black"; });
}

function plotptsh(intersectPoints)
{
  svgContainer.remove();
  svgContainer = svg1.append("svg");
  circles = svgContainer.selectAll("circle")
                            .data(intersectPoints)
                            .enter()
                            .append("circle");

  circleAttributes = circles
                         .attr("cx", function (d) { return (width/2) + (d.x * 50); })
                         .attr("cy", function (d) { return (height/2) + (d.z * 50); })
                         .attr("r", function (d) { return 4; })
                         .style("fill", function(d) { return "black"; });
}