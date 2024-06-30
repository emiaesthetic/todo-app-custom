import {createRow, openModal, closeModal} from './createElements.js';
import {getNextTaskID, addUserTask, removeUserTask} from './serviceStorage.js';

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
