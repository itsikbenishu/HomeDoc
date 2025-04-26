export const getUniqueId = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    res += chars[randomIndex];
  }

  return res;
};

export const toItemsWithIds = (items) => {
  return items.map((item) => ({
    ...item,
    id: getUniqueId(),
  }));
};

export const toItemWithId = (item) => {
  return {
    ...item,
    id: getUniqueId(),
  };
};
