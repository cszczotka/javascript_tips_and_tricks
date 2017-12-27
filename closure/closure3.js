function add (a) {
  return function (b) {
    return a + b;
  }
}

var add3 = add(3);
console.log(add3(4));