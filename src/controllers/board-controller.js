import LoadMoreButtonComponent from '../components/load-more-btn.js';
import CardComponent from '../components/card.js';
import CardEditComponent from '../components/card-edit.js';
import SortComponent from '../components/sort.js';
import TasksListComponent from '../components/tasks-list.js';
import NoTasksListComponent from '../components/no-tasks-list.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (taskListElement, task) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(cardComponent, cardEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(cardEditComponent, cardComponent);
  };

  const cardComponent = new CardComponent(task);

  cardComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(task);

  cardEditComponent.setSubmitHandler(replaceEditToTask);

  render(taskListElement, cardComponent, RenderPosition.BEFOREEND);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksListComponent = new NoTasksListComponent();
    this._sortComponent = new SortComponent();
    this._tasksListComponent = new TasksListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }
  render(tasks) {
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksListComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksListComponent, RenderPosition.BEFOREEND);

    const listElement = this._tasksListComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    tasks.slice(0, showingTasksCount).forEach((task) => renderTask(listElement, task));

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => renderTask(listElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  };
}
