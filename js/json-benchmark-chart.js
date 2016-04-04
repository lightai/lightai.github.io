  
function showChart(options) {
    console.log(options);

    var gsonJsonPath = options.gsonJsonPath;
    var jacksonJsonPath = options.jacksonJsonPath;
    var fastjsonJsonPath = options.fastjsonJsonPath;
    var MAX_TIME = options.maxTime;
    var chartId = options.chartId;

    $.ajaxSettings.async = false;

    var gson_deserialize = [];
    var jackson_deserialize = [];        
    var fastjson_deserialize = [];

    $.getJSON(gsonJsonPath, function(json) {
        for (i in json) {
          // if (i < 8) continue;

          var time = json[i].runTime;
          if (time > MAX_TIME) time = MAX_TIME
          gson_deserialize.push(time / 1000);
        }
    });

    $.getJSON(fastjsonJsonPath, function(json) {

      for (i in json) {
        // if (i < 8) continue;
        var time = json[i].runTime;
        if (time > MAX_TIME) time = MAX_TIME
        fastjson_deserialize.push(time / 1000);
      }
    });

    $.getJSON(jacksonJsonPath, function(json) {

        for (i in json) {
          // if (i < 8) continue;
          var time = json[i].runTime;
          if (time > MAX_TIME) time = MAX_TIME
          jackson_deserialize.push(time / 1000);
        }

        console.log("load data ok");

        var chartData= {
           "gui":{
                "behaviors":[
                    {
                        "id":"Reload",
                        "enabled":"none"
                    },
                    {
                        "id":"SaveAsImage",
                        "enabled":"none"
                    },
                    {
                        "id":"Print",
                        "enabled":"all"
                    },
                    {
                        "id":"BugReport",
                        "enabled":"none"
                    },
                    {
                        "id":"FullScreen",
                        "enabled":"all"
                    },
                    {
                        "id":"ResetZoom",
                        "enabled":"all"
                    },
                    {
                        "id":"ZoomIn",
                        "enabled":"all"
                    },
                    {
                        "id":"ZoomOut",
                        "enabled":"all"
                    },
                    {
                        "id":"ViewAll",
                        "enabled":"none"
                    },
                    {
                        "id":"LogScale",
                        "enabled":"none"
                    },
                    {
                        "id":"DownloadPDF",
                        "enabled":"all"
                    },
                    {
                        "id":"3D",
                        "enabled":"all"
                    },
                    {
                        "id":"HideGuide",
                        "enabled":"none"
                    }
                ],
                "context-menu":{
                    "button":{
                        "visible":0
                    },
                    "gear":{
                        "visible":0
                    },
                    "custom-items":[
                        {
                            "text":"Reset Zoom",
                            "function":"resetZoom(this)",
                            "id":"reset-zoom"
                        }
                    ]
                }},
           "graphset":[
            {
                "type":"line",
                "background-color":"#f4f4f4",
                "plot":{
                    "mode":"fast",
                    "exact":true,
                    "smartSampling":true,
                    "maxNodes":0,
                    "maxTrackers":0,
                    "lineWidth":2,
                    "shadow":false,
                    "marker":{
                        "type":"none",
                        "shadow":false
                    }
                },
                "plotarea":{
                    "background-color":"#fbfbfb",
                    "margin-top":"30px",
                    "margin-bottom":"40px",
                    "margin-left":"50px",
                    "margin-right":"30px"
                },
                "scaleX":{
                    "autoFit":true,
                    "zooming":true,
                    "normalize":true,
                    "lineWidth":1,
                    "line-color":"#c7c9c9",
                    "tick":{
                        "lineWidth":1,
                        "line-color":"#c7c9c9"
                    },
                    "guide":{
                        "visible":false
                    },
                    "item":{
                        "font-color":"#818181",
                        "font-family":"Arial",
                        "padding-top":"5px"
                    },
                    "maxLabels":10
                },
                "scrollX":{
                    
                },
                "scaleY":{
                    "minValue":"auto",
                    "autoFit":true,
                    "lineWidth":1,
                    "line-color":"#c7c9c9",
                    "tick":{
                        "lineWidth":1,
                        "line-color":"#c7c9c9"
                    },
                    "item":{
                        "font-color":"#818181",
                        "font-family":"Arial",
                        "padding-right":"5px"
                    },
                    "guide":{
                        "lineStyle":"solid",
                        "line-color":"#c7c9c9",
                        "alpha":0.2
                    }
                },
                "tooltip":{
                    "visible":false
                },
                "legend":{
      
                },
                "crosshairX":{
                    "lineWidth":1,
                    "line-color":"#003849",
                    "marker":{
                        "size":4,
                        "type":"circle",
                        "borderColor":"#fff",
                        "borderWidth":1
                    },
                    "scale-label":{
                        "font-color":"#ffffff",
                        "background-color":"#003849",
                        "padding":"5px 10px 5px 10px",
                        "border-radius":"5px"
                    },
                    "plotLabel":{
                        "multiple":false,
                        "callout":false,
                        "shadow":false,
                        "height":"115px",
                        "padding":"5px 10px 5px 10px",
                        "border-radius":"5px",
                        "alpha":1,
                        "headerText":"Node %scale-key-text<br>",
                        "text":"<b>%plot-text:</b> %node-value"
                    }
                },
                "series":[
                    {
                        "values": gson_deserialize,
                        "line-color":"#ff0000",
                        "line-width":1,
                        "text" : "gson"
                    },
                    {
                        "values": fastjson_deserialize,
                        "line-color":"#0000ff",
                        "line-width":1,
                        "text" : "fastjson"
                    },
                    {
                        "values": jackson_deserialize,
                        "line-color":"#00ff00",
                        "line-width":1,
                        "text" : "jackson"
                    }
                ]
            }]
        }

        zingchart.render({ // Render Method[3]
          id: chartId,
          data: chartData,
          height: 400,
          width: 730
        });
    
        
    });

    $.ajaxSettings.async = true;
}