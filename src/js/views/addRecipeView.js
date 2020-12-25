import View from './View.js';


class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor(){
      super();
  }

  
}

export default new AddRecipeView();