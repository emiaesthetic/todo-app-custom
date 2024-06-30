import {
  createEmptyToDo,
  createContainer,
  createTitle,
  createTaskForm,
  createTable,
  createLoginForm,
  createRow,
} from './createElements.js';

export const renderApp = (app) => {
  const container = createContainer();
  container.classList.add('app__container');

  const {overlayLogin, loginForm} = createLoginForm();

  const form = createTaskForm();
  const emptyElem = createEmptyToDo();
  const table = createTable();

  container.append(overlayLogin, form, emptyElem, table);
  app.append(container);
  app.container = container;

  return {
    list: table.tbody,
    overlayLogin,
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
