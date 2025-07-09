import readline from 'readline-sync';
import fs from "fs"


export default class Riddle {    
    constructor(taskDescription,correctAnswer ){
        this.id = this.createId()
        this.taskDescription = taskDescription
        this.correctAnswer = correctAnswer
        this.timeToAnswer ={begin:0, end:0}
        this.continuetoask = true
        
        const line = JSON.stringify(this) + "\n"

  fs.appendFile("./riddle.txt",line,(error)=>{if (error) throw error})

    };

    
    
    
    
    Ask(count){
        while(this.continuetoask){
            
            let response = readline.question(`\n${this.taskDescription}  :  `)
            if (response.toLowerCase() == this.correctAnswer){
                console.log(`Yeaah Good response ! `)
                count += 1                
                this.continuetoask = false
            }
            else {
                console.log("WRONGGGG ! Try Again ")
            }

        }

        
    }

    createId(){
        // creation de liste de ligne ,
        const lines = fs.readFileSync('./riddle.txt', 'utf-8').trim().split('\n');

        if (lines.length === 0) return null;

        const lastLine = lines[lines.length - 1];

        return JSON.parse(lastLine).id + 1
    }

}








  




