import {getBoardTempl} from './components/board';
import {getMenuTempl} from './components/menu';
import {getFilterTempl} from './components/filter';
import {getCardTempl} from './components/card';
import {getCardEditTempl} from './components/card-edit';
import {getLoadMoreBtnTempl} from './components/load-more-btn';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASKS_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const render = (container, temlate, place) => container.insertAdjacentHTML(place, temlate);

const mainElem = document.querySelector(`main`);
const headerElem = mainElem.querySelector(`.main__control`);

render(headerElem, getMenuTempl(), `beforeend`);

const filters = generateFilters();
render(mainElem, getFilterTempl(filters), `beforeend`);

render(mainElem, getBoardTempl(), `beforeend`);

const listElem = mainElem.querySelector(`.board__tasks`);

const tasks = generateTasks(TASKS_COUNT);

render(listElem, getCardEditTempl(tasks[0]), `beforeend`);

const boardElement = mainElem.querySelector(`.board`);
render(boardElement, getLoadMoreBtnTempl(), `beforeend`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(1, showingTasksCount).forEach((task) => render(listElem, getCardTempl(task), `beforeend`));

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(listElem, getCardTempl(task), `beforeend`));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});

// render(listElem, getCardEditTempl(), `beforeend`);
//
// new Array(TASKS_COUNT).fill(``).forEach(() =>
//   render(listElem, getCardTempl(), `beforeend`)
// );
//
// const boardElem = mainElem.querySelector(`.board`);
//
// render(boardElem, getLoadMoreBtnTempl(), `beforeend`);
