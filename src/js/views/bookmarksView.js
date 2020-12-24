import View from './View.js';
import RecipePreview from "./recipePreview.js";

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks to show';
  _generateMarkup({ bookmarks }) {
    const markup = bookmarks.map(RecipePreview).join('');
    return markup;
  }
}

export default new BookmarksView();
