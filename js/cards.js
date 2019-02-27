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

  event.preventDefault();

}
