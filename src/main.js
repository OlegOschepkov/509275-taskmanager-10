import BoardComponent from './components/board.js';
import BoardController from './controllers/board-controller.js';
import TasksModel from './models/tasks.js';
import FilterController from './controllers/filter-controller.js';
import SiteMenuComponent from './components/menu.js';
import {generateTasks} from './mock/task.js';
import {render, RenderPosition} from './utils/render.js';

const TASKS_COUNT = 22;

const mainElement = document.querySelector(`main`);
const headerElement = mainElement.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuComponent();

// Быстрое решение для подписки на клик по кнопке.
// Это противоречит нашей архитектуре работы с DOM-элементами, но это временное решение.
// Совсем скоро мы создадим полноценный компонент для работы с меню.
siteMenuComponent.getElement().querySelector(`.control__label--new-task`)
  .addEventListener(`click`, () => {
    boardController.createTask();
  });

render(headerElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASKS_COUNT);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterController = new FilterController(mainElement, tasksModel);
filterController.render();

const boardComponent = new BoardComponent();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);

const boardController = new BoardController(boardComponent, tasksModel);

boardController.render();
