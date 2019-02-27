export default function threads() {

}

global.modalComplete.threadAdded = function(thread) {

  var forum = document.getElementById("forum-items");

  var html = tmpl("thread_tmpl", thread);
  var card = document.createElement("div");
  card.innerHTML = html;
  card.classList.add("w--100");

  forum.insertBefore(card, forum.firstChild);

}

global.modalComplete.commentAdded = function(comment) {

  var comments = document.getElementById("thread-comments");
  var html = tmpl("comment_tmpl", comment);

  var card = document.createElement("div");
  card.innerHTML = html;
  card.classList.add("w--100");

  comments.appendChild(card);

  var commentCard = document.getElementById("comment-" + comment.id);
  var scrollPosition = commentCard.offsetTop;

  window.scrollTo({
    top: scrollPosition,
    left: 0,
    behavior: "smooth"
  });

}
