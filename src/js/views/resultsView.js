import View from './View.js';
import RecipePreview from "./recipePreview.js";

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No results found. Please search for something else or try again.';
  _generateMarkup(results) {
    const markup = results.map(RecipePreview).join('');
    return markup;
  }
}

export default new ResultsView();
