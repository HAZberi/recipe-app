import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data.results) && data.results.length === 0))
      throw new Error('No Results Available');
    //The data is coming from state === model -> controller -> view
    this._data = data;
    const markup = this._generateMarkup(this._data);
    this._clearAndInsert(markup);
  }
  _clearAndInsert(markup) {
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //Update text and data attribute without re-rendering the entire parentEl
  update(data) {
    //The data is coming from state === model -> controller -> view
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);
    //Creating a virtual dom instance with new markup
    const virtualDOM = document
      .createRange()
      .createContextualFragment(newMarkup);
    //Selecting All the elements in VirtualDOM and converting to Array for comparisons
    const newElements = Array.from(virtualDOM.querySelectorAll('*'));
    //Selecting All the elements in ActualDOM and converting to Array for comparisons
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    //Comparing the two DOMs by looping over
    newElements.forEach((newElement, i) => {
      //check if the nodes are NOT equal
      if (!newElement.isEqualNode(currElements[i])) {
        //Update the attributes
        Array.from(newElement.attributes).forEach(attr =>
          currElements[i].setAttribute(attr.name, attr.value)
        );
        // check if nodes have a nodeValue !== empty
        if (newElement.firstChild?.nodeValue.trim() !== '') {
          //Update the text Content
          currElements[i].textContent = newElement.textContent;
        }
      }
    });
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
