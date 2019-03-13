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

  if(self.classList.contains("js-modal-open")) {
    global.lastModalButton = self;
  }

  // Close any open modals
  var openModals = document.querySelectorAll(".modal.is--open");
  if(openModals.length) {
    for(var i = 0; i < openModals.length; i++) {
      modalToggle(openModals[i], "closing");
    }
  }

  modalToggle(modal, action);

}

function modalToggle(modal, action) {

  var firstElement = modal.querySelector("a, button, input, select, textarea");

  if(action == "opening") {

    modal.classList.add("is--open");
    modal.setAttribute("aria-hidden", "false");
    firstElement.focus();
    modal.setAttribute("tabindex", "0");

  } else {

    modal.classList.remove("is--open");
    modal.setAttribute("aria-hidden", "true");
    global.lastModalButton.focus();
    modal.setAttribute("tabindex", "-1");
    //window.location.hash = "";

  }

}

function checkModalAutoOpen(hash) {

  var modal = document.querySelector(hash);
  if(modal !== null && modal.classList.contains("modal")) {
    modalToggle(modal, "opening");
  }

}

global.lastModalButton = null;
global.modalComplete = {}

global.closeModals = function() {

  var modals = document.getElementsByClassName("modal");
  if(modals.length) {
    for(var i = 0; i < modals.length; i++) {
      modals[i].classList.remove("is--open");
    }
  }
}
