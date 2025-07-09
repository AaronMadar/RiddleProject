import Riddle from "../RIDDLE/Riddle.js";
import * as ALL  from "../MANAGER/allimports.js" 

function createariddle(req, res) {
    
    const task = req.body.task;
    const answer = req.body.answer;
    

    const newriddle = new Riddle(task, answer);

    // Pour test, on peut logguer
    console.log("New riddle created:", newriddle);

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Riddle added successfully");
}

export const rooter = {
    "POST": {
        "/riddle": createariddle
    },
    "GET": {
        "/riddle": (req, res) => {
            res.writeHead(200);
            res.end("GET not implemented yet");
        }
    }
};
