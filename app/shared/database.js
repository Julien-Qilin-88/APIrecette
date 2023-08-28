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
        type: DataTypes.TEXT
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false, // Le champ ne peut pas être vide
        validate: {
            isIn: [['Entrée', 'Plat', 'Dessert', 'Boisson', 'Autre']] // Seulement ces valeurs sont acceptées
        }
    }
})

export const initSequelize = async ({ force = false } = {}) => {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
}
