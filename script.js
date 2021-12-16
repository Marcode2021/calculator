const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const sendNumberValue = function (numb) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = numb;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? numb : displayValue + numb;
  }
};

const addDecimal = function () {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (calculatorDisplay.textContent.includes(".")) return;
  calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
};

//  Calculate first and second values depending on operator
const calculate = {
  "/": (firstValue, secondNumber) => firstValue / secondNumber,
  "*": (firstValue, secondNumber) => firstValue * secondNumber,
  "+": (firstValue, secondNumber) => firstValue + secondNumber,
  "-": (firstValue, secondNumber) => firstValue - secondNumber,
  "=": (firstValue, secondNumber) => secondNumber,
};

const useOperator = function (operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
};

// Clear input field
const clearInputField = function () {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
};

//////////////////////////////////////////////////////////////
// Event listeners
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

clearBtn.addEventListener("click", clearInputField);
