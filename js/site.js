window.atomic = require("./atomic/atomic");
export default function site() {

  var htmlTag = document.querySelector("html");
  htmlTag.classList.remove("no-js");
  htmlTag.classList.add("page--js");

  // Site-wide stuff
  var siteNavToggleButton = document.getElementById("toggle-site-nav");
  if(siteNavToggleButton != null) {
    siteNavToggleButton.addEventListener("click", toggleSiteNav);
  }

  var sidebarToggleButton = document.getElementById("sidebar-toggle");
  if(sidebarToggleButton != null) {
    sidebarToggleButton.addEventListener("click", toggleSidebar);
  }

  var togglers = document.getElementsByClassName("js-toggle");
  for(var i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener("click", toggler);
  }

  var actionButtons = document.querySelectorAll("[data-btn-action]");
  for(var i = 0; i < actionButtons.length; i++) {
    actionButtons[i].addEventListener("click", buttonAddLoadingState);
  }

  //Pre scroll scrollers
  var preScollers = document.querySelectorAll("[data-pre-scroll]");
  for(var i = 0; i < preScollers.length; i++) {
    setTimeout(scrollIt, 1000, preScollers[i]);
  }

  // External Links
  var externalLinks = document.querySelectorAll("[rel='external']");
  for(var i = 0; i < externalLinks.length; i++) {
    externalLinks[i].setAttribute("target", "_blank");
  }

  // Audio buttons
  var audioButtons = document.getElementsByClassName("js-play-audio");
  for(var i = 0; i < audioButtons.length; i++) {
    audioButtons[i].addEventListener("click", playAudio);
  }

  // Stash page url/title
  stashPageTitle();

  var stickyElements = document.getElementsByClassName("is--sticky");
  if(stickyElements.length) {

    for(var i = 0; i < stickyElements.length; i++) {

      var stickyElement = stickyElements[i];
      var elementPosition = stickyElement.getBoundingClientRect().top;
      var elementHeight = stickyElement.getBoundingClientRect().height;

      stickyElement.setAttribute("data-waypoint", (elementPosition + elementHeight));

      watchStickyElement(stickyElement);

      document.addEventListener("scroll", function() {
        watchStickyElement(stickyElement);
      });

    }

  }

}

function watchStickyElement(stickyElement) {

  var waypoint = stickyElement.getAttribute("data-waypoint");
  var stickyTargetId = stickyElement.getAttribute("data-sticky-target");
  var stickyTarget = document.getElementById(stickyTargetId);

  stickyTarget.setAttribute("hidden", true);

  if(window.scrollY >= waypoint) {
    stickyTarget.removeAttribute("hidden");
  }

}

function stashPageTitle() {

  var pageTitles = [];

  if(localStorage.pageTitles !== undefined) {
    pageTitles = JSON.parse(localStorage.pageTitles);
  }

  var pageTitle = document.querySelector("title").innerText.replace(" — Avalog", "");
  var pageHref = window.location.href;

  var alreadyStashed = false;
  for(var i = 0; i < pageTitles.length; i++) {
    if(pageTitles[i][0] == pageHref) {
      alreadyStashed = true;
    }
  }

  if(alreadyStashed === false) {
    pageTitles.push([pageHref, pageTitle]);
    localStorage.pageTitles = JSON.stringify(pageTitles);
  }

}

function scrollIt(element) {
  element.scrollLeft = 9999;
  element.scrollTop = 0;
}

global.buttonAddLoadingState = function(event) {
  var self = this;
  self.setAttribute("disabled", "true");
  self.classList.add("btn--loading");
}

global.buttonRemoveLoadingState = function(self) {
  self.removeAttribute("disabled");
  self.classList.remove("btn--loading");
}

function toggler(event) {

  var self = this;
  var targetSelector = self.getAttribute("data-toggle-target");
  var targetElements = document.querySelectorAll(targetSelector);

  for(var i = 0; i < targetElements.length; i++) {
    targetElements[i].classList.toggle("element--hide");
  }

  event.preventDefault();

}

function toggleSidebar(event) {

  var sidebar = document.getElementsByClassName("main__sidebar")[0];
  var sidebarLinks = sidebar.querySelectorAll("a");
  var hiding = sidebar.classList.contains("main__sidebar--open");
  var tabIndex = (hiding) ? "-1" : "0";

  sidebar.classList.toggle("main__sidebar--open");

  for (var i = 0; i < sidebarLinks.length; i++) {
    sidebarLinks[i].setAttribute("tabIndex", tabIndex);
  }

  event.preventDefault();

}

function toggleSiteNav(event) {

  var self = this;
  var nav = document.getElementById("site-nav");
  var navLinks = nav.querySelectorAll("a");
  var launcher = document.getElementById("site-nav-launcher");

  var hiding = nav.classList.contains("site__nav--active");
  var tabIndex = (hiding) ? "-1" : "0";
  var buttonText = (hiding) ? "Menu" : "Close";
  var buttonIcon = (hiding) ? "menu" : "close";
  var ariaExpanded = (hiding) ? "false" : "true";

  nav.classList.toggle("site__nav--active");
  launcher.classList.toggle("site__nav__launcher--active");

  for(var i=0; i < navLinks.length; i++) {
    navLinks[i].setAttribute("tabindex", tabIndex);
  }

  self.querySelectorAll(".toggle__text")[0].innerText = buttonText;
  self.setAttribute("aria-expanded", ariaExpanded);
  self.setAttribute("data-icon", buttonIcon);

  event.preventDefault();

}

function playAudio(event) {

  event.preventDefault();

  var self = this;
  var audioId = self.getAttribute("data-audio-id");
  var player = document.getElementById(audioId);
  var iconPlay = self.querySelector("[data-icon-play]");
  var iconPause = self.querySelector("[data-icon-pause]");

  iconPlay.classList.remove("element--hide");
  iconPause.classList.remove("element--hide");

  if(player.paused) {

    iconPlay.classList.add("element--hide");
    player.play();

  } else {

    iconPause.classList.add("element--hide");
    player.pause();

  }

}

/*
function updateGeoUi() {

  var bodyTag = document.getElementsByTagName("body")[0];
  bodyTag.setAttribute("data-lat", localStorage.lat);
  bodyTag.setAttribute("data-lng", localStorage.lng);
  bodyTag.setAttribute("data-elevation", localStorage.elevation);

}

function isAuthed() {
  return document.getElementsByTagName("body")[0].hasAttribute("data-auth");
}

function formatDistance(value) {
  var number = formatCommas( Math.round(value) );
  var metric = (value < 1) ? "m" : "km";
  return number + metric;
}

function formatCommas(value) {
  if (value === undefined) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
*/
