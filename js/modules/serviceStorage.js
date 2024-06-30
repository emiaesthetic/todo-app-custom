const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || {};

export const getUserTasks = (userName) => {
  const accounts = getStorage('accounts');
  return accounts[userName] || [];
};
