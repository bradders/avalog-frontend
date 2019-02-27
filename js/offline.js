/*------------------------------------*\
    $Offline
\*------------------------------------*/
export default function offline() {

  if ('serviceWorker' in navigator) {

    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
        // Successfully registered the Service Worker
      }).catch(function(err) {
        // Failed to register the Service Worker
      });
    });

  }

  if ("onLine" in navigator) {

    if(navigator.onLine === false) {

      var bodyTag = document.getElementsByTagName("body")[0];
      var offlineMessage = document.createElement("div");
      offlineMessage.classList.add("message", "message--offline");
      offlineMessage.innerHTML = "<p>Looks like you're offline. <a href='/offline'>Viewed your saved pages</a></p>";

      bodyTag.insertBefore(offlineMessage, bodyTag.firstChild);
      bodyTag.classList.add("page--offline");
    }

  }

}
