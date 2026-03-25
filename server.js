const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8800;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/", (req, res) => {
    const number1 = parseFloat(req.body.number1);
    const operation = req.body.operation;
    const number2 = parseFloat(req.body.number2);

    let result;

    if (isNaN(number1) || isNaN(number2)) {
        return res.redirect(`/result.html?result=${encodeURIComponent("Invalid input!")}`);
    }

    switch (operation) {
        case "add":
            result = number1 + number2;
            break;

        case "subtract":
            result = number1 - number2;
            break;

        case "multiply":
            result = number1 * number2;
            break;

        case "divide":
            if (number2 === 0) {
                return res.redirect(`/result.html?result=${encodeURIComponent("Cannot divide by zero!")}`);
            }
            result = number1 / number2;
            break;

        default:
            result = "Invalid operation!";
    }

    const expression = `${number1} ${getSymbol(operation)} ${number2} = ${result}`;

    res.redirect(`/result.html?result=${encodeURIComponent(expression)}`);
});

function getSymbol(op) {
    switch (op) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "*";
        case "divide": return "/";
        default: return "?";
    }
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});