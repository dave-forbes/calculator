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
    return Math.round(add(num1, num2) * 1000000) / 1000000;
  } else if (operator == "-") {
    return Math.round(subtract(num1, num2) * 1000000) / 1000000;
  } else if (operator == "*") {
    return Math.round(multiply(num1, num2) * 1000000) / 1000000;
  } else if (operator == "/" && num2 !== 0) {
    return Math.round(divide(num1, num2) * 1000000) / 1000000;
  } else if (operator == "%") {
    return percentage(num1, num2);
  }
}

function findOperatorIndex(string) {
  if (string[0] == "-") {
    return string.slice(1).search(/[^0-9^.]/g) + 1;
  } else {
    return string.search(/[^0-9^.]/g);
  }
}

function evaluateString(string) {
  string = string.replace("÷", "/");
  string = string.replace("x", "*");
  const operatorIndex = findOperatorIndex(string);
  const operator = string[operatorIndex];
  const num1 = parseFloat(string.slice(0, operatorIndex));
  const num2 = parseFloat(string.slice(operatorIndex + 1, string.length));
  return num1 && num2 ? operate(num1, num2, operator) : "";
}

let displayString = "";
let calcString = "";
let evalString = "";
let calcMemory = "";
const displayInput = document.querySelector("#display-input");
const displayEval = document.querySelector("#display-eval");
const errorDisplay = document.querySelector("#error");

function backSpace() {
  calcString = calcString.slice(0, calcString.length - 1);
  displayString = displayString.slice(0, displayString.length - 1);
  if (findOperatorIndex(calcString) === -1) calcString = displayString;
  evalString = evaluateString(calcString);
  if (evalString) {
    displayEval.textContent = evalString.toString();
  } else {
    evalString = "";
    displayEval.textContent = "";
  }
  displayInput.textContent = displayString;
}

function equals() {
  displayInput.textContent = evalString;
  displayString = evalString;
  calcString = evalString;
  displayEval.textContent = "";
}

function clear() {
  displayInput.textContent = "";
  displayEval.textContent = "";
  errorDisplay.textContent = "";
  displayString = "";
  calcString = "";
  evalString = "";
}

function addToStrings(value, operator) {
  if (operator && evalString !== "") {
    calcString = evalString + value;
  } else {
    calcString += value;
  }
  displayString = displayString + value;
  displayString = displayString.replace("/", "÷");
  displayString = displayString.replace("*", "x");
  displayInput.textContent = displayString;
  evalString = evaluateString(calcString);
  if (evalString) {
    evalString = evalString.toString();
    displayEval.textContent = evalString;
  } else {
    evalString = "";
  }
}

const calcMemoryDisplay = document.querySelector("#calculator-memory");

function addToMemory() {
  if (calcString === "") {
    return;
  } else if (calcMemory !== "") {
    calcMemory = parseFloat(calcString) + parseFloat(calcMemory);
    calcMemory.toString();
  } else {
    calcMemory = calcString;
  }
  calcMemoryDisplay.textContent = `M = ${calcMemory}`;
}

function subtractFromMemory() {
  if (calcString === "") {
    return;
  } else if (calcMemory !== "") {
    calcMemory = parseFloat(calcMemory) - parseFloat(calcString);
    calcMemory.toString();
  } else {
    calcMemory = calcString;
  }
  calcMemoryDisplay.textContent = `M = ${calcMemory}`;
}

function recallMemory() {
  addToStrings(calcMemory);
}

function clearMemory() {
  calcMemory = "";
  calcMemoryDisplay.textContent = "";
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
  if (e.key === "Enter" && e.srcElement === document.activeElement) return;
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

function checkForErrors() {
  let error = false;
  if (displayString.length > 14 || evalString.length > 50) {
    clear();
    errorDisplay.textContent = "Error, too many digits";
    error = true;
  } else if (calcString.match(/(\/0)/g)) {
    clear();
    errorDisplay.textContent = "Error, can't divide by 0";
    error = true;
  } else if (displayString.match(/(\.\.)/)) {
    clear();
    errorDisplay.textContent = "Error, two decimal points";
    error = true;
  } else if (displayString.match(/([x+-/*%÷][x+/*%÷])/)) {
    clear();
    errorDisplay.textContent = "Error, two operators";
    error = true;
  } else if (
    findOperatorIndex(displayString) === -1 &&
    displayString.match(/(\.\w+)\./)
  ) {
    clear();
    errorDisplay.textContent = "Error, two decimals";
    error = true;
  } else if (displayString.match(/(\.\w+){2}\./)) {
    clear();
    errorDisplay.textContent = "Error, two decimals";
    error = true;
  }

  function toggleButtonsDisabled() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(
      (button) => (button.disabled = button.disabled === true ? false : true)
    );
    keysDisabled = keysDisabled === true ? false : true;
  }

  if (error) {
    displayInput.textContent = "";
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
//   console.log({ calcString, displayString, evalString });
// });
// window.addEventListener("keydown", () => {
//   console.log({ calcString, displayString, evalString });
// });
