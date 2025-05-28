  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  let expression = "";

  const functions = ['sin', 'cos', 'tan', 'ln', '√'];

  function fixExpression(expr) {
    expr = expr.replace(/(\d|\))(?=π|sin|cos|tan|ln|√)/g, "$1*")
              .replace(/(\d|\))(?=\()/g, "$1*")
              .replace(/π/g, "Math.PI")
              .replace(/√/g, "Math.sqrt")
              .replace(/sin/g, "Math.sin")
              .replace(/cos/g, "Math.cos")
              .replace(/tan/g, "Math.tan")
              .replace(/ln/g, "Math.log")
              .replace(/\^/g, "**")
              .replace(/(\d+)(!)/g, (fullExper, n, mark) => !Number.isInteger(n) ? factorial(Number(n)) : "");

    let open = (expr.match(/\(/g) || []).length;
    let close = (expr.match(/\)/g) || []).length;
    while (close < open) {
      expr += ")";
      close++;
    }

    return expr;
  }

  function factorial(n) {
    if (n < 0) return "Error";
    return n <= 1 ? 1 : n * factorial(n - 1);
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      let val = btn.textContent;

      if (val === "=") {
        const safeExpr = fixExpression(expression);
        try {
          expression = eval(safeExpr).toString();
        } catch {
          expression = "Error";
        }
      } else if (val === "AC") {
        expression = "";
      } else if (val === "DL") {
        expression = expression.slice(0, -1);
      } else if (functions.includes(val)) {
        expression += val + "(";
      } else {
        expression += val;
      }

      display.textContent = expression || "0";
    });
  });