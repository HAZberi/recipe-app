import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

//Polyfilling Imports
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { MODAL_WINDOW_TIMEOUT } from './config.js';

//Hot Module Reload
// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////

const showRecipe = async function () {
  try {
    //geting href from the url
    const id = window.location.hash.slice(1);
    if (!id) return;
    //Adding a spinner while we wait for the API to fetch
    RecipeView.loadingSpinner();
    //Update Search Results and Bookmark list to mark the selected recipe
    if (model.getSearchResultsPerPage().length > 0)
      ResultsView.update(model.getSearchResultsPerPage());
    BookmarksView.update(model.state);
    //STEP 1 Fetching the recipe
    await model.getRecipe(id);
    //Step2 Rendering the recipe
    RecipeView.render(model.state);
  } catch (err) {
    console.error(err);
    RecipeView.renderError();
  }
};

const showSearchResults = async function () {
  try {
    //Getting the query string from View
    const query = SearchView.getQuery();
    //If there is no value - Abort
    if (!query) return;
    //Adding a spinner while we wait for the results
    ResultsView.loadingSpinner();
    //wait to get the search results and update state
    await model.getSearchResults(query);
    //render the search results
    ResultsView.render(model.getSearchResultsPerPage());
    //Show pagination if any
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    ResultsView.renderError();
  }
};

const movePagination = function (gotoPage) {
  ResultsView.render(model.getSearchResultsPerPage(gotoPage));
  PaginationView.render(model.state.search);
};

const changeServings = function (newServings) {
  //Update the state with new Servings coming from view
  model.getNewServings(newServings);
  //Updating the recipe container
  RecipeView.update(model.state);
};

const controlBookmarks = function (recipe) {
  //if the recipe is already bookmarked then delete the bookmark
  if (recipe.bookmarked) model.deleteBookmark(recipe);
  //Adding a Bookmark and update the state
  else model.addBookmark(recipe);
  //Updating the recipe container
  RecipeView.update(model.state);
  //Re-rendering the Bookmark Lists
  BookmarksView.render(model.state);
};

const showBookmarksFromStorage = function () {
  try {
    BookmarksView.render(model.state);
  } catch (err) {
    BookmarksView.renderMessage();
  }
};

const uploadNewRecipe = async function (newRecipe) {
  try {
    //Adding a spinner while we wait for the API to fetch
    AddRecipeView.loadingSpinner();
    //Upload a new Recipe
    await model.uploadRecipe(newRecipe);
    //close window
    console.log("I am getting executed");
    closeModalWindow(AddRecipeView.renderMessage);
    //Render the uploaded Recipe
    RecipeView.render(model.state);
    //Re-render the Bookmarks List
    BookmarksView.render(model.state);
  } catch (err) {
    console.error(err);
    closeModalWindow(AddRecipeView.renderError, err.message);
  }
};

const closeModalWindow = (callback, message) => {
  callback(message);
  setTimeout(() => {
    console.log('in time out');
    AddRecipeView.toggleHiddenElements();
  }, MODAL_WINDOW_TIMEOUT * 1000);
};

const init = function () {
  //Following Bookmark handler has side-effects! It must be called 1st
  //Recipes will be loaded in view from bookmarks at window reload
  BookmarksView.handleStorageBookmarks(showBookmarksFromStorage);
  //Recipe View handlers will be initiated 2nd
  RecipeView.handleEventListeners(showRecipe);
  RecipeView.handleServingsListener(changeServings);
  RecipeView.handleBookmarkListener(controlBookmarks);
  //Search Pagination and AddRecipe Action doesn't need to be in order
  SearchView.handleEventListener(showSearchResults);
  PaginationView.handleEventListener(movePagination);
  AddRecipeView.submitRecipeListener(uploadNewRecipe);
};

init();
