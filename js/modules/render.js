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

  const title = createTitle();
  const form = createTaskForm();
  const emptyElem = createEmptyToDo();
  const table = createTable();

  container.append(overlayLogin, title, form, emptyElem, table);
  app.append(container);

  return {
    overlayLogin,
    loginForm,
  };
};
