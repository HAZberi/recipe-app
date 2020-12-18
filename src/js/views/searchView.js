class SearchView {
  #searchContainer = document.querySelector('.search');
  getQuery() {
    const query = this.#searchContainer.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#searchContainer.querySelector('.search__field').value = '';
  }
  handleEventListener(showSearchResults) {
    this.#searchContainer.addEventListener('submit', e => {
      e.preventDefault();
      showSearchResults();
    });
  }
}

export default new SearchView();
