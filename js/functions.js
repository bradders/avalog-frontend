/*------------------------------------*\
    $Helper Functions
\*------------------------------------*/
export default function functions() {

  var csrfToken = document.querySelectorAll('meta[name="csrf-token"]')[0].getAttribute("content");
  global.ajaxHeaders = { "X-CSRF-TOKEN": csrfToken };

}

global.isAuthed = function() {
  return document.getElementsByTagName("body")[0].hasAttribute("data-auth");
}

global.scrollToItem = function(item) {

  var diff=(item.offsetTop-window.scrollY)/8;

  if (Math.abs(diff)>1) {
    window.scrollTo(0, (window.scrollY+diff));
    clearTimeout(window._TO);
    window._TO=setTimeout(scrollToItem, 30, item);
  } else {
    window.scrollTo(0, item.offsetTop);
  }

}
