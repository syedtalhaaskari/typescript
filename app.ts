import inquirer from "inquirer";
import chalk from "chalk";

type Answers = {
    num1: number,
    num2: number,
    operator: string
}

type Output = number | string;

const getInputs: () => Promise<Answers> = async () => {
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
}

const getOutput = (answers: Answers): Output => {
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
}

let answers: Answers = await getInputs();

let output: Output = getOutput(answers);

if (typeof output === "number") {
    console.log(chalk.bgGreenBright.whiteBright(`${answers.num1} ${answers.operator} ${answers.num2} = ${output}`));
}
else {
    console.log(chalk.bgRedBright.whiteBright(`Invalid Input`));
}