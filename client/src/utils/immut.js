export const immutPush = (arr, val) => { 
  let newArr = arr.slice(0)
  newArr.push(val);
  return newArr;
};

export const immutAssign = (obj, key, val) => {
  let copy = {...obj};
  copy[key] = val;
  return copy;
}
