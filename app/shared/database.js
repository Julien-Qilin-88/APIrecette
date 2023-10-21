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
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    auteur: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempsDePreparation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tempsDeCuisson: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    instructions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT, // Utiliser DataTypes.TEXT au lieu de DataTypes.STRING
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
            isIn: [['Entrée', 'Salade', 'Plat', 'Dessert', 'Boisson', 'Sauce', 'Autre']] // Seulement ces valeurs sont acceptées
        }
    }
}, {
    sequelize,
    modelName: 'Recette'
}
)


export const initSequelize = async ({ force = true } = {}) => {
    // await sequelize.drop();
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
}