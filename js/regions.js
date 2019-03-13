export default function regions() {

  var regionLocateBtn = document.getElementById("js-region-geolocate");
  if(regionLocateBtn != null) {
    regionLocateBtn.addEventListener("click", findNearestRegions);
  }

}

function findNearestRegions(event) {

  var self = this;

  geoLocate(function(data) {

    loadRegionsList();
    buttonRemoveLoadingState(self);

  });
  event.preventDefault();
}

function loadRegionsList(regions) {

  var regions = JSON.parse(localStorage.regions);
  var current = regions.current;
  var nearby = regions.nearby;
  var regionList = document.getElementById("regions-list");
  var regionsHtml = "";

  if(current.length) {

    regionsHtml += "<div class='card'>";

    regionsHtml += "<div class='card__content'><h2>You Are Here</h2><ul>";
    for(var i = 0; i < current.length; i++) {
      regionsHtml += tmpl("region_tmpl", current[i]);
    }
    regionsHtml += "</ul></div>";
    regionsHtml += "</div>";

  }

  if(nearby.length) {

    regionsHtml += "<h2>Nearby</h2>";

    regionsHtml += "<ul>";
    for(var i = 0; i < nearby.length; i++) {
      regionsHtml += tmpl("region_tmpl", nearby[i]);
    }
    regionsHtml += "</ul>";

  }

  regionList.innerHTML = regionsHtml;

}

global.cache = {};
global.tmpl = function tmpl(str, data){
  // Figure out if we're getting a template, or if we need to
  // load the template - and be sure to cache the result.
  var fn = !/\W/.test(str) ?
    cache[str] = cache[str] ||
      tmpl(document.getElementById(str).innerHTML) :

    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +

      // Introduce the data as local variables using with(){}
      "with(obj){p.push('" +

      // Convert the template into pure JavaScript
      str
        .replace(/[\r\t\n]/g, " ")
        .split("<%").join("\t")
        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
        .replace(/\t=(.*?)%>/g, "',$1,'")
        .split("\t").join("');")
        .split("%>").join("p.push('")
        .split("\r").join("\\'")
    + "');}return p.join('');");

  // Provide some basic currying to the user
  return data ? fn( data ) : fn;
};
