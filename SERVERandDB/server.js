import express from "express";
import { addRiddle, getAllRiddle, updateRiddle, deleteRiddle } from "../MANAGER/allimports.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

// Création du serveur
const server = express();
const PORT = 3000;
server.use(express.json());

// Configuration de la base de données
const client = new MongoClient(process.env.URI);
const dbname = process.env.dbname;
const collecname = process.env.collecname;
// Fonction pour initialiser la connexion à la base de données et se connecter a la collection
async function initializeDb() {
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    const db = client.db(dbname);
    return db.collection(collecname);
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB :", error);
    throw error;
  }
}
const collection = await initializeDb();

// Route POST pour ajouter une énigme
server.post("/riddle", async (req, res) => {
  // Vérification avec l'opérateur de chaînage optionnel
  if (!req.body?.task || !req.body?.answer || !req.body?.level) {
    return res.status(400).send("Post method must contain 'task', 'answer', and 'level' keys");
  }

  const riddle = {
    task: req.body.task,
    answer: req.body.answer,
    level: req.body.level,
  };

  try {

    const result = await addRiddle(collection, riddle);
    res.status(201).send(`Your riddle has been added successfully with ID: ${result.insertedId}`);
  } catch (e) {
    console.error("Erreur lors de l'ajout de l'énigme :", e);
    res.status(500).send(`Error while adding riddle: ${e.message}`);
  }
});

server.get("/allriddle", async (req, res) => {
  let allriddle = await getAllRiddle(collection, {})
  console.log(allriddle);
  res.status(201).send(allriddle)

})

server.post('/updriddle', async (req, res) => {
  const { targetid, task, answer, level } = req.body;
  const infoToUpdate = { task, answer, level }
  try {
    let reponse = await updateRiddle(collection, targetid, infoToUpdate)
    if (!reponse) {
      return res.status(400).send(`Update Not submitted ! `)
    }
    res.send('The riddle is updated')

  } catch (err) {
    res.status(500).send("server error ")
  }

})

server.post('/del', async (req, res) => {
  const { id } = req.body;
  try {
    const response = await deleteRiddle(collection, id)
    if (response.deletedCount === 0) {
      return res.status(401).send(`No match with this ID`)
    }
    res.status(201).send('Riddle deleted succesfully')


  } catch (err) {
    return res.status(400).send(`Server error : ${err.message}`)
  }
})
// Démarrer le serveur
server.listen(PORT, async () => {
  console.log(`Listening... ON PORT:${PORT}`);
})





