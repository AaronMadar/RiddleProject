import {createServer} from "node:http"
import { rooter } from "./rooter.js";

const PORT = 2626;

function parseBody(req, res, cb){
    if(req.body){
        req.body = JSON.parse(req.body)        
    }
    cb(req, res);
}



const server = createServer((req,res)=>{

    const method = req.method;
    const url = req.url;

    server.on("request",(req,res)=>{        
       
        let body = "";

        req.on("data",(chunk) =>{
            body += chunk.toString();

        })

        req.on("end",()=>{
            req.body = body ;
            parseBody(req,res,rooter[req.method][req.url]())
        })
    })



});


server.listen(PORT,()=>{
    console.log(`Listning ... on PORT :${PORT}`);
    
})
