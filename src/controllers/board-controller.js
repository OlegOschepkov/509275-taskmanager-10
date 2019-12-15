import LoadMoreButtonComponent from '../components/load-more-btn.js';
// import CardComponent from '../components/card.js';
// import CardEditComponent from '../components/card-edit.js';
import SortComponent, {SortType} from '../components/sort.js';
import TasksListComponent from '../components/tasks-list.js';
import NoTasksListComponent from '../components/no-tasks-list.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import TaskController from './task-controller.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);
    taskController.render(task);
    return taskController;
  })
};

// const renderTask = (taskListElement, task) => {
//   const onEscKeyDown = (evt) => {
//     const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
//
//     if (isEscKey) {
//       replaceEditToTask();
//       document.removeEventListener(`keydown`, onEscKeyDown);
//     }
//   };
//
//   const replaceEditToTask = () => {
//     replace(cardComponent, cardEditComponent);
//   };
//
//   const replaceTaskToEdit = () => {
//     replace(cardEditComponent, cardComponent);
//   };
//
//   const cardComponent = new CardComponent(task);
//
//   cardComponent.setEditButtonClickHandler(() => {
//     replaceTaskToEdit();
//     document.addEventListener(`keydown`, onEscKeyDown);
//   });
//
//   const cardEditComponent = new CardEditComponent(task);
//
//   cardEditComponent.setSubmitHandler(replaceEditToTask);
//
//   render(taskListElement, cardComponent, RenderPosition.BEFOREEND);
// };

// const renderTasks = (taskListElement, tasks) => {
//   tasks.forEach((task) => {
//     renderTask(taskListElement, task);
//   });
// };

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksListComponent = new NoTasksListComponent();
    this._sortComponent = new SortComponent();
    this._tasksListComponent = new TasksListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksListComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksListComponent, RenderPosition.BEFOREEND);

    const listElement = this._tasksListComponent.getElement();

    const newTasks = renderTasks(listElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();

    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const listElement = this._tasksListComponent.getElement();

      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const newTasks = renderTasks(listElement, this._tasks.slice(prevTasksCount, this._showingTasksCount), this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    taskController.render(this._tasks[index]);
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks.slice(0, this._showingTasksCount);
        break;
    }

    const listElement = this._tasksListComponent.getElement();

    listElement.innerHTML = ``;

    const newTasks = renderTasks(listElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
  }
  //   this._sortComponent.setSortTypeChangeHandler((sortType) => {
  //     let sortedTasks = [];
  //
  //     switch (sortType) {
  //       case SortType.DATE_UP:
  //         sortedTasks = tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
  //         break;
  //       case SortType.DATE_DOWN:
  //         sortedTasks = tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
  //         break;
  //       case SortType.DEFAULT:
  //         sortedTasks = tasks.slice(0, showingTasksCount);
  //         break;
  //     }
  //
  //     listElement.innerHTML = ``;
  //     renderTasks(listElement, sortedTasks);
  //     if (sortType === SortType.DEFAULT) {
  //       renderLoadMoreButton();
  //     } else {
  //       remove(this._loadMoreButtonComponent);
  //     }
  //   });
  // }
}
