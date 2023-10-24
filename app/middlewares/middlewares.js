import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Fonction middleware pour vérifier le token d'authentification
export function verifyToken(req, res, next) {
    const token = req.headers.authorization; // Récupérer le token depuis l'en-tête de la requête

    if (!token) {
        return res.status(403).send({ auth: false, message: 'Aucun token fourni.' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Échec de l\'authentification du token.' });
        }

        // L'objet `decoded` contient les informations de la charge utile du token
        req.userId = decoded.id; // Ajouter l'ID de l'utilisateur à l'objet `req` pour une utilisation ultérieure
        next();
    });
}