import readline from 'readline-sync';
import * as ALL  from "./MANAGER/allimports.js"
import fs from "fs"


export function crudMenu(){

   console.log(`
╔════════════════════════════════════════════════════╗
║                    MAIN MENU                      ║
╠════════════════════════════════════════════════════╣
║  Press 1 ➤  Play the game                         ║
║  Press 2 ➤  Create a new riddle                   ║
║  Press 3 ➤  Read all riddles                      ║
║  Press 4 ➤  Update an existing riddle             ║
║  Press 5 ➤  Delete a riddle                       ║
║  Press 6 ➤  View leaderboard                      ║
╚════════════════════════════════════════════════════╝
`);


    
}



export function toSelectedOption(readli,count,player){

    switch(readli){

        case "1": 
         launchGame(count,player)
         return false
         
            
    
        case "2": 
        createNewRiddle()
            break
    
        case 3:
            readAllRiddles()
            break
    
        case 4:
            updateRiddle()
        break 
    
        case 5:
            deleteRiddle()
        break
    
        case 6:
            viewLeaderboard()
        break
    
        default :
        console.log("Please write a correct choice !");        
        
        return true
        



    }

}


function launchGame(count,player){

     for( let i = 0; i<ALL.Riddle.riddlearray.length && count <3  ;i++ ){
                let startime = Date.now()
                ALL.Riddle.riddlearray[i].Ask(count)
                let endtime = Date.now()
                player.recordTime(startime,endtime)
                
               
        }
    
        console.log("Congratulation !!! ")
        player.showStatis()

}





function createNewRiddle(){
    console.log(" \n ~~~ ADD YOUR NEW RIDDLE ~~~\n")
   let a = readline.question(`WRITE HERE THE TASK `)
    let b = readline.question(`WRITE HERE THE ANSWER `)

  let lastid = ALL.Riddle.riddlearray.slice(-1)[0].id;
  let id = lastid +1; 
  let newriddle = new ALL.Riddle(id,a,b)

  for(let el of ALL.Riddle.riddlearray){
    console.log(el)
  }

  console.log("\n Your riddle has added succesfully ! ")



}