export default function membership() {

  var joinButtons = document.getElementsByClassName("js-join-membership");
  for(var i = 0; i < joinButtons.length; i++) {
    joinButtons[i].addEventListener("click", joinMembership);
  }

  var freeSpiritPricePicker = document.getElementById("free-spirit-price-picker");
  if(freeSpiritPricePicker != null) {

    freeSpiritPricePicker.addEventListener("input", updateFreeSpiritTotal);

    if(freeSpiritPricePicker.value) {
      updateFreeSpiritTotal();
    }

  }

  if(joinButtons.length) {

    global.stripeHandler = StripeCheckout.configure({
      key: "pk_test_Hh1w1DRukT98MMoNaroaoaOy",
      image: 'https://cdn.avalog.co/images/logo--white.png',
      locale: "auto",
      token: function(token) {

        var data = token;
        data.subscription = document.getElementById("membership-subscription-name").value;
        data.amount = parseInt(document.getElementById("membership-subscription-amount").value);

        atomic("/membership/join", { method: 'POST', data: data, headers: global.ajaxHeaders })
        .then(function (response) {
          console.log('success data', response.data);
          console.log('success full response', response.xhr);
        })
        .catch(function (error, b, c) {
          console.log(error);
          console.log(b);
          console.log(c);
        });

      }
    });

  }

}

function joinMembership(event) {

  var self = this;
  var subscription = self.getAttribute("data-subscription");
  var subscriptionAmount = parseInt(self.getAttribute("data-amount"));
  var email = ( isAuthed ) ? document.getElementsByTagName("body")[0].getAttribute("data-user-email") : "";

  document.getElementById("membership-subscription-name").value = subscription;
  document.getElementById("membership-subscription-amount").value = subscriptionAmount;

  if(subscriptionAmount >= 2000) {

    stripeHandler.open({
      name: "Avalog",
      description: subscription,
      currency: "cad",
      amount: subscriptionAmount,
      email: email
    });

  }

  event.preventDefault();

}

function updateFreeSpiritTotal(event) {

  var self = document.getElementById("free-spirit-price-picker");
  var total = parseInt(self.value);
  var joinButton = document.getElementById("join-free-spirit");
  var freeSpiritDonation = document.getElementById("free-spirit-donation");
  var freeSpiritExtra = document.getElementById("free-spirit-extra");
  var freeSpiritTotalLabels = document.getElementsByClassName("js-free-spirit-value");

  if(total < 20) {
    total = 20;
    self.value = total;
  }

  freeSpiritExtra.classList.remove("element--hide");
  freeSpiritDonation.innerText = total / 2;
  joinButton.setAttribute("data-amount", parseInt(total * 100));
  joinButton.innerText = "Join $" + total;

  if(freeSpiritTotalLabels.length) {
    for(var i = 0; i < freeSpiritTotalLabels.length; i++) {
      freeSpiritTotalLabels[i].innerHTML = "$" + total;
    }
  }

}
