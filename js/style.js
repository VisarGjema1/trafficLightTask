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
    button.innerHTML = "";
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

  let alertType, alertMessage;
  switch (color) {
    case "red":
      alertType = "danger";
      alertMessage = "STOP";
      break;
    case "orange":
      alertType = "warning";
      alertMessage = "GET READY";
      break;
    case "green":
      alertType = "success";
      alertMessage = "GO";
      break;
    default:
      alertType = "";
      alertMessage = "";
  }

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
    button.innerHTML = "";
  });

  clearCurrentCountdown();
}

function startCountdown(color) {
  const countdownTimes = {
    red: 60,
    orange: 10,
    green: 30,
  };

  let countdownTime = countdownTimes[color] || 0;

  if (countdownTime > 0) {
    countdownTimer = setInterval(() => {
      countdownTime--;
      updateButtonText(color, countdownTime);

      if (countdownTime <= 0) {
        clearCurrentCountdown();
        const nextLight = {
          red: "orange",
          orange: "green",
          green: "red",
        };
        clickLight(nextLight[color]);
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
