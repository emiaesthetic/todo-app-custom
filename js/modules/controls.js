import {createRow} from './createElements.js';
import {getNextTaskID, addUserTask} from './serviceStorage.js';

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
