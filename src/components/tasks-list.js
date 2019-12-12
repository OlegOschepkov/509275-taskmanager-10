import AbstractComponent from './abstract-component.js';

const getTasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getTemplate() {
    return getTasksTemplate();
  }
}
