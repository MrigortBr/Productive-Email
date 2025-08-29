function showAlert(message, type = "info") {
  let container = document.getElementById("custom-alert-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "custom-alert-container";
    document.body.appendChild(container);
  }

  const alertBox = document.createElement("div");
  alertBox.className = `custom-alert ${type}`;
  alertBox.textContent = message;

  container.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("hide");
    setTimeout(() => container.remove(), 500);
  }, 3000);
}