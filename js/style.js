let currentAlert = null;
let countdownTimer = null;

function hoverLight(color) {
  const button = document.getElementById(`${color}-light`);
  button.style.backgroundColor = color;
  button.style.opacity = "1";
}

function resetLight() {
  const buttons = document.querySelectorAll(".light-btn");
  buttons.forEach((button) => {
    if (!button.classList.contains("active")) {
      button.style.backgroundColor = "transparent";
      button.style.opacity = "0.5";
    }
  });
}

function clickLight(color) {
  clearCurrentCountdown();

  const buttons = document.querySelectorAll(".light-btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
    button.style.backgroundColor = "transparent";
    button.style.opacity = "0.5";
    button.innerHTML = ""; // Clear countdown text
  });

  const button = document.getElementById(`${color}-light`);
  button.style.backgroundColor = color;
  button.style.opacity = "1";
  button.classList.add("active");

  showAlert(color);
  startCountdown(color);
}

function showAlert(color) {
  if (currentAlert) {
    currentAlert.remove();
  }

  const alertType =
    color === "red" ? "danger" : color === "orange" ? "warning" : "success";
  const alertMessage =
    color === "red"
      ? "STOP"
      : color === "orange"
      ? "GET READY"
      : color === "green"
      ? "GO"
      : "";

  const alertBox = document.createElement("div");
  alertBox.classList.add(
    "alert",
    `alert-${alertType}`,
    "alert-dismissible",
    "fade",
    "show"
  );
  alertBox.setAttribute("role", "alert");
  alertBox.innerHTML = `
    <strong>${alertMessage}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  const trafficLightContainer = document.querySelector(".traffic-light");
  trafficLightContainer.insertAdjacentElement("beforebegin", alertBox);
  currentAlert = alertBox;

  const closeButton = alertBox.querySelector(".btn-close");
  closeButton.addEventListener("click", () => {
    resetTrafficLightColors();
  });
}

function resetTrafficLightColors() {
  const buttons = document.querySelectorAll(".light-btn");
  buttons.forEach((button) => {
    button.style.backgroundColor = "transparent";
    button.style.opacity = "0.5";
    button.classList.remove("active");
    button.innerHTML = ""; // Clear countdown text
  });

  clearCurrentCountdown();
}

function startCountdown(color) {
  let countdownTime = color === "red" ? 60 : color === "orange" ? 10 : 0;

  if (countdownTime > 0) {
    countdownTimer = setInterval(() => {
      countdownTime--;
      updateButtonText(color, countdownTime);

      if (countdownTime <= 0) {
        clearCurrentCountdown();
        if (color === "red") {
          clickLight("orange");
        } else if (color === "orange") {
          clickLight("green");
        }
      }
    }, 1000);
  }
}

function updateButtonText(color, countdownTime) {
  const button = document.getElementById(`${color}-light`);
  button.innerHTML = countdownTime > 0 ? `<span>${countdownTime}s</span>` : "";
}

function clearCurrentCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  const buttons = document.querySelectorAll(".light-btn");
  buttons.forEach((button) => {
    button.innerHTML = "";
  });
}
