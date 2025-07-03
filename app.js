import * as ALL  from "./MANAGER/allimports.js"
import readline from 'readline-sync';

function App() {
    let count = 0
    console.log("Welcome to the Riddle Challenge!\nThis app is designed to assess your mental performance and test your quick thinking. Enjoy!");
    const playername = readline.question(`What's your name ? : `)
    let p1 = new ALL.Player(playername)     
    // ALL.crudMenu();
    let didntchoose = true ; 
    ALL.crudMenu()
    while(didntchoose){

        let res = readline.question('WRITE YOUR CHOICE HERE >> ')
        didntchoose = ALL.toSelectedOption(res,count,p1)

    }


    

    

}


App();