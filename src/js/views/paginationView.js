import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currPage, 'right');
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currPage, 'left');
    }
    // Other page
    if (currPage < numPages) {
      return `
      ${this._generateMarkupButton(currPage, 'left')}
      ${this._generateMarkupButton(currPage, 'right')}`;
    }
    //page 1 and there no other pages
    return '';
  }
  _generateMarkupButton(currPage, direction) {
    const goto = direction === 'left' ? `${currPage - 1}` : `${currPage + 1}`;
    return `
    <button data-goto='${goto}'class="btn--inline pagination__btn--${
      direction === 'left' ? 'prev' : 'next'
    }">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
        <span>Page ${goto}</span>
    </button>
    `;
  }
}
export default new PaginationView();
