const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || {};

const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUserTasks = (userName) => {
  const accounts = getStorage('accounts');
  return accounts[userName] || [];
};

export const getNextTaskID = (userName) => {
  const userTasks = getUserTasks(userName);
  return userTasks.length ? userTasks.at(-1).id + 1 : 1;
};

export const addUserTask = (userName, task) => {
  const accounts = getStorage('accounts');
  const userTasks = getUserTasks(userName);

  task.status = false;
  userTasks.push(task);
  accounts[userName] = userTasks;

  setStorage('accounts', accounts);
};

export const removeUserTask = (userName, taskID) => {
  const accounts = getStorage('accounts');
  const userTasks = getUserTasks(userName);

  accounts[userName] = userTasks.filter((task) => task.id !== +taskID);

  setStorage('accounts', accounts);
};

export const editUserTask = (userName, taskID, newDesc) => {
  const accounts = getStorage('accounts');
  const userTasks = getUserTasks(userName);

  accounts[userName] = userTasks.map((task) => {
    task.desc = task.id === +taskID ? newDesc : task.desc;
    return task;
  });

  setStorage('accounts', accounts);
};

export const completeUserTask = (userName, taskID) => {
  const accounts = getStorage('accounts');
  const userTasks = getUserTasks(userName);

  accounts[userName] = userTasks.map((task) => {
    task.status = task.id === +taskID ? !task.status : task.status;
    return task;
  });

  setStorage('accounts', accounts);
};
