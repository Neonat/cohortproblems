// function numbers(l) {
//   var o = [];
//   for (let i in l) {
//     var n = parseInt(l[i], 10);
//     if (!isNaN(n)) {
//       o.push(n);
//     }
//   }
//   return o;
// }

function numbers(l) {
  var o = [];
  var errors = [];

  for (let i in l) {
    var raw = l[i].trim();

    // skip empty slots (trailing/double commas)
    if (raw === "") continue;

    // reject absolute value notation like |3|
    if (raw.startsWith("|") || raw.endsWith("|")) {
      errors.push('"' + raw + '" — remove the | symbols, just use the number');
      continue;
    }

    // reject modulo/percentage
    if (raw.includes("%")) {
      errors.push('"' + raw + '" — % not supported, just use the number');
      continue;
    }

    // reject space-separated numbers within one slot
    if (/\s/.test(raw)) {
      errors.push('"' + raw + '" — use commas not spaces to separate numbers');
      continue;
    }

    // reject decimals
    if (raw.includes(".")) {
      errors.push('"' + raw + '" — decimals not supported, use whole numbers');
      continue;
    }

    var n = parseInt(raw, 10);

    // reject anything that isn't a clean integer
    if (isNaN(n) || n.toString() !== raw.replace(/^\+/, "")) {
      errors.push('"' + raw + '" — not a valid number');
      continue;
    }

    o.push(n);
  }

  return { values: o, errors: errors };
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

// function handleButton1Click() {
//   var textbox1 = document.getElementById("textbox1");
//   var minEl = document.getElementById("min");
//   var maxEl = document.getElementById("max");
//   var errorEl = document.getElementById("error");
//   var row = document.getElementById("result-row");

//   errorEl.textContent = "";
//   var items = textbox1.value.split(",");
//   var nums = numbers(items);

//   if (nums.length === 0) {
//     errorEl.textContent = "no valid numbers found";
//     row.style.display = "none";
//     return;
//   }

function handleButton1Click() {
  var textbox1 = document.getElementById("textbox1");
  var minEl = document.getElementById("min");
  var maxEl = document.getElementById("max");
  var errorEl = document.getElementById("error");
  var row = document.getElementById("result-row");

  errorEl.textContent = "";
  row.style.display = "none";

  var items = textbox1.value.split(",");
  var result = numbers(items);

  if (result.errors.length > 0) {
    errorEl.textContent = result.errors[0];
    return;
  }

  if (result.values.length === 0) {
    errorEl.textContent = "no valid numbers found — enter numbers separated by commas";
    return;
  }

  var obj = min_max(result.values);
  minEl.innerHTML = obj["min"];
  maxEl.innerHTML = obj["max"];
  row.style.display = "flex";
}

// function lucky() {
//   var length = Math.floor(Math.random() * 8) + 2;
//   var nums = [];
//   for (var i = 0; i < length; i++) {
//     nums.push(Math.floor(Math.random() * 201) - 100);
//   }
//   document.getElementById("textbox1").value = nums.join(", ");
//   handleButton1Click();
// }

function lucky() {
  var length = Math.floor(Math.random() * 8) + 2;
  var nums = [];
  for (var i = 0; i < length; i++) {
    nums.push(Math.floor(Math.random() * 201) - 100);
  }
  document.getElementById("textbox1").value = nums.join(", ");
  handleButton1Click();
}

function showParrot(button) {
  button.classList.remove("shake");
  void button.offsetWidth;
  button.classList.add("shake");

  var offsetX = (Math.random() - 0.5) * 200;
  var offsetY = (Math.random() - 0.5) * 200;

  var img = document.createElement("img");
  img.src = "hahaha-no-bird-meme-x86uauw50ifpx624.gif?" + Date.now();
  img.style.cssText = [
    "position: fixed",
    "top: 50%",
    "left: 50%",
    "transform: translate(calc(-50% + " + offsetX + "px), calc(-50% + " + offsetY + "px))",
    "width: 320px",
    "border-radius: 12px",
    "z-index: " + (9999 + Math.floor(Math.random() * 100)),
    "pointer-events: none",
    "image-rendering: auto"
  ].join(";");

  document.body.appendChild(img);

  setTimeout(function() {
    img.remove();
  }, 2500);
}

function run() {
  var preload = new Image();
  preload.src = "hahaha-no-bird-meme-x86uauw50ifpx624.gif";

  var button1 = document.getElementById("button1");
  var btnLucky = document.getElementById("btn-lucky");

  button1.addEventListener("click", handleButton1Click);
  btnLucky.addEventListener("click", lucky);

  // press enter to submit
  document.getElementById("textbox1").addEventListener("keydown", function(e) {
    if (e.key === "Enter") handleButton1Click();
  });

  // make ALL other clickable things in the topbar and footer show the parrot
  document.querySelectorAll(".topbar a, .topbar button:not(#button1), .footer a, .signin").forEach(function(el) {
    el.addEventListener("click", function(e) {
      e.preventDefault();
      showParrot(el);
    });
  });

  console.log("run");
}

document.addEventListener("DOMContentLoaded", run);