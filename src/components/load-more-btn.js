import AbstractComponent from './abstract-component.js';

const getLoadMoreBtnTemplate = () => `<button class="load-more" type="button">load more</button>`;

export default class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return getLoadMoreBtnTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
