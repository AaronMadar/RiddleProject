    import express from 'express';
    import { logindb, signupdb } from './supabase.js';

    const router = express.Router();

    router.post("/login", async (req, res) => {
        const { username, password } = req.body;
        
        try {
            const userdetails = { username, password };
            const isLoggedIn = await logindb(userdetails);
            
            if (isLoggedIn) {
                return res.status(200).json({ message: 'Connexion réussie' });
            } else {
                return res.status(400).json({ error: 'Utilisateur non trouvé ou mot de passe incorrect' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erreur serveur: ' + error.message });
        }
    });

    router.post("/signup", async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body)
        try {
            const userdetails = { username, password };
            const isSignedUp = await signupdb(userdetails);
            
            if (isSignedUp) {
                return res.status(201).json({ message: 'Utilisateur créé' });
            } else {
                return res.status(400).json({ error: 'Échec de l\'inscription, utilisateur peut-être déjà existant' });
            }
        } catch (error) {
            return res.status(500).json({ error: 'Erreur serveur: ' + error.message });
        }
    });

    export default router;