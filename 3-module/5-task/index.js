function getMinMax(str) {
  let arr = str.split(" ")
    .filter(item => !isNaN(item))
    .map(item => +item);
  
  return {
    min: arr.reduce((min, current) => (min < current) ? min : current),
    max: arr.reduce((max, current) => (max > current) ? max : current),
  };
}