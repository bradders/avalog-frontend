/*------------------------------------*\
    $Forms
\*------------------------------------*/
export default function forms() {

  var numberInputs = document.getElementsByClassName("input--increment");
  for(var i = 0; i < numberInputs.length; i++) {
    addNumberControls(numberInputs[i], i);
  }

  var instantInputs = document.getElementsByClassName("input--instant");
  for(var i = 0; i < instantInputs.length; i++) {
    instantInputs[i].addEventListener("click", autoSubmitForm);
  }

  var ajaxForms = document.getElementsByClassName("js-ajax-form");
  for(var i = 0; i < ajaxForms.length; i++) {
    ajaxForms[i].addEventListener("submit", submitAjaxForm);
  }

}

function autoSubmitForm() {
  this.form.submit();
}

function addNumberControls(self, i) {

  if(self.classList.contains("has--controls")) {
    return;
  }

  var parent = self.closest(".form__field");

  var subtractBtn = document.createElement("button");
  subtractBtn.innerText = "-";
  subtractBtn.setAttribute("id", "subtract-btn-" + i);

  var addBtn = document.createElement("button");
  addBtn.innerText = "+";
  addBtn.setAttribute("id", "add-btn-" + i);

  parent.insertBefore(subtractBtn, self);
  parent.insertBefore(addBtn, self.nextSibling);

  document.getElementById("subtract-btn-" + i).addEventListener("click", subtractFromNumber);
  document.getElementById("add-btn-" + i).addEventListener("click", addToNumber);

  self.classList.add("has--controls");

}

function addToNumber(event) {

  var self = this;
  var parent = self.closest(".form__field");
  var input = parent.querySelectorAll("input[type='number']")[0];
  var step = parseInt(input.getAttribute("step")) || 1;
  var inputMin = parseInt(input.getAttribute("min")) || 0;
  var newTotal = parseInt(input.value) + step;

  if(newTotal < inputMin) { newTotal = 0; }

  input.value = newTotal;

  var e = new Event("input");
  input.dispatchEvent(e);

}

function subtractFromNumber(event) {

  var self = this;
  var parent = self.closest(".form__field");
  var input = parent.querySelectorAll("input[type='number']")[0];
  var step = parseInt(input.getAttribute("step")) || 1;
  var inputMin = parseInt(input.getAttribute("min")) || 0;
  var newTotal = parseInt(input.value) - step;

  if(newTotal < inputMin) { newTotal = 0; }

  input.value = newTotal;

  var e = new Event("input");
  input.dispatchEvent(e);

}

function submitAjaxForm(event) {

  event.preventDefault();

  var self = this;
  var form = self.closest("form");
  var target = self.getAttribute("action");
  var inputs = form.querySelectorAll("input, textarea, select");
  var formData = {};

  // Clear form errors
  clearFormErrors(form);

  // create data
  for(var i = 0; i < inputs.length; i++) {
    formData[inputs[i].name] = inputs[i].value;
  }

  atomic(target, {
    method: "POST",
    data: formData,
    headers: {
      "X-CSRF-TOKEN": document.querySelectorAll('meta[name="csrf-token"]')[0].getAttribute("content"),
      "X-Requested-With": "XMLHttpRequest"
    }
  })
	.then(function (response) {

    var data = response.data;
    console.log(data);

    // Error
    if(data.error) {
      displayFormErrors(form, data.error);
      return;
    }

    // Success
    if(!data.error) {

      resetForm(form);
      closeModals();

      var success = form.getAttribute("data-success");
      modalComplete[success](response.data.object);

    }

    // TODO: Something else

	})
	.catch(function (response) {

    console.log(response);
    if(response.status == 401) {

      displayFormErrors(form, []);
      var formError = form.querySelectorAll(".form__error");
      if(formError) {
        formError[0].innerHTML = response.statusText;
        formError[0].classList.remove("element--hide");
      }
    }

  });

}

function clearFormErrors(form) {

  // Remove animation
  var modal = form.closest(".modal");
  if(modal) {

    var modalCard = modal.querySelectorAll(".modal__card");
    if(modalCard.length) {
      modalCard[0].classList.remove("animated", "shake");
    }
  }

  // Clear all error classes
  var formInputs = form.querySelectorAll("input, textarea, select");
  if(formInputs.length) {
    for(var i = 0; i < formInputs.length; i++) {
      formInputs[i].classList.remove("input--error");
    }
  }

  // Remove all labels
  var errorLabels = form.querySelectorAll(".form__field__error");
  if(errorLabels.length) {
    for(var i = 0; i < errorLabels.length; i++) {
      errorLabels[i].parentNode.removeChild(errorLabels[i]);
    }
  }

}

function displayFormErrors(form, errors) {

  // Animate card
  var modal = form.closest(".modal");
  if(modal) {

    var modalCard = modal.querySelectorAll(".modal__card");
    if(modalCard.length) {
      modalCard[0].classList.remove("animated", "shake");
      modalCard[0].classList.add("animated", "shake");
    }
  }

  // Show errors
  for (var error in errors) {

    var errorInput = form.querySelectorAll("[name='" + error + "']");
    if(errorInput.length) {

      errorInput[0].classList.add("input--error");

      var errorLabel = document.createElement("span");
      errorLabel.innerHTML = errors[error][0];
      errorLabel.classList.add("form__field__error");

      errorInput[0].parentNode.insertBefore(errorLabel, errorInput.nextSibling);

    }
  }

  var errorInputs = document.getElementsByClassName("input--error");
  for(var i = 0; i < errorInputs.length; i++) {
    errorInputs[i].addEventListener("blur", removeInputError);
  }

}

function removeInputError() {

  var self = this;
  var label = self.parentNode.querySelectorAll(".form__field__error");

  if(label.length) {
    self.parentNode.removeChild(label[0]);
  }

  self.classList.remove("form__field__error");

}

function resetForm(form) {

  var inputs = form.querySelectorAll("input, textarea, select");
  if(inputs.length) {
    for(var i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
  }

}
