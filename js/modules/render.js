import {
  createEmptyToDo,
  createContainer,
  createTitle,
  createTaskForm,
  createTable,
} from './createElements.js';

export const renderApp = (app) => {
  const container = createContainer();
  container.classList.add('app__container');

  const title = createTitle();
  const form = createTaskForm();
  const emptyElem = createEmptyToDo();
  const table = createTable();

  container.append(title, form, emptyElem, table);
  app.append(container);
};
