import View from './View.js';
import RecipePreview from './recipePreview.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'No bookmarks available. Find a recipe and bookmark it.';
  _generateMarkup({ bookmarks }) {
    if (Array.isArray(bookmarks) && bookmarks.length === 0)
      throw new Error('No Bookmarks available');
    const markup = bookmarks.map(RecipePreview).join('');
    return markup;
  }
  handleStorageBookmarks(showBookmarksFromStorage) {
    window.addEventListener('load', showBookmarksFromStorage);
  }
}
export default new BookmarksView();
