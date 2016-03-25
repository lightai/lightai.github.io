$.getJSON("/exlporeandroid/public/benchmark/json/gson_deserialize.json", function(json) {
   	var gsonLabels = [];

   	var gsonData = [];
   	var fastjsonData = [];
   	var jacksonData = [];

   	for (i in json) {
   		j += 1;
   		if (i == 0) continue;
   		if (i > 100) break;
   		console.log(json[i]);
   		gsonData.push(json[i].runTime);
   		gsonLabels.push(json[i].runCount);
   	}

   	$.getJSON("/exlporeandroid/public/benchmark/json/fastjson_deserialize.json", function(json) {
   		for (i in json) {
   			if (i == 0) continue;
   			if (i > 100) break;
   			console.log(json[i]);
   			fastjsonData.push(json[i].runTime);
   		}

   		$.getJSON("/exlporeandroid/public/benchmark/json/jackson_deserialize.json", function(json) {
   			for (i in json) {
   				if (i == 0) continue;
   				if (i > 100) break;
   				console.log(json[i]);
   				jacksonData.push(json[i].runTime);
   			}

   			var data = {
   	            labels: gsonLabels,
   	            datasets: [
   			        {
   			            label: "gson反序列化",
   			            fillColor: "rgba(220,220,220,0.2)",
   			            strokeColor: "rgba(220,220,220,1)",
   			            pointColor: "rgba(220,220,220,1)",
   			            pointStrokeColor: "#fff",
   			            pointHighlightFill: "#fff",
   			            pointHighlightStroke: "rgba(220,220,220,1)",
   			            data: gsonData
   			        },
   	        	    {
   			            label: "fastjson反序列化",
   			            fillColor: "rgba(220,220,220,0.2)",
   			            strokeColor: "#ff0000",
   			            pointColor: "rgba(220,220,220,1)",
   			            pointStrokeColor: "#fff",
   			            pointHighlightFill: "#fff",
   			            pointHighlightStroke: "rgba(220,220,220,1)",
   			            data: fastjsonData
   	                },
   	        	    {
   			            label: "jackson反序列化",
   			            fillColor: "rgba(220,220,220,0.2)",
   			            strokeColor: "#00ff00",
   			            pointColor: "rgba(220,220,220,1)",
   			            pointStrokeColor: "#fff",
   			            pointHighlightFill: "#fff",
   			            pointHighlightStroke: "rgba(220,220,220,1)",
   			            data: jacksonData
   	                 }
   	             ]
   			};

   			var ctx = $("#myChart").get(0).getContext("2d");
   			var myLineChart = new Chart(ctx).Line(data, {
   			    scaleBeginAtZero : true,
   			    scaleShowGridLines : false,
   			    scaleGridLineColor : "rgba(0,0,0,.05)",
   			    scaleGridLineWidth : 1,
   			    scaleShowHorizontalLines: true,
   			    scaleShowVerticalLines: true,
   			    barShowStroke : true,
   			    barStrokeWidth : 2,
   			    barValueSpacing : 1,
   			    barDatasetSpacing : 1,
   			});
   		});
   	});
   });