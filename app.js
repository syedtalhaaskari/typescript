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
if (typeof output === "number") {
    console.log(chalk.bgGreenBright.whiteBright(`${answers.num1} ${answers.operator} ${answers.num2} = ${output}`));
}
else {
    console.log(chalk.bgRedBright.whiteBright(`Invalid Input`));
}
