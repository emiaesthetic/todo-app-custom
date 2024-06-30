import {renderApp, greetUser, renderTasks} from './modules/render.js';
import {openModal, closeModal} from './modules/createElements.js';
import {getUserTasks} from './modules/serviceStorage.js';
import {addTaskControl} from './modules/controls.js';

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);

    const {overlayLogin, loginForm, list, form} = renderApp(app);
    openModal(overlayLogin);

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const userName = formData.get('user-name');
      greetUser(app, userName);

      const userTasks = getUserTasks(userName);
      renderTasks(list, userTasks);

      addTaskControl(form, list, userName);

      closeModal(overlayLogin);
    });
  };

  window.todoInit = init;
}
