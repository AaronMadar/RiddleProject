import * as All from "./MANAGER/allimports.js"
import readline from 'readline-sync';


async function App() {

    let count = 0
    console.log("\nWelcome to the Riddle Challenge!\nThis app is designed to assess your mental performance and test your quick thinking. Enjoy!");
    let accessToPlay = await All.menuLogin()
    if(!accessToPlay)return false
    let runOptionChoice = true;
    All.crudMenu()
    while (runOptionChoice) {

        let choice = readline.question('WRITE YOUR CHOICE HERE >> ')
        runOptionChoice = All.toSelectedOption(choice, count)

    }
}





App();