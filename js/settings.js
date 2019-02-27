export default function settings() {

  var editDeviceBtns = document.getElementsByClassName("js-edit-device");
  for(var i = 0; i < editDeviceBtns.length; i++) {
    editDeviceBtns[i].addEventListener("click", editDevice);
  }

}

function editDevice(event) {

  var self = this;
  var parentForm = self.parentNode.parentNode;
  var deviceHash = parentForm.getAttribute("data-device-hash");
  var extras = parentForm.querySelectorAll(".device__edit")[0];

  var deviceLabel = parentForm.querySelectorAll("#device-label-" + deviceHash)[0];
  var deviceInput = parentForm.querySelectorAll("#device-input-" + deviceHash)[0];
  var editButton = parentForm.querySelectorAll("#device-edit-" + deviceHash)[0];
  var saveButton = parentForm.querySelectorAll(".js-save-device")[0];
  var cancelButton = parentForm.querySelectorAll(".js-cancel-device")[0];

  extras.classList.toggle("element--hide");
  cancelButton.classList.toggle("element--hide");

  if(deviceLabel) {
    deviceLabel.classList.toggle("element--hide");
  }

  deviceInput.classList.toggle("element--hide");

  saveButton.classList.toggle("element--hide");
  editButton.classList.toggle("element--hide");

  event.preventDefault();
}
