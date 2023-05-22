const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const recipes = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async (db) => {
    // Run your code here, after you have insured that the connection was made
    try {
      // Create new recipes using the data imported from "./data.json"
      const createRecipes = await Recipe.create(recipes);

      // Iterate over the created recipes and log their titles
      for (let oneRecipe of recipes) {
        console.log(`${oneRecipe.title}`);
      }
      // Insert multiple recipes from the data array
      const insertRecipes = await Recipe.insertMany(recipes);
      console.log(insertRecipes.title);

      // Find and update a specific recipe, setting its duration to 100
      const updateRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese " },
        { duration: 100 },
        { new: true }
      );

      // Delete a specific recipe by its title
      const deleteRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });
      console.log(`Carrot cake is no longer available ${deleteRecipe}`);
    } catch (error) {
      console.error("Error connecting to the database", error);
    } finally {
      mongoose.disconnect().then(() => {
        console.log("Disconnected from the database");
      });
    }
  });
