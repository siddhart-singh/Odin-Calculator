"use strict";

const section = document.querySelector("section");
const container = document.querySelector(".container");
const display = document.querySelector(".display");
const getDisplayEquation = document.querySelector(".displayEquation");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const sign = document.querySelector(".sign");
const deleteBtn = document.querySelector(".delete");
const clearAllBtn = document.querySelector(".clearAll");
const headerTime = document.querySelector(".time");
const batteryIcon = document.querySelector(".battery-icon");
const batteryDead = document.querySelector(".battery-dead");
const popNotification = document.querySelector(".pop-notification");
const charger = document.querySelector(".charger");
const chargerBtn = document.querySelector(".charger-switch");
let total,
  operator,
  operand,
  inputNumber,
  localTotal,
  equation,
  index,
  signCheck,
  inputCheck,
  placeValue,
  resultCheck,
  battery,
  chargerSwitch,
  chargerStatus;

setInterval(updateTime(), 60 * 1000);

function init() {
  total = 0;
  operator = null;
  inputNumber = "";
  localTotal = 0;
  equation = [];
  index = null;
  signCheck = true;
  inputCheck = true;
  resultCheck = false;
  placeValue = 0;
  battery = [
    `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/19CC97/full-battery.png"
    alt="full-battery" />`,
    `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FFC000/low-battery.png" alt="low-battery"/>`,
    `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FF0000/empty-battery.png" alt="empty-battery"/>`,
    ,
  ];
  chargerSwitch = [
    `<img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/switch-off.png" alt="switch-off"/>`,
    `<img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/switch-on.png" alt="switch-on"/>`,
  ];
  section.classList.add("dead");
  container.classList.add("container-hidden");
  chargerStatus = false;
}
init();

clearAllBtn.addEventListener("click", (e) => {
  init();
  displayEquation(equation);
  displayTotal(total);
});

function displayTotal(content) {
  if (Number.isInteger(+content)) display.textContent = `=${content}`;
  else display.textContent = `=${+content.toFixed(4)}`;
}

function displayEquation(content) {
  getDisplayEquation.textContent = equation.join("");
}

input.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    //Check for iteration and increment index
    if (resultCheck == true) {
      display.classList.remove("display-result");
    }
    if (inputCheck) {
      inputCheck = false;
      index = index != null ? ++index : 0;
      signCheck = true;
    }
    //Get user input
    inputNumber = e.target.textContent;
    //Store input in expression array
    equation[index] =
      equation[index] == undefined
        ? inputNumber
        : (equation[index] += inputNumber);
    //Display Expression
    displayEquation(equation);
    compute(operator, equation[index]);
    // total = localTotal;
  }
});

sign.addEventListener("click", (e) => {
  if (e.target.classList.contains("operation")) {
    //Check for iteration and increment index
    console.log(resultCheck);
    if (resultCheck == true) {
      console.log(1);
      display.classList.remove("display-result");
      equation[index] = localTotal.toString();
      console.log(equation);
      displayEquation(equation);
      displayTotal(localTotal);
    }
    if (signCheck) {
      signCheck = false;
      index = index != null ? ++index : 0;
      inputCheck = true;
      inputNumber = "";
      total = localTotal;
    }

    //Get user input
    operator = e.target.textContent;
    //Store input in expression array
    equation[index] = operator;
    //Display Expression
    displayEquation(equation);
  }
});

result.addEventListener("click", (e) => {
  e.stopPropagation();
  let finalResult = localTotal;
  init();
  resultCheck = true;
  displayTotal(finalResult);
  displayEquation(equation);
  display.classList.add("display-result");
  localTotal = finalResult;
  index = 0;
  placeValue = finalResult.toString().length;
});

