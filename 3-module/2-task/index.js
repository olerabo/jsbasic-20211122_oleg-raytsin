function filterRange(arr, a, b) {
  // ваш код...
  let filteredArr = [];
  
  for (let number of arr) {
    if ( number >= a && number <= b ) {
      filteredArr.push(number);
    }
  }
  return filteredArr;
}
