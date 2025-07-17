import readline from 'readline-sync';
import fs from "fs"


export default class Riddle {    
    constructor(taskDescription,correctAnswer ){
        this.id = this.createId()
        this.taskDescription = taskDescription
        this.correctAnswer = correctAnswer
        this.timeToAnswer ={begin:0, end:0}
        this.continuetoask = true
        
       const line =  '\n' + JSON.stringify(this) ;


        fs.appendFile("./RIDDLE/riddle.txt",line,(error)=>{if (error) throw error})

    };

    
   static getRiddleArray() {
    const filePath = './RIDDLE/riddle.txt';
    
    const content = fs.readFileSync(filePath, 'utf-8').trim();
    if (content === '') return [];

    return content.split('\n').filter(line => line.trim() !== '').map(line => JSON.parse(line));

}

    
    
    static Ask(count,riddle){
        while(riddle.continuetoask){
            
            let response = readline.question(`\n${riddle.taskDescription}  :  `)
            if (response.toLowerCase() == riddle.correctAnswer){
                console.log(`Yeaah Good response ! `)
                count += 1                
                riddle.continuetoask = false
            }
            else {
                console.log("WRONGGGG ! Try Again ")
            }

        }

        
    }

        createId(){
           const riddlearray = Riddle.getRiddleArray()

            if(riddlearray.length === 0) return 1

            return riddlearray[riddlearray.length -1].id + 1
        }



    
}










  




