import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  _generateMarkup({ currentPage, results, resultsPerPage}){
    const totalPages = Math.ceil(results.length / resultsPerPage);
    console.log(totalPages);
    //if there are more than one page
    if(currentPage === 1 && totalPages>1){
        return "1st page and others";
    }
    //if current page is the last page
    if(currentPage === totalPages){
        return "last page";
    }
    //if current page is a middle page
    if(currentPage > 1 && currentPage < totalPages){
        return "its a middle page";
    }
    //if there is only one page
    return "";
  }
  
}

export default new PaginationView();