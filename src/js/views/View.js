import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup(this._data);
    this._clearAndInsert(markup);
  }
  _clearAndInsert(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //Lodaing Spinner Helper Function
  loadingSpinner() {
    const html = `
            <div class="spinner">
            <svg>
            <use href="${icons}#icon-loader"></use>
            </svg>
            </div>
          `;
    this._clearAndInsert(html);
  }
  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clearAndInsert(markup);
  }
  renderMessage(message = this._message) {
    const markup = `        
            <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clearAndInsert(markup);
  }
}
