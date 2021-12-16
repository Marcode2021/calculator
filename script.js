const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

const sendNumberValue = function (numb) {
  // If current display value is 0, replace it, if not add number
  const displayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent =
    displayValue === "0"
      ? (calculatorDisplay.textContent = numb)
      : displayValue + numb;
};

const addDecimal = function () {
  // If no decimal, add one
  if (calculatorDisplay.textContent.includes(".")) return;
  calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
};

// Clear input field
const clearInputField = function () {
  calculatorDisplay.textContent = "0";
};

//////////////////////////////////////////////////////////////
// Event listeners
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

clearBtn.addEventListener("click", clearInputField);
