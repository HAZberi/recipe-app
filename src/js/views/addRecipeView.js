import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');
  _errorMessage = "Recipe cannot be added. Please refresh and try again. Sorry for inconvenience!"
  _message = "Recipe has been sucessfully uploaded";
  constructor() {
    super();
    //Listen for open and close event right at initialization
    this._showModalWindowListener();
    this._hideModalWindowListener();
  }

  toggleHiddenElements() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _showModalWindowListener() {
    this._btnOpen.addEventListener(
      'click',
      this.toggleHiddenElements.bind(this)
    );
  }
  _hideModalWindowListener() {
    [this._btnClose, this._overlay].forEach(el =>
      el.addEventListener('click', this.toggleHiddenElements.bind(this))
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
}

export default new AddRecipeView();

