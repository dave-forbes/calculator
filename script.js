function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function percentage(num1, num2) {
  return multiply(num2, num1 / 100);
}

function operate(num1, num2, operator) {
  if (operator == "+") {
    return Math.round(add(num1, num2) * 1000) / 1000;
  } else if (operator == "-") {
    return Math.round(subtract(num1, num2) * 1000) / 1000;
  } else if (operator == "*") {
    return Math.round(multiply(num1, num2) * 1000) / 1000;
  } else if (operator == "/" && num2 !== 0) {
    return Math.round(divide(num1, num2) * 1000) / 1000;
  } else if (operator == "%") {
    return percentage(num1, num2);
  }
}

let displayString = "";
let calculatorString = "";
let result = "";
let calculatorMemory = "";
const displayInput = document.querySelector("#display-input");
const displayEval = document.querySelector("#display-eval");
const errorDisplay = document.querySelector("#error");

function backSpace() {
  calculatorString = calculatorString.slice(0, calculatorString.length - 1);
  displayString = displayString.slice(0, displayString.length - 1);
  result = evaluateCalculatorString();
  if (result) displayEval.textContent = result.toString();
  displayInput.textContent = displayString;
}

function equals() {
  if (result !== "") {
    displayInput.textContent = result;
    displayString = result;
    calculatorString = result;
  }
  displayEval.textContent = "";
}

function clear() {
  displayInput.textContent = "";
  displayEval.textContent = "";
  errorDisplay.textContent = "";
  displayString = "";
  calculatorString = "";
  result = "";
}

function addToStrings(value, operator) {
  if (operator) {
    if (result !== "") {
      calculatorString = result + value;
    } else {
      calculatorString += value;
    }
  } else {
    calculatorString += value;
  }
  displayString = displayString + value;
  displayString = displayString.replace("/", "÷");
  displayString = displayString.replace("*", "x");
  displayInput.textContent = displayString;
  if (evaluateCalculatorString()) {
    result = evaluateCalculatorString().toString();
    displayEval.textContent = result;
  } else {
    result = "";
  }
}

function evaluateCalculatorString() {
  if (calculatorString[0] == "-") {
    operatorIndex = calculatorString.slice(1).search(/[^0-9^.]/g) + 1;
  } else {
    operatorIndex = calculatorString.search(/[^0-9^.]/g);
  }
  const num1Str = calculatorString.slice(0, operatorIndex);
  const num2Str = calculatorString.slice(
    operatorIndex + 1,
    calculatorString.length + 1
  );
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);
  const operator = calculatorString[operatorIndex];
  if (num1 && num2) {
    return operate(num1, num2, operator);
  } else {
    return false;
  }
}

const calculatorMemoryDisplay = document.querySelector("#calculator-memory");

function addToMemory() {
  if (calculatorString === "") {
    return;
  } else if (calculatorMemory !== "") {
    calculatorMemory =
      parseFloat(calculatorString) + parseFloat(calculatorMemory);
    calculatorMemory.toString();
  } else {
    calculatorMemory = calculatorString;
  }
  calculatorMemoryDisplay.textContent = `M = ${calculatorMemory}`;
}

function subtractFromMemory() {
  if (calculatorString === "") {
    return;
  } else if (calculatorMemory !== "") {
    calculatorMemory =
      parseFloat(calculatorMemory) - parseFloat(calculatorString);
    calculatorMemory.toString();
  } else {
    calculatorMemory = calculatorString;
  }
  calculatorMemoryDisplay.textContent = `M = ${calculatorMemory}`;
}

function recallMemory() {
  console.log(calculatorMemory);
  addToStrings(calculatorMemory.toString());
}

function clearMemory() {
  calculatorMemory = "";
  calculatorMemoryDisplay.textContent = "";
}

function handleButtonClick(e) {
  const node = e.target;
  if (node.classList.contains("number")) {
    const value = node.textContent;
    addToStrings(value);
  } else if (
    node.classList.contains("operator") ||
    node.parentElement.classList.contains("operator")
  ) {
    const value = node.dataset.value;
    addToStrings(value, "operator");
  } else if (
    node.dataset.value === "delete" ||
    node.parentElement.dataset.value === "delete"
  ) {
    backSpace();
  } else if (
    node.dataset.value === "=" ||
    node.parentElement.dataset.value === "="
  ) {
    equals();
  } else if (node.dataset.value === "clear") {
    clear();
  } else if (node.id === "m+") {
    addToMemory();
  } else if (node.id === "mr") {
    recallMemory();
  } else if (node.id === "m-") {
    subtractFromMemory();
  } else if (node.id == "mc") {
    clearMemory();
  }
}

