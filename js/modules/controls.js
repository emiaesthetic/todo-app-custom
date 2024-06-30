import {createRow, openModal, closeModal} from './createElements.js';
import {
  getNextTaskID,
  addUserTask,
  removeUserTask,
  editUserTask,
  completeUserTask,
} from './serviceStorage.js';

const addTaskPage = (list, task) => {
  const taskRow = createRow(task);
  list.append(taskRow);
};

export const addTaskControl = (form, list, userName) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    newTask.id = getNextTaskID(userName);

    addUserTask(userName, newTask);
    addTaskPage(list, newTask);

    form.reset();
    form.btnAdd.disabled = true;
  });

  form.addEventListener('reset', () => {
    form.btnAdd.disabled = true;
  });

  form.addEventListener('input', () => {
    form.btnAdd.disabled = !form.desc.value.trim();
  });
};

export const removeTaskControl = (
    list,
    userName,
    confirmOverlay,
    confirmForm,
) => {
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.delete')) {
      openModal(confirmOverlay);
      confirmForm.addEventListener('click', (e) => {
        e.preventDefault();

        const userAnswer = !e.target.closest('.cancel');
        if (userAnswer) {
          const row = target.closest('tr');
          removeUserTask(userName, row.dataset.id);
          row.remove();
        }
        closeModal(confirmOverlay);
      });
    }
  });
};

export const editTaskControl = (list, userName) => {
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.edit')) {
      const row = target.closest('tr');
      const desc = row.querySelector('.desc');
      desc.contentEditable = 'true';

      desc.addEventListener('blur', () => {
        desc.contentEditable = false;
        editUserTask(userName, row.dataset.id, desc.textContent);
      });
    }
  });
};

export const completeTaskControl = (list, userName) => {
  list.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.checkbox__custom-input')) {
      const row = target.closest('tr');
      const checkbox = row.querySelector('.checkbox__custom-input');
      const desc = row.querySelector('.desc');
      const status = row.querySelector('.status');
      const btnEdit = row.querySelector('.edit');

      desc.classList.toggle('table__data--complete');
      if (checkbox.checked) {
        status.textContent = 'Done';
        btnEdit.disabled = true;
      } else {
        status.textContent = 'Process';
        btnEdit.disabled = false;
      }

      completeUserTask(userName, row.dataset.id);
    }
  });
};
