import readline from 'readline-sync';
import fs from 'fs'
import { getAllRiddle } from '../SERVER/mongodb.js';


    
// first step login
export async function menuLogin() {
    let runInputChoice = true;
    let choice;
    try {
          if (fs.existsSync('token.txt')) {
              const token = fs.readFileSync('token.txt', 'utf8').trim();
              const decoded = jwt.verify(token, process.env.JWT_SECRET);
              user = { token, username: decoded.username, role: decoded.role };
              console.log(`Connexion automatique réussie pour ${user.username} (${user.role})`);
              
          } 
      } catch (e) {
          console.log('Token invalide ou expiré, veuillez vous connecter.');
          fs.unlinkSync('token.txt'); // Supprime le token invalide
      }       
    console.log(`\nPRESS 1 > To Login `);
    console.log(`PRESS 2 > To Subscribe `);
    console.log(`PRESS 3 > To Play & StayLogout `);
    while (runInputChoice) {
        choice = readline.question("\nENTER YOUR CHOICE HERE : ");
        if (!["1", "2", "3"].includes(choice)) {
            console.log("Please enter a valid choice ! ");
            continue;
        }
        runInputChoice = false;
    }
    switch (choice) {
        case "1":
            let islogged = await login();
            if(!islogged)return false
            break;
        case "2":            
            await subscribe();
            return true;            
            break;
        case "3":
            launchgame();
            break;
    }
}
    
async function login() {
    console.log('~~~ WELCOME TO LOGIN PAGE ~~~');
    const username = readline.question('\nUSERNAME : ');
    const password = readline.question('\nPASSWORD : ');
    
    if (!username || !password) {
        console.log('Please enter username and password');
        return;
    }
    
    try {    
        
        const userdetails = { username, password };         
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userdetails)
        });
        
        
        
        if (!response.ok) {
            console.log(`Login failed: ${response.status} ${response.statusText}`);
            return false;
        }
        
        const result = await response.json();
        console.log('You are logged in!');
        console.log('Résultat:', result);
        fs.writeFileSync('token.txt', result.token);
        return true;

    } catch (e) {
        console.log('Server error:', e.message);
        return false
    }
}

async function subscribe() {
    console.log('~~~ WELCOME TO SUBSCRIBE PAGE ~~~');
    const username = readline.question('\nUSERNAME : ');
    const password = readline.question('\nPASSWORD : ');
    
    if (!username || !password) {
        console.log('Please enter username and password');
        return;
    }
    
    try {
        
        const userdetails = { username, password };
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userdetails)
        });
        
        if (!response.ok) {
            console.log(`Signup failed: ${response.status} ${response.statusText}`);
            return false;
        }
        
        const result = await response.json();
        console.log('You are signed up!');           
        console.log('Résultat:', result);
        return true
        

    } catch (e) {
        console.log('Server error:', e.message);
        return false;
    }
}

async function launchGame(){

    return true
}
    

// second step play and action
export function crudMenu() {

    console.log(`
╔════════════════════════════════════════════════════╗
║                    MAIN MENU                       ║
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

export function toSelectedOption(choice, count) {

    switch (choice) {

        // case "1":
        //     launchGame(count, player)
        //     return false



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
            delRiddle()
            break

        case "6":
            viewLeaderboard()
            break

        default:
            console.log("Please write a correct choice !");

            return true




    }

}

export async function createNewRiddle() {
    console.log("\n ~~~ ADD YOUR NEW RIDDLE ~~~\n");
    let taski = readline.question("WRITE HERE THE TASK: ");
    let answeri = readline.question("WRITE HERE THE ANSWER: ");
    let leveli = readline.question("What is the level? (1 to 3): ");

    if (!taski || !answeri) {
        console.log(`TASK OR ANSWER NOT VALID !`);
        return true;

    }

    // Vérifie que leveli est bien un chiffre entre 1 et 3
    if (!["1", "2", "3"].includes(leveli)) {
        console.log("Invalid level. Please enter 1, 2, or 3.");
        return true;
    }

    // Appel API
    try {
        let res = await fetch('http://localhost:3000/riddle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: taski,
                answer: answeri,
                level: leveli
            })
        });

        if (!res.ok) {
            console.log(`banana`);

            throw new Error(`Failed to create riddle: ${res.statusText}`);
        }

        console.log("\nYour riddle has been added successfully!");

    } catch (err) {
        console.error("Error while adding riddle:", err.message);
    }
}

export async function readAllRiddles() {
    console.log(`\n ~~~ THE LIST OF ALL RIDDLES ~~~ \n`);

    let res = await fetch('http://localhost:3000/allriddle', {
        method: "GET",
    })
    if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
        return true;
    }
    const riddles = await res.json();
    console.log(riddles);


    if (riddles.length === 0) {
        console.log("No riddles found.");
        return false;
    }

    riddles.forEach((riddle, index) => {
        console.log(`Riddle ${index + 1}`);
        console.log(`-----------------------------`);
        console.log(`Task   : ${riddle.task}`);
        console.log(`Answer : ${riddle.answer}`);
        console.log(`Level  : ${riddle.level}`);
        console.log(`ID     : ${riddle._id}`);
        console.log(``);
    });

}

export async function updateRiddle(collection, id) {
    try {
        let targetid = (readline.question(`\nWHAT IS THE ID OF THE RIDDLE THAT YOU WANT UPDATED ? :  `))

        if (!targetid) {
            console.log(`Please enter a correct Id !`);
            return true;
        }
        let task = readline.question("Enter the new task: ");
        let answer = readline.question("Enter the new answer: ");
        let level = readline.question("Enter the level (1 to 3): ")

        let riddleup = { targetid, task, answer, level }

        let res = await fetch("http://localhost:3000/updriddle", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(riddleup)
        })
        if (!res.ok) {
            console.log("Error server !");
            return false

        }
        console.log("The Riddle is Updated succesfully !");
        return false

    }
    catch (err) {
        console.error("Error while updating riddle:", err.message);
    }

}

export async function delRiddle() {

    let targetid = readline.question(`\nWHAT IS THE ID OF THE RIDDLE THAT YOU WANT DELETED ? :  `)
    if (!targetid) {
        console.log('Please enter a valid Id !');
        return;
    }
    try {

        let res = await fetch('http://localhost:3000/del', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: targetid })
        })
        if (!res.ok) {
            console.log("Error server !");
            return true
        }
        console.log(" Riddle deleted successfully!");
    } catch (e) {
        console.log(`error : ${e}`);
    }

}