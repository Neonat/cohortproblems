function numbers(l) {
  var o = [];
  for (let i in l) {
    var n = parseInt(l[i], 10);
    if (!isNaN(n)) {
      o.push(n);
    }
  }
  return o;
}

function lt(a, b) {
    if (a < b) {
        return a;
    } else {
        return b;
    }
}

function gt(a, b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}   
// input: an array of numbers
// output: an object containing 'min', with the minimum of the array
//          and 'max' the maximum of the array.
function min_max(a) {
    for (let i in a) {
        min = a[0];
        max = a[0];
        var n = a[i];
        lt(n, min);
        gt(n, max);
    }
  // TODO: fixme
  return { min: min, max: max };
}

function handleButton1Click() {
  var textbox1 = document.getElementById("textbox1");
  var min = document.getElementById("min");
  var max = document.getElementById("max");
  var items = textbox1.value.split(",");
  var obj = min_max(numbers(items));
  min.innerHTML = obj["min"];
  max.innerHTML = obj["max"];
  var span1 = document.getElementById("span1");
  span1.innerHTML = textbox1.value;
}

function run() {
  var button1 = document.getElementById("button1");
    button1.addEventListener("click", handleButton1Click);
    consolele.log("run");
}

document.addEventListener("DOMContentLoaded", run);