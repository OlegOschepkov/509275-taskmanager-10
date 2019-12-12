import BoardComponent from './components/board.js';
import BoardController from './controllers/board-controller.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';

const TASKS_COUNT = 22;

const mainElement = document.querySelector(`main`);
const headerElement = mainElement.querySelector(`.main__control`);

render(headerElement, new SiteMenuComponent(), RenderPosition.BEFOREEND);

const filters = generateFilters();
render(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const boardComponent = new BoardComponent();
render(mainElement, boardComponent, RenderPosition.BEFOREEND);

const tasks = generateTasks(TASKS_COUNT);

const boardController = new BoardController(boardComponent);

boardController.render(tasks);
