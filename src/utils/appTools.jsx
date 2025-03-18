export const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[-_](.)/g, (match, char) => char.toUpperCase());
};

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

export const getTimer = (time) => {
  const addZero = (number) => (number < 10 ? "0" + number : number);
  const seconds = addZero(time % 60);
  const minutes = addZero(Math.floor(time / 60) % 60);
  const hours = addZero(Math.floor(time / 3600));

  return hours + ":" + minutes + ":" + seconds;
};

export const insertObjToSortedArr = (array, obj, feild) => {
  console.log("insertObjToSortedArr  יכול לעזור אם אחליט על כפתור מיון");

  let start = array.findIndex((elem) => !isNaN(elem[feild]));
  let end = array.length - 1;
  let middle = -1;
  let i = 0;
  let res = [...array];

  if (end === 0) {
    return [obj];
  }
  if (start === -1) {
    if (isNaN(obj[feild])) {
      res.splice(0, 0, obj);
    } else {
      res.splice(end, 0, obj);
    }
    return array;
  }

  while (end > start) {
    middle = Math.floor((start + end) / 2);
    start = array[middle][feild] * 1 < obj[feild] * 1 ? start : middle + 1;
    end = array[middle][feild] * 1 < obj[feild] * 1 ? middle - 1 : end;

    i++;
    if (i === array.length) return [];
  }
  console.log(middle);

  res.splice(middle, 0, obj);
  console.log(res);

  return res;
};
