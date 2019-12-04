import {getBoardTemplate} from './components/board';
import {getMenuTemplate} from './components/menu';
import {getFilterTemplate} from './components/filter';
import {getCardTemplate} from './components/card';
import {getCardEditTemplate} from './components/card-edit';
import {getLoadMoreBtnTemplate} from './components/load-more-btn';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, temlate, place) => container.insertAdjacentHTML(place, temlate);

const mainElement = document.querySelector(`main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, getMenuTemplate(), `beforeend`);

const filters = generateFilters();
render(mainElement, getFilterTemplate(filters), `beforeend`);

render(mainElement, getBoardTemplate(), `beforeend`);

const listElement = mainElement.querySelector(`.board__tasks`);

const tasks = generateTasks(TASKS_COUNT);

render(listElement, getCardEditTemplate(tasks[0]), `beforeend`);

const boardElement = mainElement.querySelector(`.board`);
render(boardElement, getLoadMoreBtnTemplate(), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(listElement, getCardTemplate(task), `beforeend`));

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(listElement, getCardTemplate(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
