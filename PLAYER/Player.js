export class Player {
    
    constructor(name){
        this.name = name;
        this.timebyriddle = []
    }
    
    recordTime(start,end){
        let duration = (end - start) /1000
        this.timebyriddle.push(duration)

        
    }
    
    showStatis(){
        let sumtime = 0
        for (let time of this.timebyriddle){
            sumtime += time
        }
        console.log(`You finished the game in ${sumtime} seconds`)
        console.log(`The average of time by riddle is ${sumtime / this.timebyriddle.length} seconds`)
        
    }
    
    

}