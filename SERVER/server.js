import express from "express"
import fs from "fs"
import * as ALL from "../MANAGER/allimports.js"

const server = express()
const PORT = 3000

server.use(express.json())

// to create a new riddle
server.post('/riddle',(req,res)=>{

    if(!req.body?.task || !req.body?.answer){
        
        res.send(`All Post Method must contains task and answer keys !!`)
    }

    const {task,answer} = req.body
    
    
try{
        let newriddle = new ALL.Riddle(task,answer)      
        res.send("\n Your riddle has added succesfully ! ")
}catch(e){
    
    
    res.send(`All Post Method must contains task and answer keys !!`)
    
}
    

})

// to read all the riddle
server.get('/riddle',(req,res)=>{
   try{
        
       res.send(ALL.riddlearray.map(el=>JSON.stringify(el)).join("\n"))

   } 
   catch(e){
    res.send(`Error : ${e}`)
   }

})

server.put('/riddle',(req,res)=>{
        let targetid = parseInt(req.body?.id)
        
        
        let index = ALL.riddlearray.findIndex(r => r.id === targetid);
       
        
    try{

        if (!isNaN(targetid) && index > -1) {
            
            
            let newtask = req.body?.task
            let newanswer = req.body?.answer
            ALL.riddlearray[index].taskDescription = newtask;
            ALL.riddlearray[index].correctAnswer = newanswer;
            const updatedContent = ALL.riddlearray.map(r => JSON.stringify(r)).join('\n');
            fs.writeFileSync('./RIDDLE/riddle.txt', updatedContent);

            res.send(" Riddle updated successfully!");  
        }
        else{
            res.send(`Please enter an existing Id `)
        }
        

    }catch(e){res.send(`Error : ${e}`)}



})


server.delete('/riddle',(req,res)=>{

     let targetid = parseInt(req.body?.id)
              
     let index = ALL.riddlearray.findIndex(r => r.id === targetid) 
     console.log(index);
     
     if(index!= -1){
         
         ALL.riddlearray.splice(index,1)
         const updatedContent = ALL.riddlearray.map(r => JSON.stringify(r)).join('\n');
         fs.writeFileSync('./RIDDLE/riddle.txt', updatedContent);
    
         res.send(`You have succesfully deleted the riddle`)
     }
     else{
        res.send(`Please enter an existing ID`)
     }


       
        
})



server.listen(PORT,()=>{
    console.log(`Listening... ON PORT:${PORT}`);
    
})