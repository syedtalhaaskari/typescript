#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const getInputs = async () => {
    let answers = await inquirer.prompt([
        {
            name: "num1",
            type: "number",
            message: "Enter num1: "
        },
        {
            name: "num2",
            type: "number",
            message: "Enter num2: "
        },
        {
            name: "operator",
            type: "input",
            message: "Enter operation +, -, /, *, %:"
        },
    ]);
    return answers;
};
const getOutput = (answers) => {
    const { num1, num2, operator } = answers;
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            return "Invalid";
    }
};
let answers = await getInputs();
let output = getOutput(answers);
let display;
if (typeof output === "number") {
    display = chalk.whiteBright.bgGreenBright(`${answers.num1} ${answers.operator} ${answers.num2} = ${output}`);
}
else {
    display = chalk.whiteBright.bgRedBright(`Invalid Input`);
}
console.log(display);
