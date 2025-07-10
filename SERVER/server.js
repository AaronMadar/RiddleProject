import express from "express"
import * as ALL from "../MANAGER/allimports.js"

const server = express()
const PORT = 3000

server.use(express.json())

server.post('/riddle',(req,res)=>{

    if(!req.body?.task || !req.body?.answer){
        
        res.send(`All Post Method must contains task and answer keys !!`)
    }

    const {task,answer} = req.body
    
    
try{
        let newriddle = new ALL.Riddle(task,answer)      
        res.send("\n Your riddle has added succesfully ! ")
}catch(e){
    
    res.send(`banana`);
    res.send(`All Post Method must contains task and answer keys !!`)
    
}
    

})




server.listen(PORT,()=>{
    console.log(`Listening... ON PORT:${PORT}`);
    
})