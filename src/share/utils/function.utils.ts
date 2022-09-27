export const randomize = (size, cnt) => {
  if (cnt > size) {
    return undefined;
  }
  const ret = [];
  while (ret.length < cnt) {
    const temp = Math.floor(Math.random() * size + 1);
    if (ret.indexOf(temp) === -1) {
      ret.push(temp);
    }
  }
  return ret;
};
