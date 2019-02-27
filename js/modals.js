/*------------------------------------*\
    $Cards
\*------------------------------------*/
export default function modals() {

  var modalTogglers = document.querySelectorAll(".js-modal-open, .js-modal-close");
  if(modalTogglers.length) {
    for(var i = 0; i < modalTogglers.length; i++) {
      modalTogglers[i].addEventListener("click", modalClick);
    }
  }

  var urlHash = window.location.hash;
  if(urlHash) {
    checkModalAutoOpen(urlHash);
  }

}

function modalClick(event) {

  event.preventDefault();

  var self = this;
  var modalId = self.getAttribute("data-modal-id");
  var modal = document.querySelector("#" + modalId);
  var action = modal.classList.contains("is--open") ? "closing" : "opening";

  modalToggle(modal, action);

}

function modalToggle(modal, action) {

  if(action == "opening") {
    modal.classList.add("is--open");
  } else {
    modal.classList.remove("is--open");
    window.location.hash = "";
  }

}

function checkModalAutoOpen(hash) {

  var modal = document.querySelector(hash);
  if(modal !== null && modal.classList.contains("modal")) {
    modalToggle(modal, "opening");
  }

}

global.modalComplete = {}

global.closeModals = function() {

  var modals = document.getElementsByClassName("modal");
  if(modals.length) {
    for(var i = 0; i < modals.length; i++) {
      modals[i].classList.remove("is--open");
    }
  }
}
