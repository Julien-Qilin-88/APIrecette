import express from 'express';
import bodyParser from 'body-parser';
import recettes from '../data.js';
import * as controllers from './controllers/controllers.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`Welcome to the API!`);
});

router.get('/recettes', controllers.getRecettes);

router.get('/recettes/:id', controllers.getRecettesId);
router.get('/recettes/search/:title', controllers.getRecettesTitle);

router.post('/recettes/', controllers.postRecettes);
    
router.put('/recettes/:id', controllers.putRecettes);

router.delete('/recettes/:id', controllers.deleteRecettes);


export default router;