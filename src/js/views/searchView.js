class SearchView {
    #searchContainer = document.querySelector('.search');
    getQuery(){
        return this.#searchContainer.querySelector(".search__field").value;
    }
}