deleteBtn.addEventListener("click", (e) => {
  //Get User input
  //Check if input type
  if (index >= 0) {
    //Remove input
    if (!+equation[index]) {
      equation[index] = equation[index].slice(0, -1);
    } else {
      let popped = equation[index];
      equation[index] = equation[index].toString().slice(0, -1);
      // placeValue = equation[index].toString().length ;
      //Check if input is first index
      let reverseTotalOperation;
      let reverseOperand;
      total = localTotal;
      if (
        equation[index - 1] == "+" ||
        equation[index - 1] == "-" ||
        !equation[index - 1]
      ) {
        reverseTotalOperation = equation[index - 1] == "-" ? "+" : "-";
        reverseOperand = +popped - +equation[index];
      } else if (equation[index - 1] == "*" || equation[index - 1] == "/") {
        reverseTotalOperation = equation[index - 1] == "*" ? "/" : "*";
        reverseOperand = +equation[index]
          ? +popped / +equation[index]
          : +popped;
      }

      compute(reverseTotalOperation, reverseOperand);
      //Computer correct total
      total = localTotal;
      operator = "";
      //Update total if valid
    }
    inputNumber = +equation[index];
    //Update equation
    if (equation[index] == "") {
      equation.pop();
      //Decrement index
      index--;

      //Prevent multiple operator inputs
      if (!+equation[index]) {
        signCheck = false;
        inputCheck = true;
      } else {
        inputCheck = false;
        signCheck = true;
      }
    }
    displayEquation(equation);
  }
});
function compute(operator, operand) {
  switch (operator) {
    case "+":
      localTotal = add(total, +operand);
      displayTotal(localTotal);
      break;
    case "-":
      localTotal = substract(total, +operand);
      console.log(localTotal, operand);
      displayTotal(localTotal);
      break;
    case "/":
      localTotal = divide(total, +operand);
      displayTotal(localTotal);
      break;
    case "*":
      localTotal = multiple(total, +operand);
      displayTotal(localTotal);
      break;
    default:
      localTotal = +equation[index];
      displayTotal(localTotal);
  }
}

function add(total, inputNum) {
  return total + inputNum;
}

function substract(total, inputNum) {
  return total - inputNum;
}

function multiple(total, inputNum) {
  return total * inputNum;
}

function divide(total, inputNum) {
  return total / inputNum;
}

function updateTime() {
  const date = new Date();
  headerTime.textContent = `${date
    .getUTCHours()
    .toString()
    .padStart(2, "0")}:${date.getUTCMinutes().toString().padStart(2, "0")}`;
}

let charging = [];
function updateBatteryIcon() {
  charging[0] = setTimeout(() => {
    section.classList.remove("dead");
    if (!chargerStatus) section.classList.add("hidden");
    charger[1] = setTimeout(() => {
      batteryIcon.innerHTML = battery[0];
      displayPopNotification("Battery: 100%");
      section.classList.remove("hidden");
      container.classList.remove("container-hidden");
      if (!chargerStatus) discharge();
    }, 2000);
  }, 2000);
}

function displayPopNotification(message) {
  popNotification.textContent = message;
  popNotification.classList.remove("pop-hidden");
  setTimeout(() => popNotification.classList.add("pop-hidden"), 2.5 * 1000);
}

let discharging = [];
function discharge() {
  discharging[0] = setTimeout(() => {
    for (let i = 1; i <= 3; i++) {
      if (i != 3) {
        discharging[1] = setTimeout(() => {
          batteryIcon.innerHTML = battery[i];
          displayPopNotification(`Battery: ${100 / (i ** i + 1)}%`);
        }, 5 * i * 1000);
      } else {
        discharging[2] = setTimeout(() => {
          section.classList.add("hidden");
          container.classList.add("container-hidden");
          batteryDead.classList.remove("battery-hidden");
          discharging[3] = setTimeout(() => {
            batteryDead.classList.add("battery-hidden");
            section.classList.add("dead");
            charger.classList.remove("charger-hidden");
          }, 4 * 1000);
        }, 5 * i * 1000);
      }
    }
  }, 0);
}

chargerBtn.addEventListener("click", (e) => {
  if ((chargerBtn.innerHTML = e.target.getAttribute("alt") == "switch-off")) {
    chargerBtn.innerHTML = chargerSwitch[1];
    for (let charger of charging) {
      clearTimeout(charger);
    }
    for (let discharge of discharging) {
      clearTimeout(discharge);
    }
    chargerStatus = true;
    updateBatteryIcon();
  } else {
    for (let charger of charging) {
      clearTimeout(charger);
    }
    for (let discharge of discharging) {
      clearTimeout(discharge);
    }
    chargerBtn.innerHTML = chargerSwitch[0];
    chargerStatus = false;
    discharge();
  }
});

updateBatteryIcon();
