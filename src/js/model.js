import { async } from 'regenerator-runtime';
import { API_KEY, API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helper.js';
// https://forkify-api.herokuapp.com/v2
// APIKEY = 6d3db235-e538-465d-a436-f128c640bd9a

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
};

const recipeObject = function(recipe){
  console.log(recipe);
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    title: recipe.title,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    //Following key/value is specific to this project and doesnt come from API
    bookmarked: false,
    ...(recipe.key && {key: recipe.key}),
  }
}

export const getRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    const { recipe } = data.data;
    state.recipe = recipeObject(recipe)
    //if a recipe is already bookmarked
    if (state.bookmarks.some(recipe => recipe.id === id))
      state.recipe.bookmarked = true;
  } catch (error) {
    throw error;
  }
};

export const addBookmark = function (recipe) {
  //Add recipe in bookmarks
  state.bookmarks.push(recipe);
  //Update the bookmark status on recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  //Update the local Storage
  updateBookmarkListInLocalStorage();
};

export const deleteBookmark = function (recipe) {
  //Delete recipe in bookmarks
  const deleteLocation = state.bookmarks.findIndex(
    bookmark => bookmark.id === recipe.id
  );
  state.bookmarks.splice(deleteLocation, 1);
  //Update the bookmark status on recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  //Update the local Storage
  updateBookmarkListInLocalStorage();
};

//helper function to get the data from state and store
//Note: This function has side effects
const updateBookmarkListInLocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//clear bookmarks
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};


export const getNewServings = function (newServings) {
  //Updating the change in quantity
  state.recipe.ingredients.forEach(ingredient => {
    //LOGIC: newQt = oldQt * newServing / oldServings // 4 = 2 * 4 / 2
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  //Updating the newServings
  state.recipe.servings = newServings;
};

export const getSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
        title: recipe.title,
        ...(recipe.key && {key: recipe.key}),
      };
    });
    //always show the 1st page whenever user triggers a search
    setCurrentPage(1);
  } catch (error) {
    throw error;
  }
};

//This is a helper function to manipulate state
//Note: This function has side effects
const setCurrentPage = function (page) {
  state.search.currentPage = page;
};

export const getSearchResultsPerPage = function (
  page = state.search.currentPage
) {
  setCurrentPage(page);
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(e => e[0].startsWith('ingredient') && e[1] !== '')
      .map(e => e[1].split(','))
      .map(ing => {
        if (ing.length !== 3)
          throw new Error(
            'Wrong Format!! Ingredients must be entered as following "Quantity, Unit, Description" '
          );

        const [quantity, unit, description] = ing;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    
    const recipeToUpload = {
      publisher: newRecipe.publisher,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.imageUrl,
      cooking_time: newRecipe.cookingTime,
      title: newRecipe.title,
      servings: newRecipe.servings,
      ingredients
    }
    //Send data to the API
    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipeToUpload);
    //Recieve uploaded data and parse it
    const { recipe } = data.data;
    //Update the state with the recently uploaded recipe
    state.recipe = recipeObject(recipe);
    //add the recently uploaded recipe to bookmarks
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

//A initialization function to get the data from local storage
const init = () => {
  //get data from storage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //if bookmarks exist in storage - update the state
  if (bookmarks) state.bookmarks = bookmarks;
};

init();
//clearBookmarks();