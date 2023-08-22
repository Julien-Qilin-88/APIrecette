import recettes from '../../data.js';
import Recette from '../models/recette.js';

export const getRecettes = function(req, res) {
    try {
        res.json(recettes);
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export const getRecettesId = function(req, res) {
    try {
        const id = parseInt(req.params.id);
        const recette = recettes.find(recette => recette.id === id);
        if (recette) {
            res.json(recette);
        } else {
            res.status(404).json({ error: `Recette ${id} not found` });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export const getRecettesTitle = function(req, res) {
    try {
        const title = req.params.title;
        const recette = recettes.filter(recette => recette.title.replace(/\s/g, '').toLowerCase().includes(title.replace(/\s/g, '').toLowerCase()));
        if (recette) {
            res.json(recette);
        } else {
            console.log(recette);
        console.log(title);
            res.status(404).json({ error: `Recette ${title} not found` });
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}


export const postRecettes = function(req, res) {
    const body = req.body;
    const recette = new Recette(body.id, body.title, body.tempsDePreparation, body.tempsDeCuisson, body.ingredients, body.instructions, body.image);
    recette.id = recettes.length + 1;
    recettes.push(recette);
    try {
        res.json(recette);
    }
    catch (e) {
        res.status(500).json({ error: e });
    }
    
}

export const putRecettes = function(req, res) {
        const body = req.body;
        const id = parseInt(req.params.id);
        const recette = recettes.find(recette => recette.id === id);
        try {
            if (recette) {
                recette.title = body.title;
                recette.tempsDePreparation = body.tempsDePreparation;
                recette.tempsDeCuisson = body.tempsDeCuisson;
                recette.ingredients = body.ingredients;
                recette.instructions = body.instructions;
                recette.image = body.image;
                res.json(recette);
            } else {
                res.status(404).json({ error: `Recette ${id} not found` });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }

    }

export const deleteRecettes = function(req, res) {
        const id = parseInt(req.params.id);
        const recette = recettes.find(recette => recette.id === id);
        try {
            if (recette) {
                recettes.splice(recettes.indexOf(recette), 1);
                res.json(recette);
            } else {
                res.status(404).json({ error: `Recette ${id} not found` });
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }

    }



