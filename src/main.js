import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-btn.js';
import CardComponent from './components/card.js';
import CardEditComponent from './components/card-edit.js';
import SiteMenuComponent from './components/menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const cardComponent = new CardComponent(task);
  const cardEditComponent = new CardEditComponent(task);

  const editButton = cardComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    listElement.replaceChild(cardEditComponent.getElement(), cardComponent.getElement());
  });

  const editForm = cardEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    listElement.replaceChild(cardComponent.getElement(), cardEditComponent.getElement());
  });

  render(listElement, cardComponent.getElement(), RenderPosition.BEFOREEND);
};

const mainElement = document.querySelector(`main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, new SiteMenuComponent().getElement(), RenderPosition.BEFOREEND);

const filters = generateFilters();

render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();

render(mainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

const listElement = boardComponent.getElement().querySelector(`.board__tasks`);

const tasks = generateTasks(TASKS_COUNT);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(0, showingTasksCount).forEach((task) =>  renderTask(task));

const loadMoreButtonComponent = new LoadMoreButtonComponent();

render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(renderTask(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }
});
