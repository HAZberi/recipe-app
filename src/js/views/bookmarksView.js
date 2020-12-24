import View from './View.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks to show';
  _generateMarkup({ bookmarks }) {
    const markup = bookmarks.map(this._generateListItem).join('');
    return markup;
  }
  _generateListItem(recipe) {
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${id === recipe.id? 'preview__link--active': '' }" href="#${recipe.id}">
            <figure class="preview__fig">
                <img src="${recipe.imageUrl}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
            </div>
            </a>
        </li>`;
  }
}

export default new BookmarksView();