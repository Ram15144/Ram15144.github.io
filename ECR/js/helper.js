var App = App || {};
let self = this;
let year, age, cancerSiteGrp;
let ca77 = new Array(77);
let ca_dict = {};
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

//postMessage("CR7");

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
		if(ca77[76] === undefined || ca77[76].length == 0)
		{	
			for(let i=0; i<77; i++)
			{
				comm_area = (i+1).toString();
				//file_name = "../CA_DATA/community_data/"+comm_area+".txt";
				file_name = "./"+comm_area+".txt";


				readTextFile(file_name);
				//App.helper = new helper();
				//let data = App.helper.readTextFile(file_name);
				//console.log("Hello!");
				//console.log(data);
				let data = community_area_data.split("\n");
				//data = data.split("\n");
				ca77[i] = data;
				
				ca_dict[comm_area] = getDeaths(data); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
				
				//Updating the progress bar
				//console.log(bars[0].style.width);
				//let str = i.toString()+"%";
				
				//bars[0].style.width = str;
				console.log(i);
			}
		}
		else
		{
			for(let i=0; i<77; i++)
			{
				comm_area = (i+1).toString();
				
				ca_dict[comm_area] = getDeaths(ca77[i]); // This dictionary holds the number of cancer deaths in each community area according to the given specifications
			}
		}
		postMessage();
	}
	
	// Now Calculating the number of deaths in each ward
	//find_ward_data();
}

function readFile()
{
	self.requestFileSystemSync = self.webkitRequestFileSystemSync ||
                             self.requestFileSystemSync;
	let buffers = [];
	let reader = new FileReaderSync();
	buffers.push(reader.readAsArrayBuffer("1.html"));
	console.log(buffers);
}

onmessage = function(e)
{
	age = e.data.a;
	year = e.data.y;
	cancerSiteGrp = e.data.csg;
	console.log(age,year,cancerSiteGrp);
	if(age !== undefined)
		readFile();
		//calc_deaths();
}