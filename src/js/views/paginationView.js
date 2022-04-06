import View from "./View";
import icons from 'url:../../img/icons.svg';

class PagintionView extends View{
_parentElement = document.querySelector('.pagination');

addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline');
        console.log(btn);
        if(!btn) return;
        const gotoPage = +btn.dataset.goto;
        console.log(gotoPage);
        handler(gotoPage);
    })
}
_pageNum(page){
  return `
   <span class="pageNum"> ${page}</span>
  `
}
_generateMarkup(){
    const curPage = this._data.page;
const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
console.log(numPages);


    //Page 1 and there are other pages
    if(curPage === 1 && numPages > 1){
 return `
 <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
 <span>Page ${curPage +1}</span>
 <svg class="search__icon">
   <use href="${icons}#icon-arrow-right"></use>
 </svg>
</button>
${this._pageNum(curPage)}
` ; 
    }
    
    
    //Last page
    if(curPage === numPages && numPages > 1){
        return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                   <svg class="search__icon">
                     <use href="${icons}#icon-arrow-left"></use>
                   </svg>
                   <span>Page ${curPage -1}</span>
                 </button>
                 ${this._pageNum(curPage)}
        `;
    }
    //Other page
    if(curPage < numPages){
        return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                   <svg class="search__icon">
                     <use href="${icons}#icon-arrow-left"></use>
                   </svg>
                   <span>Page ${curPage -1}</span>
                 </button>
<button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
 <span>Page ${curPage +1}</span>
 <svg class="search__icon">
   <use href="${icons}#icon-arrow-right"></use>
 </svg>
</button>
${this._pageNum(curPage)}  `;
    }
    //Page 1 and there are NO other pages
    return `${this._pageNum(curPage)}`;
}
}

export default new PagintionView();