import DataResponse from 'src/common/response/DataResponse';

export const randomize = (size: number, cnt: number) => {
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

export const checkHour = () => {
  const hourNow = new Date().getHours();

  if (hourNow >= 0 && hourNow <= 11) {
    return 'breakfast';
  } else if (hourNow >= 12 && hourNow <= 18) {
    return 'lunch';
  } else if (hourNow >= 19 && hourNow <= 23) {
    return 'dinner';
  }
};
