import validator from "validator";

export default class Recette {
    #id;
    #title;
    #tempsDePreparation;
    #tempsDeCuisson;
    #ingredients;
    #instructions;
    #image;

    constructor(id, title, tempsDePreparation, tempsDeCuisson, ingredients, instructions, image) {
        this.#id = id;
        this.#title = title;
        this.#tempsDePreparation = tempsDePreparation;
        this.#tempsDeCuisson = tempsDeCuisson;
        this.#ingredients = ingredients;
        this.#instructions = instructions;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get tempsDePreparation() {
        return this.#tempsDePreparation;
    }

    get tempsDeCuisson() {
        return this.#tempsDeCuisson;
    }

    get ingredients() {
        return this.#ingredients;
    }

    get instructions() {
        return this.#instructions;
    }

    get image() {
        return this.#image;
    }

    set id(value) {
        // l'id est généré automatiquement par la classe Recette il n'est pas modifiable il est unique et c'est la taille du tableau + 1
        this.#id = value;

    }

    set title(value) {
        if (validator.isLength(value, { min: 3, max: 20 })) {
            this.#title = value;
        } else {
            throw new Error("Le titre doit etre entre 3 et 20 caractères");
        }
    }

    set tempsDePreparation(value) {
        if (validator.isLength(value, { min: 3, max: 20 })) {
            this.#tempsDePreparation = value;
        } else {
            throw new Error("Le temps de préparation doit etre entre 3 et 20 caractères");
        }
    }

    set tempsDeCuisson(value) {
        if (validator.isLength(value, { min: 3, max: 20 })) {
            this.#tempsDeCuisson = value;
        } else {
            throw new Error("Le temps de cuisson doit etre entre 3 et 20 caractères");
        }
    }

    set ingredients(value) {
        if (validator.isLength(value, { min: 3, max: 20 })) {
            this.#ingredients = value;
        }
        // un tableau d'ingrédients
        else if (Array.isArray(value)) {
            this.#ingredients = value;
        } else {
            throw new Error("Les ingrédients doivent etre entre 3 et 20 caractères");
        }

    }

    set instructions(value) {
        if (validator.isLength(value, { min: 3, max: 20 })) {
            this.#instructions = value;
        }
        // un tableau d'instructions
        else if (Array.isArray(value)) {
            this.#instructions = value;
        } else {
            throw new Error("Les instructions doivent etre entre 3 et 20 caractères");
        }

    }

    set image(value) {
        if (validator.isURL(value)) {
            this.#image = value;
        } else {
            throw new Error("L'image doit etre un URL");
        }
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            tempsDePreparation: this.#tempsDePreparation,
            tempsDeCuisson: this.#tempsDeCuisson,
            ingredients: this.#ingredients,
            instructions: this.#instructions,
            image: this.#image
        };
    }

    // afficher une recette soit par son id soit par son titre ou ses ingrédients
    
        

    // ajout de recette
    static fromJSONAdd(json) {
        const recette = new Recette(json.id, json.title, json.tempsDePreparation, json.tempsDeCuisson, json.ingredients, json.instructions, json.image);
        return recette;
    }

    // modification de recette
    static fromJSONUpdate(json) {
        const recette = new Recette(json.id, json.title, json.tempsDePreparation, json.tempsDeCuisson, json.ingredients, json.instructions, json.image);
        return recette;
    }

    // suppression de recette
    static fromJSONDelete(json) {
        const recette = new Recette(json.id, json.title, json.tempsDePreparation, json.tempsDeCuisson, json.ingredients, json.instructions, json.image);
        return recette;
    }


}

