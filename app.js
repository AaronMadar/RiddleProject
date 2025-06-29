import * as ALL  from "./allimports.js"
import readline from 'readline-sync';

function App() {
    let count = 0
    console.log("Welcome to the Riddle Challenge!\nThis app is designed to assess your mental performance and test your quick thinking. Enjoy!");
    const playername = readline.question(`What's your name ? : `)
    let p1 = new ALL.Player(playername) 
    

    for( let i = 0; i<ALL.Riddle.ridllearray.length && count <3  ;i++ ){
            let startime = Date.now()
            ALL.Riddle.ridllearray[i].Ask(count)
            let endtime = Date.now()
            p1.recordTime(startime,endtime)
            
           
    }

    console.log("Congratulation !!! ")
    p1.showStatis()
    

    

}


App();