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
    min = a[0];
    max = a[0];
    for (let i in a) {
        var n = a[i];
        min = lt(n, min);
        max = gt(n, max);
    }
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
}

function run() {
  var button1 = document.getElementById("button1");
  button1.addEventListener("click", handleButton1Click);
  console.log("run");
}

document.addEventListener("DOMContentLoaded", run);