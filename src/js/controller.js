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
    //Getting the query string from View
    const query = SearchView.getQuery();
    //If there is no value - Abort
    if(!query) return;
    //wait to get the search results and update state
    await model.getSearchResults(query);
    //render the search results
    console.log(model.state);
  }catch(err){
    console.error(err);
  }
}

const init = function(){
  RecipeView.handleEventListeners(showRecipe);
  SearchView.handleEventListener(showSearchResults);
}

init();



