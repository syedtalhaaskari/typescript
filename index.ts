#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

type User = {
    id: number;
    pin: number;
    name: string;
    amount: number;
}

let users: User[] = [
    {
        id: 1,
        pin: 1234,
        name: "Admin",
        amount: 100000
    }
];
let currentUser: number;

let getSignInDetails = async (signup?: boolean, tryAgain?: boolean) => {
    console.clear();
    if (signup) {
        console.log(chalk.bgGreenBright("Sign Up Successful!."))
    } if (tryAgain) {
        console.log(chalk.bgRedBright("Invalid PIN/ID! Try Again."))
    }

    let signInDetails = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter Your PIN: "
        },
        {
            name: "name",
            type: "input",
            message: "Enter Your Name: "
        },
    ])
    let ind = users.findIndex(user => user.pin === signInDetails.pin && user.name === signInDetails.name);
    if (ind >= 0) {
        currentUser = ind;
        menu();
    } else {
        getSignInDetails(false, true)
    }
}

let getSignUpDetails = async () => {
    let signUpDetails = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter Your PIN: "
        },
        {
            name: "name",
            type: "input",
            message: "Enter Your Name: "
        },
        {
            name: "amount",
            type: "number",
            message: "Enter Your Deposit Amount: "
        },
    ])
    if (signUpDetails.pin >= 0 && signUpDetails.amount >= 0 && !!signUpDetails.name) {
        users.push({
            id: users.length + 1,
            pin: signUpDetails.pin,
            name: signUpDetails.name,
            amount: signUpDetails.amount
        })
        getSignInDetails(true)
    } else {
        console.log(chalk.bgRedBright("Invalid Details! Try Again."))
        getSignUpDetails()
    }
}

let depositAmount = async () => {
    let depositAmountDetails = await inquirer.prompt([
        {
            name: "amount",
            type: "number",
            message: "Enter Your Deposit Amount: "
        },
    ])
    return depositAmountDetails.amount;
}

let creditAmount = async () => {
    let creditAmountDetails = await inquirer.prompt([
        {
            name: "amount",
            type: "number",
            message: "Enter Your Credit Amount: "
        },
    ])
    return creditAmountDetails.amount;
}

let menu = () => {
    console.clear();
    console.log(chalk.bgWhiteBright.blackBright.bold("          <--- M E N U --->                 "));
    console.log(chalk.bgWhiteBright.blackBright(" 1. Deposit                                 "));
    console.log(chalk.bgWhiteBright.blackBright(" 2. Credit                                  "));
    console.log(chalk.bgWhiteBright.blackBright(" 3. Check Amount                            "));
    console.log(chalk.bgWhiteBright.blackBright(" 4. View Account Details                    "));
    console.log(chalk.bgWhiteBright.blackBright(" 5. SignOut                                 "));
    chooseInputFromMenu();
}

let showCurrentBalance = () => console.log(chalk.whiteBright(`Your Current Amount is ${users[currentUser].amount}`));

let chooseInputFromMenu = async () => {
    let menuInput = await inquirer.prompt([
        {
            name: "choice",
            type: "number",
            message: "Enter Your Choice: "
        },
    ])
    switch (menuInput.choice) {
        case 1:
            users[currentUser].amount += await depositAmount();
            showCurrentBalance();
            break
        case 2:
            users[currentUser].amount -= await creditAmount();
            showCurrentBalance();
            break;
        case 3:
            showCurrentBalance()
            break;
        case 4:
            console.log(chalk.whiteBright(`Name: ${users[currentUser].name}`));
            console.log(chalk.whiteBright(`Amount: ${users[currentUser].amount}`));
            break
        case 5:
            currentUser = -1;
            homePage();
            return
        default:
            console.log(chalk.bgRedBright(`Invalid Option`));
    }
    console.log(chalk.yellowBright("Would you like to make another transaction?"))
    let runAgain = await inquirer.prompt([
        {
            name: "more",
            type: "input",
            message: "Y/N",
            default: "Y"
        }
    ])
    if (runAgain.more.toLowerCase() === "y") {
        menu();
    } else {
        currentUser = -1;
        console.log(chalk.bgBlueBright("Thanks for using out service. See you later"))
    }
}

let homePage = () => {
    console.clear();
    console.log(chalk.bgWhiteBright.blackBright.bold("          <--- M E N U --->                 "));
    console.log(chalk.bgWhiteBright.blackBright(" 1. SignIn                                  "));
    console.log(chalk.bgWhiteBright.blackBright(" 2. SignUp                                  "));
    chooseInputFromHomePage();
}

let chooseInputFromHomePage = async () => {
    let homePageInput = await inquirer.prompt([
        {
            name: "choice",
            type: "number",
            message: "Enter Your Choice: "
        },
    ])
    switch (homePageInput.choice) {
        case 1:
            getSignInDetails();
            break
        case 2:
            getSignUpDetails();
            break;
        default:
            console.log(chalk.bgRedBright(`Invalid Option`));
    }
}

homePage()