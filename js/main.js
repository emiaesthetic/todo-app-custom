import {renderApp, greetUser} from './modules/render.js';
import {openModal, closeModal} from './modules/createElements.js';

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);

    const {overlayLogin, loginForm} = renderApp(app);
    openModal(overlayLogin);

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const userName = formData.get('user-name');
      greetUser(app, userName);

      closeModal(overlayLogin);
    });
  };

  window.todoInit = init;
}
