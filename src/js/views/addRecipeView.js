import View from './View.js';
import icons from '../../img/icons.svg';
import { MODAL_WINDOW_ANIMATION_TIMEOUT } from '../config.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');
  _errorMessage =
    'Recipe cannot be added. Please refresh and try again. Sorry for inconvenience!';
  _message = 'Recipe has been sucessfully uploaded';
  constructor() {
    super();
    //Listen for open and close event right at initialization
    this._showModalWindowListener();
    this._hideModalWindowListener();
  }

  _toggleHiddenElements() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
    this._formReset();
  }

  _formReset() {
    if (this._window.classList.contains('hidden')) {
      setTimeout(() => {
        const markup = this._generateMarkup();
        this._clearAndInsert(markup);
      }, MODAL_WINDOW_ANIMATION_TIMEOUT * 1000);
    }
  }
  closeModalAfterTimeOut() {
    if (
      this._window.classList.contains('hidden') ||
      document.querySelector('.upload__heading')
    )
      return;
    this._window.classList.add('hidden');
    this._overlay.classList.add('hidden');
    this._formReset();
  }

  _showModalWindowListener() {
    this._btnOpen.addEventListener(
      'click',
      this._toggleHiddenElements.bind(this)
    );
  }
  _hideModalWindowListener() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this._toggleHiddenElements.bind(this))
    );
  }

  submitRecipeListener(uploadNewRecipe) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const getData = new FormData(this._parentElement);
      const dataObject = Object.fromEntries([...getData]);
      uploadNewRecipe(dataObject);
    });
  }
  _generateMarkup() {
    return `
        <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="" required name="title" type="text" />
          <label>URL</label>
          <input value="" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="" required name="imageUrl" type="text" />
          <label>Publisher</label>
          <input value="" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
          <label>Ingredient 2</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-2"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=""
            type="text"
            required
            name="ingredient-3"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity, Unit, Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>`;
  }
}

export default new AddRecipeView();
