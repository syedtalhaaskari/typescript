#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

type Todo = {
    id: number;
    todoItem: string;
    isCompleted: boolean;
}

let todos: Todo[] = [
    {
        id: 1,
        todoItem: "Breakfast",
        isCompleted: true
    },
    {
        id: 2,
        todoItem: "Lunch",
        isCompleted: false
    },
    {
        id: 3,
        todoItem: "Dinner",
        isCompleted: false
    },
];

const deleteAllTodos = async () => {
    let todoItem = await inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Are you sure you want to delete all todos? ",
            default: "Y"
        },
    ])
    if (todoItem.choice.toLowerCase() === "y") {
        todos.length = 0;
    }
    homePage();
}

const deleteTodo = async () => {
    let todoItem = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter Todo Number: "
        },
    ])
    let ind = todos.findIndex(todo => todo.id === todoItem.id);
    if (ind < 0) {
        console.log(chalk.bgRedBright("Invalid Todo Number"));
        editTodo();
        return
    }
    delete todos[ind]
    homePage();
}

const editTodo = async () => {
    let todoItem = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Enter Todo Number: "
        },
        {
            name: "todoItem",
            type: "input",
            message: "Enter Edited Todo Item: "
        },
        {
            name: "isCompleted",
            type: "input",
            message: "Is it Completed? (Y/N): ",
            default: "Y"
        },
    ])
    let ind = todos.findIndex(todo => todo.id === todoItem.id);
    if (ind < 0) {
        console.log(chalk.bgRedBright("Invalid Todo Number"));
        editTodo();
        return
    } else if (!!!todoItem.todoItem) {
        console.log(chalk.bgRedBright("Todo Item cannot be Empty"));
        editTodo();
        return
    } else {
        todos[ind].todoItem = todoItem.todoItem;
        todos[ind].isCompleted = todoItem.isCompleted.toLowerCase() === "y";
        homePage();
    }
}

const addTodo = async () => {
    let todoInput = await inquirer.prompt([
        {
            name: "todoItem",
            type: "input",
            message: "Enter Todo Item: "
        },
        {
            name: "isCompleted",
            type: "input",
            message: "Is it Completed? (Y/N): ",
            default: "N"
        },
    ])
    todos.push({
        id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
        todoItem: todoInput.todoItem,
        isCompleted: todoInput.isCompleted.toLowerCase() === "y"
    })
    homePage();
}

const showMenu = async () => {
    console.log();
    console.log(chalk.bgWhiteBright("a. Add Todo   "));
    console.log(chalk.bgWhiteBright("b. Edit Todo   "));
    console.log(chalk.bgWhiteBright("c. Delete Todo   "));
    console.log(chalk.bgWhiteBright("d. Delete All Todos   "));
    console.log(chalk.bgWhiteBright("e. Exit   "));
    let userInput = await inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Enter Your Choice"
        }
    ])
    switch (userInput.choice.toLowerCase()) {
        case "a":
            addTodo();
            break;
        case "b":
            editTodo();
            break;
        case "c":
            deleteTodo();
            break;
        case "d":
            deleteAllTodos();
            break;
        case "e":
            break;
        default:
            homePage(true);
            break;
    }
}

const homePage = (invalid?: boolean) => {
    console.clear();
    if (invalid) {
        console.log(chalk.bgRedBright(" Invalid Selection   "))
    }
    console.log(chalk.bgWhiteBright("     <--- TODO LIST --->     "))
    todos.length <= 0 ?
        console.log(chalk.bgWhiteBright(" No Todo Items To Display    "))
        : todos.map(todo => {
            console.log(chalk[todo.isCompleted ? "bgGreenBright" : "bgRedBright"](`${todo.id}. ${todo.todoItem}   `));
        })
    showMenu()
}

homePage()