import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');

  constructor() {
    super();
    //Listen for open and close event right at initialization
    this._showModalWindowListener();
    this._hideModalWindowListener();
  }

  _toggleHiddenElements() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _showModalWindowListener() {
    this._btnOpen.addEventListener(
      'click',
      this._toggleHiddenElements.bind(this)
    );
  }
  _hideModalWindowListener() {
    [this._btnClose, this._overlay, this._btnUpload].forEach(el =>
      el.addEventListener('click', this._toggleHiddenElements.bind(this))
    );
  }
  submitRecipeListener(getNewlyAddedRecipe) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const getData = new FormData(this._parentElement);
      const dataObject = Object.fromEntries([...getData]);
      getNewlyAddedRecipe(dataObject);
    });
  }
}

export default new AddRecipeView();
