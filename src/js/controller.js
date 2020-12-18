import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from "./views/searchView.js";

//Polyfilling Imports
import 'regenerator-runtime/runtime';
import 'core-js/stable';

///////////////////////////////////////

const showRecipe = async function () {
  try {
    //geting href from the url
    const id = window.location.hash.slice(1);
    if(!id) return;
    //Adding a spinner while we wait for the API to fetch
    RecipeView.loadingSpinner();
    //STEP 1 Fetching the recipe
    await model.getRecipe(id);
    //Step2 Rendering the recipe
    RecipeView.render(model.state);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const showSearchResults = async function (){
  try{
    await model.getSearchResults('pizza');
  }catch(err){
    console.error(err);
  }
}

showSearchResults();

const init = function(){
  RecipeView.handleEventListeners(showRecipe);
}

init();



