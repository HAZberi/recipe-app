//setting icons url for parcel
//import icons from "url:../img/icons.svg"; Parcel 2
import icons from '../../img/icons.svg'; // Parcel 1 still works
//Fractional is a library to convert decimal places to fractions
import { Fraction } from 'fractional';
import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage =
    'Recipe not found. Please search for something else or try again.';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  handleEventListeners(showRecipe) {
    ['hashchange', 'load'].forEach(eventType =>
      window.addEventListener(eventType, showRecipe)
    );
  }

  handleServingsListener(changeServings) {
    this._parentElement.addEventListener('click', e => {
      const changeBtn = e.target.closest('.btn--tiny');
      if (!changeBtn) return;
      const newServings = +changeBtn.dataset.updateTo;
      if (newServings < 1) return;
      changeServings(newServings);
    });
  }

  handleBookmarkListener(bookmarker) {
    this._parentElement.addEventListener('click', e => {
      const bookmarkBtn = e.target.closest('.my-bookmark');
      if (!bookmarkBtn) return;
      bookmarker(this._data.recipe);
    });
  }

  _generateListOfIngridentsMarkup({ ingredients }) {
    return ingredients
      ?.map(ing => {
        return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity != null
                  ? new Fraction(ing.quantity).toString()
                  : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit || ''}</span>
                ${ing.description || ''}
              </div>
            </li>
        `;
        //map function is used to create and return li tags for each ingredient
        //join function helps to join all the li tags as one block of html markup
      })
      .join('');
  }
  _generateMarkup({ recipe }) {
    return ` 
        <figure class="recipe__fig">
          <img src=${recipe.imageUrl} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${
                recipe.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${
                recipe.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
          <div class="recipe__info-buttons">
            ${
              recipe.key
                ? `<div class="recipe__user-generated">
                    <svg>
                      <use href="${icons}#icon-user"></use>
                    </svg>
                  </div>`
                : ''
            }
            <button class="btn--round my-bookmark">
              <svg class="">
                <use href="${icons}#icon-bookmark${recipe.bookmarked ? '-fill' : ''}"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._generateListOfIngridentsMarkup(recipe)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${recipe.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
}

export default new RecipeView();
