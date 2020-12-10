import 'regenerator-runtime/runtime';
import "core-js/stable";

const { async } = require('q');

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// APIKEY = 9222b988-7d5e-4f74-8033-893570dc4c4d

///////////////////////////////////////

const getRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcba5'
      /* "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886" */
    );
    const data = await res.json();
    console.log(res, data);
    if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      title: recipe.title,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
    };
    console.log(recipe);
  } catch (err) {
    console.error(err);
  }
};

getRecipe();
