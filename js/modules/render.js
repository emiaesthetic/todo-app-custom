import {
  createEmptyToDo,
  createContainer,
  createTitle,
  createTaskForm,
  createTable,
  createLoginForm,
  createRow,
  createConfirmForm,
} from './createElements.js';

export const renderApp = (app) => {
  const container = createContainer();
  container.classList.add('app__container');

  const {loginOverlay, loginForm} = createLoginForm();
  const {confirmOverlay, confirmForm} = createConfirmForm();

  const form = createTaskForm();
  const emptyElem = createEmptyToDo();
  const table = createTable();

  container.append(form, emptyElem, table);
  app.append(container, loginOverlay, confirmOverlay);
  app.container = container;

  return {
    list: table.tbody,
    confirmOverlay,
    loginOverlay,
    confirmForm,
    loginForm,
    form,
  };
};

export const greetUser = (app, userName) => {
  const title = createTitle(userName);
  app.container.prepend(title);
};

export const renderTasks = (list, tasks) => {
  const allRow = tasks.map(createRow);
  list.append(...allRow);
  return allRow;
};
