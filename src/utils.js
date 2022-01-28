export const setWithExpiry = (key, value, ttl) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  //compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If item is expired, delete the item from storage
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const removeItemLocalStorage = (key) => {
  localStorage.removeItem(key);
};
