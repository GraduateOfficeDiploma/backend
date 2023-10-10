export const pickRandomArrayElements = (arr: any[], amountToPick: number) => {
  if (arr.length < amountToPick) return arr;
  const pickedArr = [] as any[];
  for (let i = 0; i < amountToPick; i++) {
    const idx = Math.floor(Math.random() * arr.length);
    pickedArr.push(arr[idx]);
    arr.splice(idx, 1);
  }
  return pickedArr;
};
