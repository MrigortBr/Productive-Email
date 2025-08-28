    function showAlert(message, type = "info") {
      // Criar container se não existir
      let container = document.getElementById("custom-alert-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "custom-alert-container";
        document.body.appendChild(container);
      }

      // Criar alerta
      const alertBox = document.createElement("div");
      alertBox.className = `custom-alert ${type}`;
      alertBox.textContent = message;

      container.appendChild(alertBox);

      // Remover depois de 3s
      setTimeout(() => {
        alertBox.classList.add("hide");
        setTimeout(() => alertBox.remove(), 300);
      }, 3000);
    }