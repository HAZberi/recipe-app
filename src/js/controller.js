import * as model from './model.js';
import RecipeView from './views/recipeView.js';
//Polyfilling Imports
import 'regenerator-runtime/runtime';
import 'core-js/stable';


//const { async } = require('q');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////

const showRecipe = async function () {
  try {
    //geting href from the url
    const id = window.location.hash.slice(1);
    //Adding a spinner while we wait for the API to fetch
    RecipeView.loadingSpinner();
    //STEP 1 Fetching the recipe
    await model.getRecipe(id);
    //Step2 Rendering the recipe
    RecipeView.render(model.state);
  } catch (err) {
    console.error(err);
  }
};

['hashchange', 'load'].forEach(eventType =>
  window.addEventListener(eventType, showRecipe)
);
