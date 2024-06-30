import {renderApp, greetUser, renderTasks} from './modules/render.js';
import {openModal, closeModal} from './modules/createElements.js';
import {getUserTasks} from './modules/serviceStorage.js';
import {
  addTaskControl,
  removeTaskControl,
  editTaskControl,
  completeTaskControl,
  showOrHiddenEmpty,
} from './modules/controls.js';

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);

    const {
      confirmOverlay,
      loginOverlay,
      confirmForm,
      emptyElem,
      loginForm,
      list,
      form,
    } = renderApp(app);
    openModal(loginOverlay);

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const userName = formData.get('user-name');
      greetUser(app, userName);

      const userTasks = getUserTasks(userName);
      renderTasks(list, userTasks);
      showOrHiddenEmpty(list, emptyElem);

      addTaskControl(form, list, userName, emptyElem);
      editTaskControl(list, userName);
      completeTaskControl(list, userName);
      removeTaskControl(list, userName, confirmOverlay, confirmForm, emptyElem);

      closeModal(loginOverlay);
    });
  };

  window.todoInit = init;
}
