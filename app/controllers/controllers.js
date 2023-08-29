import { Recette } from '../shared/database.js';
import { Op } from 'sequelize';
import fs from 'fs';


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


export const postRecette = async function (req, res) {
    try {
        const { body } = req;

        console.log('Data received:', body);

        // Créer une nouvelle instance de la recette avec les données et l'image
        const recette = await Recette.create({
            ...body,
        });

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
