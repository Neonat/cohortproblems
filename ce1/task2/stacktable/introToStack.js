// This is our "world state" — one object that holds everything
const state = {
  callStack: [],
  microQueue: [],
  macroQueue: [],
  consoleOut: [],
};
// console.log("\n"+ state);
console.log("\n", state); 
// use the comma to separate them, not addition
// + tries to join the "\n" string with state. But state is an object, not a string
// so it doesn't know how to do that, and it just gives us the string "[object Object]"
console.log("\nadding main now!\n");
state.callStack.push("main()");
console.log(state);
console.log("\npopping main now!\n");
state.callStack.pop();
console.log("\nback to normal!\n");
console.log(state);