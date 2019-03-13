/*------------------------------------*\
    $Cards
\*------------------------------------*/
export default function cards() {

  var cardTabs = document.getElementsByClassName("js-card-tab-link");
  for(var i = 0; i < cardTabs.length; i++) {
    cardTabs[i].addEventListener("click", switchCardTab);
  }

}

function switchCardTab(event) {

  event.preventDefault();

  var self = this;
  var parent = self.closest(".card");
  var tabId = self.getAttribute("data-tab-id");
  var panel = parent.querySelector(".card__panel[data-tab-id='" + tabId + "']");
  var allLinks = parent.querySelectorAll(".card__tab__link");
  var allPanels = parent.querySelectorAll(".card__panel");

  if(panel) {

    for(var i = 0; i < allLinks.length; i++) {
      allLinks[i].classList.remove("card__tab__link--active");
    }

    for(var i = 0; i < allPanels.length; i++) {
      allPanels[i].classList.remove("card__panel--active");
    }

    self.classList.add("card__tab__link--active");
    panel.classList.add("card__panel--active");

  }

  /*
  var self = this;
  var parent = self.closest(".card");
  var tab = self.closest(".card__tab__link");
  var tabId = tab.getAttribute("data-tab-id");
  var allTabsLinks = parent.querySelectorAll(".card__tab__link");
  var allTabs = parent.querySelectorAll(".card__tab");
  var activeTab = parent.querySelectorAll("#" + tabId)[0];

  for(var i = 0; i < allTabsLinks.length; i++) {
    allTabsLinks[i].classList.remove("card__tab__link--active");
  }

  tab.classList.add("card__tab__link--active");
  for(var i = 0; i < allTabs.length; i++) {
    allTabs[i].classList.remove("card__tab--active");
  }

  activeTab.classList.add("card__tab--active");
  */

}
