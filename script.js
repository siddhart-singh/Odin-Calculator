"use strict";

const display = document.querySelector(".display");
const getDisplayEquation = document.querySelector(".displayEquation");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const sign = document.querySelector(".sign");
const deleteBtn = document.querySelector(".delete");
const clearAllBtn = document.querySelector(".clearAll");
const headerTime = document.querySelector(".time");
let total,
  operator,
  inputNumber,
  localTotal,
  equation,
  index,
  signCheck,
  inputCheck,
  placeValue;

  setInterval(updateTime(), 60*1000);

function init(){
    total = 0;
    operator = null;
  inputNumber = "";
  localTotal = 0;
  equation = [];
  index = null;
  signCheck = true;
  inputCheck = true;
  placeValue = 0;

  
}
init();

clearAllBtn.addEventListener("click", () =>{
    init();
  displayEquation(equation);
  displayTotal(total);
})

function displayTotal(content) {
    if(Number.isInteger(+content)) display.textContent = content;
    else display.textContent = +content.toFixed(4);
    
}

function displayEquation(content) {
  getDisplayEquation.textContent = equation.join("");
}

input.addEventListener("click", (e) => {
  if (e.target.classList.contains("num")) {
    //Check for iteration and increment index
    if (inputCheck) {
      inputCheck = false;
      index = index != null ? ++index : 0;
      signCheck = true;
    }
    //Get user input
    inputNumber = +e.target.textContent * 10 ** placeValue;
    placeValue++;
    //Store input in expression array
    equation[index] =
      equation[index] == undefined
        ? inputNumber
        : +equation[index] + inputNumber;
    //Display Expression
    displayEquation(equation);
    compute(operator);
    total = localTotal;
  }
});

sign.addEventListener("click", (e) => {
  if (e.target.classList.contains("operation")) {
    //Check for iteration and increment index
    if (signCheck) {
      signCheck = false;
      index = index != null ? ++index : 0;
      console.log(index);
      inputCheck = true;
      inputNumber = "";
      total = localTotal;
      placeValue = 0;
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
    inputCheck = false;
    signCheck = true;
    let finalResult = total;
    init();
    console.log(total, finalResult);
    equation.push(finalResult);
    // displayTotal(finalResult);
    displayEquation(equation)
    localTotal = finalResult;
    index = 0;
    placeValue = finalResult.toString().length;
})

deleteBtn.addEventListener("click", (e) => {
  pressAnimation(e);
  //Get User input
  //Check if input type
  if (index >= 0) {
    //Remove input
    if (!+equation[index]) {
      equation[index] = equation[index].slice(0, -1);
    } else {
        let popped = equation[index];
        equation[index] = equation[index].toString().slice(0, -1);
        placeValue = equation[index].toString().length ;
      //Check if input is first index
      let reverseTotalOperation;
      if (equation[index - 1] == "+") reverseTotalOperation = "-";
      else if (equation[index - 1] == "-") reverseTotalOperation = "+";
      else if (equation[index - 1] == "*") reverseTotalOperation = "/";
      else if (equation[index - 1] == "/") reverseTotalOperation = "*";
      else reverseTotalOperation = "-";

      console.log(reverseTotalOperation);
      //Computer correct total
      inputNumber = +popped - +equation[index];
      compute(reverseTotalOperation);
      //Update total if valid
      total = localTotal;
    }
    inputNumber = +equation[index];
    //Update equation
    if (equation[index] == "") {
      equation.pop();
      //Decrement index
      index--;

      //Prevent multiple operator inputs
      if(!+equation[index]){
        signCheck = false;
        inputCheck = true;
      }else{
        inputCheck = false;
        signCheck = true;
      }
    }
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
      localTotal = divide(total, +inputNumber);
      displayTotal(localTotal);
      break;
    case "*":
      localTotal = multiple(total, +inputNumber);
      displayTotal(localTotal);
      break;
    default:
      localTotal += +inputNumber;
      displayTotal(localTotal);
  }
}

function add(total, input) {
  return total + input;
}

function substract(total, input) {
  return total - input;
}

function multiple(total, input) {
  return total * input;
}

function divide(total, input) {
  return total / input;
}

function updateTime(){
  const date = new Date();
  headerTime.textContent = `${(date.getUTCHours()).toString().padStart(2,"0")}:${date.getUTCMinutes().toString().padStart(2,"0")}`
}

window.addEventListener("mousedown", (e) => {
  if(e.target.nodeName == "BUTTON"){
    e.target.classList.add("clicked");
  }
})

window.addEventListener("mouseup", (e) => {
  if(e.target.nodeName == "BUTTON"){
    e.target.classList.remove("clicked");
  }
})