import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No results found. Please search for something else or try again.';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _generateMarkup(results) {
    const markup = results.map(this._generateListItem).join('');
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

export default new ResultsView();
