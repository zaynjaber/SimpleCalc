document.addEventListener("DOMContentLoaded", () => {
  let storedValue = null;
  let lastOperatorEntered = null;

  const display = document.querySelector("#display div");
  display.textContent = "";

  const initialFontSize = parseFloat(window.getComputedStyle(display).fontSize); // Store the initial font size

  function updateFontSize() {
    const parentWidth = display.parentNode.clientWidth;
    let fontSize = parseFloat(window.getComputedStyle(display).fontSize);

    while (display.scrollWidth > parentWidth && fontSize > 10) {
      // Minimum font size threshold
      fontSize -= 1;
      display.style.fontSize = fontSize + "px";
    }
  }

  // Math functions
  function addNums(num1, num2) {
    return num1 + num2;
  }

  function subtractNums(num1, num2) {
    return num1 - num2;
  }

  function multiplyNums(num1, num2) {
    return num1 * num2;
  }

  function divideNums(num1, num2) {
    if (num2 == 0) {
      return "ERROR: DIVIDE BY 0";
    }
    return num1 / num2;
  }

  // Calls a math function for a given operator and set of 2 nums
  function operate(operator, num1, num2) {
    let val;
    switch (operator) {
      case "+":
        val = addNums(num1, num2);
        break;
      case "−":
        val = subtractNums(num1, num2);
        break;
      case "×":
        val = multiplyNums(num1, num2);
        break;
      case "÷":
        val = divideNums(num1, num2);
        break;
    }
    if (val == "ERROR: DIVIDE BY 0") {
      return val;
    }
    return Number.isInteger(val) ? val : val.toFixed(8);
  }

  // Returns a bool to determine whether or not an error is displayed
  function noError() {
    if (display.textContent == "ERROR: DIVIDE BY 0") {
      return false;
    }
    return true;
  }

  // Returns length of the displayed number
  function displayNumLength() {
    return display.textContent.length;
  }

  // Helper functions for the button and keyboard event listeners
  function numPressed(num) {
    console.log("Number pressed: ", num);
    if (noError() && displayNumLength() < 10) {
      display.textContent += num;
    }
    updateFontSize();
    console.log("Display after number pressed: ", display.textContent);
  }

  function operatorPressed(operator) {
    console.log("Operator pressed: ", operator);
    if (noError() && display.textContent !== "") {
      if (storedValue !== null) {
        storedValue = operate(
          lastOperatorEntered,
          +storedValue,
          +display.textContent
        );
        console.log("Stored value after operation: ", storedValue);
      } else {
        storedValue = display.textContent;
        console.log("Stored value set to display content: ", storedValue);
      }
      lastOperatorEntered = operator;
      display.textContent = "";
      display.style.fontSize = initialFontSize + "px"; // Reset font size to initial size when an operator is pressed
    }
    updateFontSize();
    console.log("Display after operator pressed: ", display.textContent);
  }

  function equalPressed() {
    console.log("Equal pressed");
    if (noError()) {
      if (storedValue && lastOperatorEntered) {
        display.textContent = operate(
          lastOperatorEntered,
          +storedValue,
          +display.textContent
        );
        storedValue = null;
        lastOperatorEntered = null;
      }
    }
    updateFontSize();
    console.log("Display after equal pressed: ", display.textContent);
  }

  function decimalPressed() {
    console.log("Decimal pressed");
    if (noError()) {
      if (!display.textContent.includes(".")) {
        display.textContent += ".";
      }
    }
    updateFontSize();
    console.log("Display after decimal pressed: ", display.textContent);
  }

  function percentPressed() {
    console.log("Percent pressed");
    if (noError() && display.textContent !== "") {
      display.textContent = (+display.textContent / 100).toString();
    }
    updateFontSize();
    console.log("Display after percent pressed: ", display.textContent);
  }

  function negativePressed() {
    console.log("Negative pressed");
    if (noError() && display.textContent !== "") {
      display.textContent = (+display.textContent * -1).toString();
    }
    updateFontSize();
    console.log("Display after negative pressed: ", display.textContent);
  }

  function clearPressed() {
    console.log("Clear pressed");
    display.textContent = "";
    storedValue = null;
    lastOperatorEntered = null;
    display.style.fontSize = initialFontSize + "px"; // Reset font size to initial size
    console.log("Display after clear pressed: ", display.textContent);
  }

  function backspacePressed() {
    console.log("Backspace pressed");
    if (noError()) {
      const endIndex = display.textContent.length - 1;
      display.textContent = display.textContent.slice(0, endIndex);
    }
    updateFontSize();
    console.log("Display after backspace pressed: ", display.textContent);
  }

  // Event listener initializers for all buttons
  function initNumButtonEventListeners() {
    const buttons = document.querySelectorAll("button.num");
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        numPressed(button.textContent);
      })
    );
  }

  function initOperatorButtonEventListeners() {
    const buttons = document.querySelectorAll("button.operator");
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        operatorPressed(button.textContent);
      })
    );
  }

  function initEqualsButtonEventListener() {
    const button = document.querySelector("button.equals");
    button.addEventListener("click", equalPressed);
  }

  function initDecimalButtonEventListener() {
    const button = document.querySelector("button.decimal");
    button.addEventListener("click", decimalPressed);
  }

  function initPercentButtonEventListener() {
    const button = document.querySelector("button.percent");
    button.addEventListener("click", percentPressed);
  }

  function initNegativeButtonEventListener() {
    const button = document.querySelector("button.negative");
    button.addEventListener("click", negativePressed);
  }

  function initClearButtonEventListener() {
    const button = document.querySelector("button.clear");
    button.addEventListener("click", clearPressed);
  }

  function initBackspaceButtonEventListener() {
    const button = document.querySelector("button.backspace");
    button.addEventListener("click", backspacePressed);
  }

  // Calls all button event initializers for clarity
  function initButtonEventListeners() {
    initNumButtonEventListeners();
    initOperatorButtonEventListeners();
    initEqualsButtonEventListener();
    initDecimalButtonEventListener();
    initPercentButtonEventListener();
    initNegativeButtonEventListener();
    initClearButtonEventListener();
    initBackspaceButtonEventListener();
  }

  // Event listener initializer for all possible keys
  function initKeyboardEventListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "Backspace":
          backspacePressed();
          break;
        case ".":
          decimalPressed();
          break;
        case "c":
          clearPressed();
          break;
        case "Enter":
        case "=":
          equalPressed();
          break;
        case "+":
        case "−":
        case "×":
        case "÷":
          operatorPressed(e.key);
          break;
        case "%":
          percentPressed();
          break;
        case "n": // Assume 'n' for toggling negative sign
          negativePressed();
          break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          numPressed(e.key);
          break;
      }
    });
  }

  initButtonEventListeners();
  initKeyboardEventListeners();
});
