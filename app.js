import * as All from "./MANAGER/allimports.js"
import readline from 'readline-sync';
import dotenv from 'dotenv';
dotenv.config();
console.log("🌍 URI depuis app.js:", process.env.URI)

function App() {

    let count = 0
    console.log("Welcome to the Riddle Challenge!\nThis app is designed to assess your mental performance and test your quick thinking. Enjoy!");
    const playername = readline.question(`What's your name ? : `)

    // let p1 = new ALL.Player(playername)
    let runOptionChoice = true;
    All.crudMenu()
    while (runOptionChoice) {

        let choice = readline.question('WRITE YOUR CHOICE HERE >> ')
        runOptionChoice = All.toSelectedOption(choice, count)

    }
}


App();