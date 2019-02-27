/*------------------------------------*\
    $Config
    * site-wide helpers/values
\*------------------------------------*/
export default function config() {

  global._A = {

    cdnLink: ( window.location.href.includes(".co") ) ? "https://cdn.avalog.co/" : "https://avalog.test/cdn/",

    apiDomain: "/api/",
    //apiDomain: "https://avalog.co/api/",

    ratings: {
      "0": "below-threshold",
      "1": "low",
      "2": "moderate",
      "3": "considerable",
      "4": "high",
      "5": "extreme",
      "6": "below-threshold",
    },

    gMapsKey: "AIzaSyAV4nv2A1P0JpfunedgMTl2pdIb8M8veM0",
    mapboxAPI: "pk.eyJ1IjoiYnJhZGRlcnMiLCJhIjoiY2lmMDZ4bHFmMDBzdnNrbHZscDFjM2J4biJ9.0SFEKna4Fq3hIcjkxzaYtQ",

    mapDefaults: {
      zoom: 5,
      scrollwheel: false,
      lat: 50.26827684651598,
      lng: -112.30224637499998
    },

    //geoLocateRefreshTime: 10000, // 10 seconds
    //geoLocateRefreshTime: 30000, // 30 seconds
    //geoLocateRefreshTime: 60000, // 1 minute
    geoLocateRefreshTime: 300000, // 5 minutes

    storageAvailable: function(type) {
      try {
        var storage = window[type],
          x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      }
      catch(e) {
        return false;
      }
    },

    ajaxSetup: function() {

      $.ajaxPrefilter(function(options, originalOptions, xhr) {

        var token = $("meta[name='csrf-token']").attr("content");
        if(token) {
          return xhr.setRequestHeader("X-CSRF-TOKEN", token);
        }

      });

    }

  };

}
