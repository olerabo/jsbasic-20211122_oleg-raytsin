function camelize(str) {
  let arrSplitted = str.split('-');
  let arrResult = [arrSplitted.shift()];
  
  for (let a of arrSplitted) {
    arrResult.push(a[0].toUpperCase() + a.slice(1));
  }
  
  return arrResult.join("");
}