import { Sequelize, DataTypes } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(process.env.DATABASE_URL,
    {
        logging: console.log
    }
)

export const Recette = sequelize.define('Recette', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    tempsDePreparation: {
        type: DataTypes.INTEGER
    },
    tempsDeCuisson: {
        type: DataTypes.INTEGER
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    instructions: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true // Le champ peut être vide
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false, // Le champ ne peut pas être vide
        validate: {
            isIn: [['Entrée', 'Salade', 'Plat', 'Dessert', 'Boisson', 'Sauce', 'Autre']] // Seulement ces valeurs sont acceptées
        }
    }
})

export const initSequelize = async ({ force = true } = {}) => {
    // await sequelize.drop();
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
}

