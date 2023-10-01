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
  battery;

battery = [
  `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/19CC97/full-battery.png"
  alt="full-battery" />`,
  `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FFC000/low-battery.png" alt="low-battery"/>`,
  `<img width="64" height="64" src="https://img.icons8.com/glyph-neue/64/FF0000/empty-battery.png" alt="empty-battery"/>`,
  ,
];
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

function updateBatteryIcon() {
  batteryIcon.innerHTML = battery[0];
  displayPopNotification("Battery: 100%");
  for (let i = 1; i <= 3; i++) {
    if (i != 3) {
      setTimeout(() => {
        batteryIcon.innerHTML = battery[i];
       displayPopNotification(`Battery: ${100/(i ** i + 1)}%`);
      }, 5 * i * 1000);
    } else {
      setTimeout(() => {
        section.classList.add("hidden");
        container.classList.add("container-hidden");
        batteryDead.classList.remove("battery-hidden");
        setTimeout(
          () => {batteryDead.classList.add("battery-hidden")
          section.classList.add("dead")
        },
          2 * 1000
        );
      }, 5 * i * 1000);
    }
  }
}

function displayPopNotification(message){
  popNotification.textContent = message;
  popNotification.classList.remove("pop-hidden");
  setTimeout(() => popNotification.classList.add("pop-hidden"), 2 * 1000);
}

updateBatteryIcon();
