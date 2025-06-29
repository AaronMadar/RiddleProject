import readline from 'readline-sync';

export default class Riddle {    
    constructor(id,taskDescription,correctAnswer ){
        this.id = id 
        this.taskDescription = taskDescription
        this.correctAnswer = correctAnswer
        this.timeToAnswer ={begin:0, end:0}
        this.continuetoask = true
        Riddle.ridllearray.push(this)
    }
    
    static ridllearray = []
    
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
}

  




