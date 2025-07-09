import {createServer} from "node:http"
import { rooter } from "./rooter.js";

const PORT = 2626;

function parseBody(req, res, cb){
    try{        
        req.body = JSON.parse(req.body)        
        }

    catch(e){
        req.body = {}
        }


         if (typeof cb !== 'function') {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("ONLY GET OR POST /riddle ARE AVAILABLE");
    }

        try{

            cb(req, res);

        }
        catch(e){
            res.end(`ONLY GET OR POST /riddle ARE AVAILABLE`)
        }

}




const server = createServer((req,res)=>{

    const method = req.method;
    const url = req.url;

    console.log(req.method , req.url)
    let body = "";

    req.on("data",chunk =>{
        body += chunk.toString();

    })

    req.on("end",()=>{
        req.body = body ;
        const handler = rooter[req.method]?.[req.url];
        console.log("Handler trouvé ?", handler)
        parseBody(req,res,handler)
    })
   



});


server.listen(PORT,()=>{
    console.log(`Listning ... on PORT :${PORT}`);
    
})
