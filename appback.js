import readline from 'readline-sync';
import * as ALL from "./MANAGER/allimports.js"
import fs from "fs"
import { log } from 'console';


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