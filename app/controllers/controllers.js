import { Recette } from '../shared/database.js';
import { Op } from 'sequelize';
import fs from 'fs';
import multer from 'multer';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const extension = file.originalname.split('.').pop();
        const noExtension = file.originalname.split('.').slice(0, -1).join('.');
        const recipeId = currentRecipeId; // Supposons que l'ID de la recette soit dans le corps de la requête
        cb(null, `${noExtension}-${recipeId}.${extension}`);
    }
});

export const upload = multer({ storage: storage });

// Route POST pour l'upload d'images
export const handleImageUpload = async function (req, res) {

    res.status(200).send("ok")

};

export const getAllRecettes = async function (req, res) {
    try {
        const recettes = await Recette.findAll(
            {
                order: [['title', 'ASC']] // Tri par ordre alphabétique croissant du champ 'titre'
            }
        );
        res.json(recettes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes' });
    }
};

export const getRecetteById = async function (req, res) {
    const id = parseInt(req.params.id);
    const recette = await Recette.findOne({
        where: {
            id: id
        }
    });

    if (recette) {
        res.json(recette);
    } else {
        res.status(404).json({ message: 'Recette non trouvée' });
    }
}

export const getRecettesByTitle = async function (req, res) {
    const title = req.params.title;
    const recettes = await Recette.findAll({
        where: {
            title: {
                [Op.iLike]: `%${title}%`
            }
        }
    });

    if (recettes.length > 0) {
        res.json(recettes);
    } else {
        res.status(404).json({ message: 'Aucune recette trouvée pour ce titre' });
    }
}

export const getRecettesPerPage = async function (req, res) {
    const ITEMS_PER_PAGE = 5;
    const page = parseInt(req.params.page) || 0;
    const offset = page * ITEMS_PER_PAGE;

    try {
        const paginatedRecettes = await Recette.findAll({
            offset,
            limit: ITEMS_PER_PAGE
        });
        res.json(paginatedRecettes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des recettes' });
    }
}

let currentRecipeId = null;
export const postRecette = async function (req, res) {
    try {
        const { body } = req;

        console.log('Data received:', body);

        // Créer une nouvelle instance de la recette avec les données et l'image
        const recette = await Recette.create({
            ...body,


        });

        // Stocker temporairement l'ID de la recette créée
        currentRecipeId = recette.id;
        console.log('currentRecipeId:', currentRecipeId);

        res.status(201).json({ message: 'Recette créée avec succès' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la recette' });
    }
}


export const putRecette = async function (req, res) {
    try {
        const body = req.body;
        const id = parseInt(req.params.id);

        // Vérifier si une nouvelle image a été téléchargée
        let updatedData = { ...body };
        if (req.file) {
            const image = await fs.readFile(req.file.path);
            updatedData.image = image;
        }

        // Mettre à jour la recette et récupérer le nombre de lignes modifiées
        const [updatedRows] = await Recette.update(updatedData, {
            where: {
                id: id
            }
        });

        if (updatedRows === 0) {
            res.status(404).json({ message: 'Recette non trouvée' });
        } else {
            res.status(200).json({ message: 'Recette mise à jour avec succès' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette' });
    }
};

export const deleteRecette = async function (req, res) {
    try {
        const id = parseInt(req.params.id);

        // Supprimer la recette et récupérer le nombre de lignes supprimées
        const deletedRows = await Recette.destroy({
            where: {
                id: id
            }
        });

        if (deletedRows === 0) {
            res.status(404).json({ message: 'Recette non trouvée' });
        } else {
            res.status(200).json({ message: 'Recette supprimée avec succès' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la recette' });
    }
};

let currentRecetteId = null; // Variable globale pour stocker l'ID de la recette du jour

// Fonction pour mettre à jour l'ID de la recette du jour
async function updateDailyRecetteId() {
    // Générer un nouvel ID de recette aléatoire pour chaque jour
    const maxRecetteId = await Recette.max('id'); // Supposons que 'id' est la colonne de l'ID dans votre table
    currentRecetteId = Math.floor(Math.random() * maxRecetteId) + 1;
}

// Appeler la fonction pour mettre à jour l'ID de la recette au démarrage de l'application
updateDailyRecetteId();

export const getRecetteRandom = async function (req, res) {
    try {
        // Récupérer la recette du jour en utilisant l'ID stocké
        const recette = await Recette.findByPk(currentRecetteId);

        if (recette) {
            res.json(recette);
        } else {
            res.status(404).json({ message: 'Aucune recette trouvée avec l\'ID du jour.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la recette du jour' });
    }
}


// Planifier la mise à jour de l'ID de la recette chaque jour à minuit
const ONE_DAY = 24 * 60 * 60 * 1000; // Durée d'une journée en millisecondes
setInterval(updateDailyRecetteId, ONE_DAY);




