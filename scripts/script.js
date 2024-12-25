const container = document.querySelector(".container");
const display = document.getElementById("display");
const historyList = document.getElementById("history");
const memoryList = document.getElementById("memory");

let memory = 0;
let history = [];
let string = "";

container.addEventListener("click", (e) => {
  const button = e.target;

  const value = button.value;

  if (value === "C") {
    display.value = "0";
  } else if (value === "BACK") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    let result = display.value;
    if (result == "") {
      return;
    }
    if (result.includes("ln")) {
      if (result.includes("ln(")) {
        const number = parseFloat(
          result.replace(/ln\(([^)]+)\)/g, (match, p1) => {
            return Math.log(parseFloat(p1));
          })
        );
        display.value = number;
        return;
      }
    }

    if (result.includes("log")) {
      const number = parseFloat(
        result.replace(/log\(([^)]+)\)/g, (match, p1) => {
          return Math.log10(parseFloat(p1));
        })
      );
      display.value = number;
      return;
    }

    if (result.includes("sin")) {
      const number = parseFloat(
        result.replace(/sin\(([^)]+)\)/g, (match, p1) => {
          return Math.sin(p1);
        })
      );
      display.value = number;
      return;
    }

    if (result.includes("cos")) {
      const number = parseFloat(
        result.replace(/cos\(([^)]+)\)/g, (match, p1) => {
          return Math.cos(p1);
        })
      );
      display.value = number;
      return;
    }

    if (result.includes("tan")) {
      const number = parseFloat(
        result.replace(/tan\(([^)]+)\)/g, (match, p1) => {
          return Math.tan(p1);
        })
      );
      display.value = number;
      return;
    }

    if (result.includes("!")) {
      const number = parseInt(result.replace("!", ""));
      display.value = factorial(number);
      return;
    }

    if (result.includes("2√")) {
      display.value = Math.sqrt(parseFloat(result.replace("2√", "")));
      return;
    }

    if (result.includes("^")) {
      const [base, exponent] = result.split("^");
      display.value = exponentiate(parseFloat(base), parseFloat(exponent));
      return;
    }

    try {
      let evaluatedResult = eval(result);
      display.value = evaluatedResult;
      history.push(`${result} = ${evaluatedResult}`);
      updateHistory();
    } catch (error) {
      display.value = "Error";
    }
  } else if (value === "Pi") {
    display.value =
      display.value === "" ? Math.PI : parseFloat(display.value) * Math.PI;
  } else if (value === "e") {
    display.value =
      display.value === "" ? Math.E : parseFloat(display.value) * Math.E;
  } else if (value === "n!") {
    display.value += "!";
  } else if (value === "square") {
    display.value = Math.pow(parseFloat(display.value), 2);
  } else if (value === "log") {
    display.value += "log(";
  } else if (value === "ln") {
    display.value += "ln(";
  } else if (value === "sin") {
    display.value += "sin(";
  } else if (value === "cos") {
    display.value += "cos(";
  } else if (value === "tan") {
    display.value += "tan(";
  } else if (value === "sec") {
    display.value += "sec(";
  } else if (value === "csc") {
    display.value += "csc(";
  } else if (value === "cot") {
    display.value += "cot(";
  } else if (value === "Trigonometry") {
    display.value += "";
  } else if (value === "tenpower") {
    display.value += "10^";
  } else if (value === "Function") {
    display.value += "";
  } else if (value === "M+") {
    if (display.value === "0" || display.value === "") {
      return;
    } else {
      memory += parseFloat(display.value);
    }
  } else if (value === "M-") {
    if (display.value === "0" || display.value === "") {
      return;
    } else {
      memory -= parseFloat(display.value);
    }
  } else if (value === "MC") {
    memory = 0;
  } else if (value === "MS") {
    display.value = "";
  } else if (value === "HC") {
    history = [];
    updateHistory();
  } else {
    if (display.value === "0" || display.value === "") {
      display.value = value;
    } else {
      display.value += value;
    }
  }

  historyList.innerHTML = `History: ${history.join("<br>")}`;
  memoryList.innerText = `Memory: ${memory}`;
});

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

function factorial(n) {
  if (n < 0) {
    return "Error";
  }
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

function exponentiate(base, exponent) {
  return Math.pow(base, exponent);
}
