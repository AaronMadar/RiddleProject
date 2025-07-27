import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'

dotenv.config()


const supabase = createClient(
    process.env.URL,
    process.env.APIKEY
);

export async function logindb(userdetails) {
        
    const { username, password } = userdetails;
    try {

        // Chercher l'utilisateur dans la table 'users'
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', username)
            .single(); // Prend un seul utilisateur

        if (error || !data) {
            console.log('Utilisateur non trouvé ou erreur:', error?.message || 'Aucun utilisateur');
            return false;
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, data.password);
        if (!isPasswordValid) {
            console.log('Mot de passe incorrect');
            return false;
        }

        
        // Générer un token avec username, role, highscore
        const token = jwt.sign(
               { username: data.username,
                 role: data.role || 'user', 
                 highscore: data.highscore || 0 },
                 process.env.JWT_SECRET,
               { expiresIn: '20m' }
           );
           console.log('Connexion réussie pour:', username);
           return { token, username: data.username };

        
    } catch (error) {
        console.log('Erreur Supabase:', error.message);
        return false;
    }
}

export async function signupdb(userdetails) {
    const { username, password } = userdetails;
    try {
        // Vérifier si l'utilisateur existe déjà
        const { data: existingUser, error: checkError } = await supabase
            .from('users')
            .select('username')
            .eq('username', username)
            .single();

        if (existingUser) {
            console.log('Cet utilisateur existe déjà');
            return false;
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Insérer le nouvel utilisateur
        const { data, error } = await supabase
            .from('users')
            .insert([{ username, password: hashedPassword }])
            .select();

        if (error || !data) {
            console.log('Erreur lors de l\'inscription:', error?.message);
            return false;
        }

        console.log('Utilisateur créé:', username);
        return true;
    } catch (error) {
        console.log('Erreur Supabase:', error.message);
        return false;
    }
}