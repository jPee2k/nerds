export const isAvailableStorage = () => {
  try {
    localStorage.setItem('test', 'test-value');
    localStorage.removeItem('test');
    return true;
  } catch (err) {
    return false;
  }
};

export const saveUserData = (fields) => {
  if (!isAvailableStorage()) {
    return;
  }

  try {
    Object.entries(fields).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getUserData = (key) => {
  if (!isAvailableStorage()) {
    return '';
  }

  return localStorage.getItem(key);
};