let keysDisabled = false;

function handleKeyDown(e) {
  if (keysDisabled === true) return;
  if (parseInt(e.key) || e.key === "0") {
    addToStrings(e.key);
    keyDownDisplay(e.key);
  } else if (
    e.key === "/" ||
    e.key === "*" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "%"
  ) {
    addToStrings(e.key, "operator");
    keyDownDisplay(e.key);
  } else if (e.key === "x") {
    addToStrings("*", "operator");
    keyDownDisplay("*");
  } else if (e.key === "÷") {
    addToStrings("/", "operator");
    keyDownDisplay("/");
  } else if (e.key === "=" || e.key === "Enter") {
    equals();
    keyDownDisplay("=");
  } else if (e.key === "Backspace") {
    backSpace();
    keyDownDisplay("delete");
  } else if (e.key === ".") {
    addToStrings(".");
    keyDownDisplay(e.key);
  } else if (e.key === "c" || e.key === "C") {
    clear();
    keyDownDisplay("clear");
  }
}

function keyDownDisplay(key) {
  const allNumbers = document.querySelectorAll(".number");
  allNumbers.forEach((numbers) => {
    if (numbers.textContent === key) {
      numbers.classList.toggle("hover");
      setTimeout(() => numbers.classList.toggle("hover"), 200);
    }
  });

  const allOperators = document.querySelectorAll(".operator");
  allOperators.forEach((operator) => {
    if (operator.dataset.value === key) {
      operator.classList.toggle("hover");
      setTimeout(() => operator.classList.toggle("hover"), 200);
    }
  });
  const equals = document.querySelector("#equals");
  if (key === equals.dataset.value) {
    equals.style.cssText = "background-color: rgb(189, 189, 189);";
    setTimeout(() => (equals.style.cssText = "background-color: blue"), 200);
  }
  const clear = document.querySelector("#clear");
  if (key === clear.dataset.value) {
    clear.classList.toggle("hover");
    setTimeout(() => clear.classList.toggle("hover"), 200);
  }
  const deleteKey = document.querySelector("#delete");
  if (key === deleteKey.dataset.value) {
    deleteKey.classList.toggle("hover");
    setTimeout(() => deleteKey.classList.toggle("hover"), 200);
  }
}

function toggleButtonsDisabled() {
  const allButtons = document.querySelectorAll("button");
  allButtons.forEach(
    (button) => (button.disabled = button.disabled === true ? false : true)
  );
  keysDisabled = keysDisabled === true ? false : true;
  console.log(keysDisabled);
}

function checkForErrors() {
  if (displayString.length > 11) {
    clear();
    displayInput.textContent = "";
    errorDisplay.textContent = "Error, too many digits";
    toggleButtonsDisabled();
    setTimeout(clear, 2000);
    setTimeout(toggleButtonsDisabled, 2200);
  } else if (calculatorString.match(/(\/0)/g)) {
    clear();
    displayInput.textContent = "";
    errorDisplay.textContent = "Error, can't divide by 0";
    toggleButtonsDisabled();
    setTimeout(clear, 2000);
    setTimeout(toggleButtonsDisabled, 2200);
  } else if (displayString.match(/(\.\.)/)) {
    clear();
    displayInput.textContent = "";
    errorDisplay.textContent = "Error, two decimal points";
    toggleButtonsDisabled();
    setTimeout(clear, 2000);
    setTimeout(toggleButtonsDisabled, 2200);
  } else if (displayString.match(/([x+-/*%÷][x+-/*%÷])/)) {
    clear();
    displayInput.textContent = "";
    errorDisplay.textContent = "Error, two operators";
    toggleButtonsDisabled();
    setTimeout(clear, 2000);
    setTimeout(toggleButtonsDisabled, 2200);
  }
}

document.addEventListener("click", handleButtonClick);
window.addEventListener("keydown", handleKeyDown);
document.addEventListener("click", checkForErrors);
window.addEventListener("keydown", checkForErrors);

// document.addEventListener("click", () => {
//   console.log({ calculatorString, displayString, result });
// });
// window.addEventListener("keydown", () => {
//   console.log({ calculatorString, displayString, result });
// });
