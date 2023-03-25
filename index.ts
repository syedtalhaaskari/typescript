#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let points: number = 0;

let tryAgain = async () => {
    let tryAgain = await inquirer.prompt([{
        name: "tryAgain",
        type: "input",
        message: "Do you want to try again (Y/N): ",
        default: "Y"
    }])
    return tryAgain.tryAgain
}

let getInput = async () => {
    console.clear();

    console.log(chalk.green("Guess number from 1 to 5"));
    console.log(points >= 0 ? chalk.green(`Score: ${points}`) : chalk.red(`Score: ${points}`));
    let guess = await inquirer.prompt([{
        name: "guess",
        type: "number",
        message: "Enter you guess: ",
    }])
    return guess.guess;
}

let runGame = async () => {
    let randNum: number = Math.ceil(Math.random() * 5);
    let guess = await getInput()
    if (guess === randNum) {
        console.log(chalk.green("Hurray!!!"));
        points++;
    } else {
        console.log(chalk.red(`Try Again ${randNum} :(`));
        points--;
    }
    let runAgain = await tryAgain();
    console.log(runAgain);

    runAgain.toLowerCase() === "y" ? runGame() : showResult();
}

runGame();

let showResult = async () => {
    console.clear();
    let displayText;
    if (points >= 0) {
        displayText = chalk.bgGreenBright.whiteBright(`Hurray!!! You Got ${points} Point(s)`);
    } else {
        displayText = chalk.bgRedBright.whiteBright(`Better Luck Next Time! You Got ${points} Point(s)`);
    }
    console.log(displayText);
    points = 0;
    let runAgain: any = await tryAgain();
    runAgain.toLowerCase() === "y" ? runGame() : console.log(chalk.bgYellowBright.whiteBright(`See you next time!`));
}