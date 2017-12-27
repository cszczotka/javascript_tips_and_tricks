function makeCounter () {
  var count = 0;
  return function () {
    count += 1;
    return count;
  }
}
var x = makeCounter();
console.log(x());
console.log(x());
console.log(x());