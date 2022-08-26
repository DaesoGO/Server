export const validationNullORUndefined = (data?: string | object): boolean => {
  if (data === undefined || data === null) {
    return true;
  }
  return false;
};

export const validataionTwoValueNullORUndefined = (
  dataFi: string | object,
  dataSc: string | object,
): boolean => {
  if (dataFi !== dataSc) {
    return true;
  }
  return false;
};
