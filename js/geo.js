export default function geo() {

}


/**
 * Determine a users' lat/lng, and elevation
 *
 * @param  mixed|null  $callback
 * @return void
 */
global.geoLocate = function(callback) {

  var hasRecentGeoTag = recentGeoTag();
  if(hasRecentGeoTag) {

    if(typeof callback === "function") {
      callback();
    }
    return;

  }

  navigator.geolocation.getCurrentPosition(function(position) {

    if(_A.storageAvailable("localStorage")) {

      localStorage.timestamp = new Date().getTime();
      localStorage.lat = position.coords.latitude;
      localStorage.lng = position.coords.longitude;
      //getElevation(position.coords.latitude, position.coords.longitude);

      var bodyTag = document.getElementsByTagName("body")[0];
      bodyTag.setAttribute("data-lat", localStorage.lat);
      bodyTag.setAttribute("data-lng", localStorage.lng);
      //bodyTag.setAttribute("data-elevation", localStorage.elevation);

      // Find Users' regions
      //var testLat = "49.096568";
      //var testLng = "-117.71173"; // Trail, BC
      var target = _A.apiDomain + "regions?location=" + localStorage.lat + "," + localStorage.lng;
      atomic(target)
    	.then(function (response) {

        localStorage.regions = JSON.stringify(response.data);

        if(typeof callback === "function") {
          callback();
        }

    	})
    	.catch(function (error) {});

    }

  });

}

/**
 * See if we recently geo located the user
 *
 * @param  int|null  $callback
 * @return boolean
 */
global.recentGeoTag = function(timeoutLimit) {

  var now = new Date().getTime();
  timeoutLimit = (typeof timeoutLimit === 'undefined') ? _A.geoLocateRefreshTime : timeoutLimit;

  if(_A.storageAvailable("localStorage")) {
    if(!localStorage.timestamp) {
      // no geo time
      return false;
    } else {
      // have geo time
      var diff = now - localStorage.timestamp;
      if(diff < timeoutLimit) {
        return true;
      }
      //timed out, get new
      return false;
    }

  }
  return false;
}
