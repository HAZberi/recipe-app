import { async } from "regenerator-runtime"
  // https://forkify-api.herokuapp.com/v2
  // APIKEY = 9222b988-7d5e-4f74-8033-893570dc4c4d
export const state = {
    recipe: {}
}

export const getRecipe = async function(id){
    try{
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
            );
            const data = await res.json();
            if (!res.ok) throw new Error(`Error: ${data.message} (${res.status})`);
            
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
    }
    catch(error){
        console.log(error);
    }
}