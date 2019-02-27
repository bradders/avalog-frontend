/*------------------------------------*\
    $Forecasts
\*------------------------------------*/
window.amcharts = require("./amcharts/amcharts");

export default function forecasts() {

  var forecastForwardBtns = document.getElementsByClassName("js-forecast-forward");
  if(forecastForwardBtns.length) {
    for(var i = 0; i < forecastForwardBtns.length; i++) {
      forecastForwardBtns[i].addEventListener("click", forwardForecast);
    }
  }

  var problemRadars = document.getElementsByClassName("js-radar--problem");
  if(problemRadars.length) {

    require(["./amcharts/amcharts", "./amcharts/radar"], function(AmCharts, AmRadarChart) {

      // Radars
      for(var i = 0; i < problemRadars.length; i++) {
        drawProblemRadarChart(problemRadars[i]);
      }

    });

  }

}
forecasts();

function forwardForecast(event) {

  var self = this;
  var target = self.getAttribute("href");

  atomic(target)
	.then(function (response) {
    self.querySelectorAll(".btn__text")[0].innerText = "Sent";
    buttonRemoveLoadingState(self);
	})
	.catch(function (error) {});

  event.preventDefault();
}

function drawProblemRadarChart(chart) {

  var chartId = chart.getAttribute("id");
  var problemId = chart.getAttribute("data-problem-id");
  var dataObject = window["data" + problemId];
  var chartTitle = chart.getAttribute("data-problem-title").toLowerCase();

    var chart = AmCharts.makeChart( chartId, {
      "type": "radar",
      "addClassNames": true,
      "color": "#222222",
      "dataProvider": dataObject,
      "valueAxes": [ {
        "gridType": "polygons",
        "gridCount": 5,
        "minimum": 0,
        "maximum": 60,
        "autoGridCount": false,
        "axisAlpha": 0.2,
        "fillAlpha": 0.05,
        "fillColor": "#000000",
        "gridAlpha": 0.08,
        "position": "left",
        "labelsEnabled": true,
        "radarCategoriesEnabled": true,
        "stackType": "3d",
        "labelFunction": formatProblemLabel
      } ],
      "startDuration": .5,
      "graphs": [
        {
          "id": "g1",
          "type": "line",
          "valueField": "below-treeline",
          "fillAlphas": 0.5,
          "bullet": "round",
          "bulletAlpha": 0,
          "lineAlpha": 1,
          "lineColor": "#666666",
          "balloonColor": ratings.belowTreeline.color,
          "balloonText": "[[category]]",
          "balloonFunction": balloonHover,
          "color": ratings.belowTreeline.color,
          "fillColors": ratings.belowTreeline.color
        },
        {
          "id": "g2",
          "type": "line",
          "valueField": "treeline",
          "fillAlphas": 0.5,
          "bullet": "round",
          "bulletAlpha": 0,
          "lineAlpha": 1,
          "lineColor": "#666666",
          "balloonColor": ratings.treeline.color,
          "balloonText": "[[category]]",
          "balloonFunction": balloonHover,
          "color": ratings.treeline.color,
          "fillColors": ratings.treeline.color
        },
        {
          "id": "g3",
          "type": "line",
          "valueField": "alpine",
          "fillAlphas": 0.5,
          "bullet": "round",
          "bulletAlpha": 0,
          "lineAlpha": 1,
          "lineColor": "#666666",
          "balloonColor": ratings.alpine.color,
          "balloonText": "[[category]]",
          "balloonFunction": balloonHover,
          "color": ratings.alpine.color,
          "fillColors": ratings.alpine.color
        }
      ],
      "categoryField": "aspect",
      "export": {
        "enabled": true,
        "libs": {
          "path": "http://www.amcharts.com/lib/3/plugins/export/libs/"
        }
      }

    });

    //$(".amcharts-chart-div > a").hide();

    chart.clearLabels();

    chart.timeout;

    chart.addListener("rollOverGraph", function(event) {
      setOpacity(event.graph, 1);
    });

    chart.addListener("rollOutGraph", function(event) {
      setOpacity(event.graph, 0.5);
    });

}

function formatProblemLabel(value, formattedValue, valueAxis){

  if(value === 20){
    return "Alpine";
  } else if (value == 40){
    return "Treeline";
  } else if (value == 60){
    return "Below Treeline";
  } else {
    return "";
  }

}

function balloonHover(data) {

  var value = parseInt(data.values.value);
  if( value > 0) {
    return data.category + " aspects are showing signs of " + data.description + " at " + formatProblemLabel(value).toLowerCase() + " elevations";
  }

}

function setOpacity(graph, opacity) {

  var className = "amcharts-graph-" + graph.id;
  var items = document.getElementsByClassName(className);

  if (undefined === items) {
    return;
  }

  for (var x in items) {

    if ("object" !== typeof items[x]) {
      continue;
    }

    var paths = items[x].getElementsByTagName("path");
    for (var x = 0; x < paths.length; x++) {

      if (undefined !== paths[x]) {
        paths[x].setAttribute("fill-opacity", opacity);
        paths[x].setAttribute("stroke-opacity", opacity);
      }

    }

  }

}
