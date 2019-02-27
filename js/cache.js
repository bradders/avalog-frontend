/*------------------------------------*\
    $Cache
\*------------------------------------*/
export default function cache() {

}

caches.has("avalog:pages").then(function(hasCache) {
  if (hasCache) {
    cachePage();
  }
}).catch(function() {
  //Handle exception here.
});

global.cachePage = function() {

  caches.open("avalog:pages").then(function(cache) {

    if(_A.storageAvailable("localStorage")) {

      var cacheIt = true;
      var cachedPages = [];

      var pageUrl = window.location.pathname;
      var pageTitle = document.querySelectorAll("h1")[0].innerText;

      if(localStorage.cachedPages) {

        cachedPages = JSON.parse( localStorage.cachedPages );

        for(var i = 0; i < cachedPages.length; i++) {

          if(cachedPages[i].url == pageUrl) {
            cacheIt = false;
          }

        }

      }

      if( pageUrl == "/offline" ) {
        cacheIt = false;
      }

      if(cacheIt === true) {

        cachedPages.push({title: pageTitle, url: pageUrl});
        localStorage.cachedPages = JSON.stringify(cachedPages);

        cache.delete("/offline");
        return cache.addAll(["/offline", window.location.pathname]);

      }

    }

  });

}
