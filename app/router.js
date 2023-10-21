import express from 'express';
import * as controllers from './controllers/controllers.js';
import * as middlewares from './middlewares/middlewares.js';


const router = express.Router();
const app = express();

// API router

router.get('/', (req, res) => {
    res.send(`Welcome to the API!`);
});

// Middleware de vérification du token
app.use(middlewares.verifyToken);

// router.get('/images', controllers.getNumberImages); 

router.get('/recettes', controllers.getAllRecettes);

router.get('/recettes/:id', controllers.getRecetteById);
router.get('/recettes/search/:title', controllers.getRecettesByTitle);

router.get('/recette-du-jour', controllers.getRecetteRandom);

router.get('/recettes/page/:page', controllers.getRecettesPerPage);

router.post('/recettes/', controllers.postRecette, middlewares.verifyToken);

router.put('/recettes/:id', controllers.putRecette);

router.delete('/recettes/:id', controllers.deleteRecette);

// // Multer router

// router.post('/upload', controllers.upload.single('image'), controllers.handleImageUpload);




export default router;