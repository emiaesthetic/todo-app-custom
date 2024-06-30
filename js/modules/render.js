import {
  createEmptyToDo,
  createContainer,
  createTitle,
  createTaskForm,
  createTable,
  createLoginForm,
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
    overlayLogin,
    loginForm,
  };
};

export const greetUser = (app, userName) => {
  const title = createTitle(userName);
  app.container.prepend(title);
};
