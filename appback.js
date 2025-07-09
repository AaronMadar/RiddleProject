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
    
        case "3":
            readAllRiddles()
            break
    
        case "4":
            updateRiddle()
        break 
    
        case "5":
            deleteRiddle()
        break
    
        case "6":
            viewLeaderboard()
        break
    
        default :
        console.log("Please write a correct choice !");        
        
        return true
        



    }

}


let riddlearray = ALL.Riddle.getRiddleArray()


function launchGame(count,player){
    

     for( let i = 0; i<riddlearray.length && count <3  ;i++ ){
                let startime = Date.now()
               let actualriddle =  riddlearray[i]
               ALL.Riddle.Ask(count,actualriddle)
                let endtime = Date.now()
                player.recordTime(startime,endtime)
                
               
        }
    
        console.log("Congratulation !!! ")
        player.showStatis()

}





export function createNewRiddle(){
    console.log(" \n ~~~ ADD YOUR NEW RIDDLE ~~~\n")
   let task = readline.question(`WRITE HERE THE TASK: `)
    let answer = readline.question(`WRITE HERE THE ANSWER: `)
  
  let newriddle = new ALL.Riddle(task,answer)
  console.log(newriddle)

  console.log("\n Your riddle has added succesfully ! ")



}



 function readAllRiddles(){

        
        console.log(`\n ~~~ THE LIST OF ALL RIDDLES ~~~ \n`)
        console.log(riddlearray)
    }



function updateRiddle(){
    try{
        let targetid = parseInt(readline.question(`\nWHAT IS THE ID OF THE RIDDLE THAT YOU WANT UPDATED ? :  `))
        let index = riddlearray.findIndex(r => r.id === targetid);

        if (!isNaN(targetid) && index !== -1) {
            let task = readline.question("Enter the new task: ");
            let answer = readline.question("Enter the new answer: ");

            riddlearray[index].taskDescription = task;
            riddlearray[index].correctAnswer = answer;
            const updatedContent = riddlearray.map(r => JSON.stringify(r)).join('\n');
            fs.writeFileSync('./RIDDLE/riddle.txt', updatedContent);

            console.log(" Riddle updated successfully!");

        }
        else{
            console.log(`WRONG ID !`)
        }
    }
    catch(error){
        console.log("Error !")
    }

    }