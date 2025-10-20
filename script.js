let display = document.getElementById('display');
const maxLength = 12;

function appendValue(value) {
  let current = display.innerText;

  // Clear "Error" or "Infinity" on next input
  if (current === "Error" || current === "Infinity") {
    current = "0";
    display.innerText = current;
  }

  // Limit total length
  if (current.length >= maxLength && !['+', '-', '*', '/', '%'].includes(value)) return;

  // Prevent starting with operator (except minus)
  if (current === "0" && ['+', '*', '/', '%'].includes(value)) return;

  // Prevent multiple leading zeros
  if (current === "0" && value === "0") return;

  // Replace "0" with number unless it's a decimal or operator
  if (current === "0" && !['.', '+', '-', '*', '/', '%'].includes(value)) {
    display.innerText = value;
    return;
  }

  // Prevent two operators in a row
  const lastChar = current.slice(-1);
  const operators = ['+', '-', '*', '/', '%'];
  if (operators.includes(lastChar) && operators.includes(value)) {
    display.innerText = current.slice(0, -1) + value;
    return;
  }

  // Prevent multiple decimals in a number segment
  if (value === '.') {
    const parts = current.split(/[\+\-\*\/]/);
    if (parts[parts.length - 1].includes('.')) return;
  }

  display.innerText += value;
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  let current = display.innerText;
  if (current === "Error" || current === "Infinity") {
    display.innerText = "0";
    return;
  }

  if (current.length <= 1) {
    display.innerText = "0";
  } else {
    display.innerText = current.slice(0, -1);
  }
}

function calculate() {
  try {
    let result = eval(display.innerText);

    // Check for divide by zero or undefined result
    if (!isFinite(result)) {
      display.innerText = "Error";
      return;
    }

    result = parseFloat(result.toPrecision(12)); // Limit to 12 significant digits

    // Handle result overflow
    if (result.toString().length > maxLength) {
      result = result.toExponential(6);
    }

    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}
