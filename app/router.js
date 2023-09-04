import express from 'express';
import bodyParser from 'body-parser';
import recettes from '../data.js';
import * as controllers from './controllers/controllers.js';

const router = express.Router();

// API router

router.get('/', (req, res) => {
    res.send(`Welcome to the API!`);
});

router.get('/recettes', controllers.getAllRecettes);

router.get('/recettes/:id', controllers.getRecetteById);
router.get('/recettes/search/:title', controllers.getRecettesByTitle);

router.get('/recettes/page/:page', controllers.getRecettesPerPage);

router.post('/recettes/', controllers.postRecette);

router.put('/recettes/:id', controllers.putRecette);

router.delete('/recettes/:id', controllers.deleteRecette);


export default router;