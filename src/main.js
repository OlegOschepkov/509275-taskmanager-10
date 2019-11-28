import {getBoardTempl} from './components/board';
import {getMenuTempl} from './components/menu';
import {getFilterTempl} from './components/filter';
import {getCardTempl} from './components/card';
import {getCardEditTempl} from './components/card-edit';
import {getLoadMoreBtnTempl} from './components/load-more-btn';

const TASKS_COUNT = 3;



const render = (container, temlate, place) => {
  container.insertAdjacentHTML(place, temlate);
};

const mainElem = document.querySelector(`main`);
const headerElem = mainElem.querySelector(`.main__control`);

render(headerElem, getMenuTempl(), `beforeend`);
render(mainElem, getFilterTempl(), `beforeend`);
render(mainElem, getBoardTempl(), `beforeend`);

const listElem = mainElem.querySelector(`.board__tasks`);

render(listElem, getCardEditTempl(), `beforeend`);

new Array(TASKS_COUNT).fill(``).forEach(() =>
  render(listElem, getCardTempl(), `beforeend`)
);

const boardElem = mainElem.querySelector(`.board`);

render(boardElem, getLoadMoreBtnTempl(), `beforeend`);
