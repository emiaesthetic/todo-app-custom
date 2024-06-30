export const createEmptyToDo = () => {
  const emptyElem = document.createElement('div');
  emptyElem.classList.add('empty');
  emptyElem.insertAdjacentHTML('afterbegin', `
      <img
        class="empty__image"
        src="/img/empty.svg"
        aria-hidden="true"
        alt=""
        width="221" height="174" loading="lazy"
      >
      <span class="empty__text">Empty...</span>
    `);

  return emptyElem;
};

export const showEmptyToDo = (emptyElem) => {
  emptyElem.classList.add('empty--active');
};

export const hiddenEmptyToDo = (emptyElem) => {
  emptyElem.classList.remove('empty--active');
};

export const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};

export const createTitle = (userName) => {
  const h1 = document.createElement('h1');
  h1.classList.add('app__title');
  h1.textContent = `Hi, ${userName}. Your to-do list: `;

  return h1;
};

const createButton = ({className, type, text}) => {
  const button = document.createElement('button');
  button.className = className;
  button.type = type;
  button.textContent = text;

  return button;
};

export const createTaskForm = () => {
  const form = document.createElement('form');
  form.classList.add('form', 'app__form');
  form.insertAdjacentHTML('afterbegin', `
        <input
          class="form__input"
          type="text"
          name="desc"
          placeholder="Enter a task..."
        >
        <div class="select-wrapper">
          <select class="select" name="priority">
            <option value="common" selected>Common</option>
            <option value="important">Important</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
    `);

  const btnAdd = createButton({
    className: 'button button-reset add',
    type: 'submit',
    text: 'Add',
  });
  btnAdd.disabled = true;

  const btnReset = createButton({
    className: 'button button-reset reset',
    type: 'reset',
    text: 'Reset',
  });

  form.append(btnAdd, btnReset);
  form.btnAdd = btnAdd;

  return form;
};

export const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table');

  const tbody = document.createElement('tbody');
  tbody.classList.add('table__body');

  table.append(tbody);
  table.tbody = tbody;

  return table;
};

const createColumn = ({className, text}) => {
  const td = document.createElement('td');
  td.classList.add('table__date', ...className.split(' '));
  td.insertAdjacentHTML('afterbegin', text);

  return td;
};

export const createRow = ({id, desc, status, priority}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');
  tr.dataset.id = id;

  const checkboxHTML = `
    <input
      class="checkbox__custom-input ${priority}"
      type="checkbox"
      name="checkbox"
      ${status ? 'checked' : ''}
    >
  `;

  const tdCheckbox = createColumn({className: 'checkbox', text: checkboxHTML});
  const tdDesc = createColumn({
    className: status ? 'desc table__data--complete' : 'desc',
    text: desc,
  });
  const tdStatus = createColumn({
    className: 'status',
    text: status ? 'Done' : 'Process',
  });
  const tdAction = createColumn({className: 'buttons', text: ''});

  const btnEdit = createButton({
    className: 'table__button button button-reset edit',
    type: 'button',
    text: 'Edit',
  });
  btnEdit.disabled = status;

  const btnDelete = createButton({
    className: 'table__button button button-reset delete',
    type: 'button',
    text: 'Delete',
  });

  tdAction.append(btnEdit, btnDelete);
  tr.append(tdCheckbox, tdDesc, tdStatus, tdAction);

  return tr;
};

export const createLoginForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const container = createContainer();

  const form = document.createElement('form');
  form.classList.add('modal');
  form.insertAdjacentHTML('afterbegin', `
      <h2 class="modal__title">Login</h2>
      <input
        class="modal__input"
        type="text"
        name="user-name"
        placeholder="Input your name..."
      >
    `);

  const btnEnter = createButton({
    className: 'modal__button button button-reset enter',
    type: 'submit',
    text: 'Enter',
  });

  form.append(btnEnter);
  container.append(form);
  overlay.append(container);

  return {
    loginOverlay: overlay,
    loginForm: form,
  };
};

export const openModal = (overlay) => {
  overlay.classList.add('overlay--active');
};

export const closeModal = (overlay) => {
  overlay.classList.remove('overlay--active');
};

export const createConfirmForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const container = createContainer();

  const form = document.createElement('form');
  form.classList.add('modal', 'modal--confirm');

  const question = document.createElement('p');
  question.classList.add('modal__text');
  question.textContent = 'Are you sure you want to delete the task?';

  const btnGroup = document.createElement('div');
  btnGroup.classList.add('modal__btn-group');

  const btnCancel = createButton({
    className: 'modal__button button button-reset cancel',
    type: 'button',
    text: 'Cancel',
  });

  const btnApply = createButton({
    className: 'modal__button button button-reset apply',
    type: 'button',
    text: 'Apply',
  });

  btnGroup.append(btnCancel, btnApply);
  form.append(question, btnGroup);
  container.append(form);
  overlay.append(container);

  return {
    confirmOverlay: overlay,
    confirmForm: form,
  };
};
