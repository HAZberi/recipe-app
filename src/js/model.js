import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './helper.js';
// https://forkify-api.herokuapp.com/v2
// APIKEY = 9222b988-7d5e-4f74-8033-893570dc4c4d
export const state = {
  recipe: {},
  search: {
    query: '',
    results: []
  }
};

export const getRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
  } catch (error) {
    throw error;
  }
};

export const getSearchResults = async function(query){
  try{
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
        title: recipe.title
      }
    })
  }catch(error){
    throw error;
  }
}