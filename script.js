"use strict";

const display = document.querySelector(".display");
const getDisplayEquation = document.querySelector(".displayEquation");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const sign = document.querySelector(".sign");
let total = 0,
  operator,
  inputNumber = "",
 localTotal = 0,
 equation = [],
 index = null,
 signCheck = true,
 inputCheck = true;

function displayTotal(content) {
  display.textContent = content;
}

function displayEquation(content) {
  getDisplayEquation.textContent = equation.join("");
}

input.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    //Check for iteration and increment index
    if (inputCheck){
        inputCheck = false;
        index = index !=null ? ++index : 0;
        signCheck = true;
    }
    //Get user input
    inputNumber += e.target.textContent;
    //Store input in expression array
    equation[index] = inputNumber;
    //Display Expression
    displayEquation(equation);
    compute(operator);
  }
});

sign.addEventListener("click", (e) => {
  if (e.target.classList.contains("operation")) {
    //Check for iteration and increment index
    if (signCheck){
        signCheck = false;
        index = index != null ? ++index : 0;
        console.log(index)
        inputCheck = true;
        inputNumber = '';
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

function compute(operator) {

  switch (operator) {
    case "+":
      localTotal = add(total, +inputNumber);
      displayTotal(localTotal);
      break;
    case "-":
      localTotal = substract(total, +inputNumber);
      displayTotal(localTotal);
      break;
    case "/":
      localTotal = multiple(total, +inputNumber);
      displayTotal(localTotal);
      break;
    case "*":
      localTotal = divide(total, +inputNumber);
      displayTotal(localTotal);
      break;
    default:
      localTotal = +inputNumber;
      displayTotal(localTotal);
  }
}

function add(total, input) {
  return total + input;
}

function substract(total, input) {
  if (!total) return input;
  return total - input;
}

function multiple(total, input) {
  return total * input;
}

function divide(total, input) {
  return total / input;
}
