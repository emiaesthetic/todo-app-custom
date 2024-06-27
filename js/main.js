import {renderApp} from './modules/render.js';
{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    renderApp(app);
  };

  window.todoInit = init;
}
