/* 
* In general the code looks well structured and traffic animation looks cool, there is a small feedback below, please check it.
*/
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

  /*
  * Ternary if is usually preffered when you have to make 2 case comparisson like if/else.
  * It is not wrong to use this way like below, but it is harder to read. On situations like this,
  * prefer to outline comparisons by separating them with () or add the comparisons in the new line, see the alignment
  * of the alertMessage section. For instance:
  *  color === "red" ? "danger" : (color === "orange" ? "warning" : "success");
  * OR you can use the switch case, if you don't want to dive into cycles of if/else-if/else
  */
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
  let countdownTime = 0;
  if (color === "red") {
    countdownTime = 60; // Red light stays for 60 seconds
  } else if (color === "orange") {
    countdownTime = 10; // Orange light stays for 10 seconds
  } else if (color === "green") {
    countdownTime = 30; // Green light stays for 30 seconds
  }

  if (countdownTime > 0) {
    countdownTimer = setInterval(() => {
      countdownTime--;
      updateButtonText(color, countdownTime);

      if (countdownTime <= 0) {
        clearCurrentCountdown();
        if (color === "red") {
          clickLight("orange"); // Change to orange after red
        } else if (color === "orange") {
          clickLight("green"); // Change to green after orange
        } else if (color === "green") {
          clickLight("red"); // Change back to red after green
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
