import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  handleEventListener(movePagination) {
    this._parentElement.addEventListener('click', e => {
      const paginationButton = e.target.closest('.btn--inline');
      if (!paginationButton) return;
      //type coercion required
      const pageToGo = +paginationButton.dataset.target;
      movePagination(pageToGo);
    });
  }

  _generateMarkup({ currentPage, results, resultsPerPage }) {
    const totalPages = Math.ceil(results.length / resultsPerPage);
    console.log('Total Pages:', totalPages);
    //if there are more than one page
    if (currentPage === 1 && totalPages > 1)
      //type coercion required
      return this._generateButtonMarkup(currentPage * 1 + 1, 'next');
    //if current page is the last page
    if (currentPage === totalPages && totalPages > 1)
      return this._generateButtonMarkup(currentPage - 1, 'prev');
    //if current page is a middle page
    if (currentPage > 1 && currentPage < totalPages)
      return [
        this._generateButtonMarkup(currentPage - 1, 'prev'),
        //type coercion required
        this._generateButtonMarkup(currentPage * 1 + 1, 'next'),
      ].join('');
    //if there is only one page
    return '';
  }
  _generateButtonMarkup(pageNumber, direction) {
    return `
    <button data-target=${pageNumber} class="btn--inline pagination__btn--${direction}">
        ${
          direction === 'prev'
            ? `
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${pageNumber}</span>`
            : `
        <span>Page ${pageNumber}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>`
        }
    </button>
    `;
  }
}

export default new PaginationView();
