// ── State ─────────────────────────────────────────────
const state = {
  callStack:  [],
  microQueue: [],
  macroQueue: [],
  promises:   {},   // e.g. { "promise@5": "rs", "promise@8": "pending" }
  events:     {},   // e.g. { "ev1.run": "function@22" }
  consoleOut: [],
};

const trace = [];

// ── Snapshot ──────────────────────────────────────────
function snapshot(pc) {
  trace.push({
    pc:         pc,
    callStack:  [...state.callStack],
    microQueue: [...state.microQueue],
    macroQueue: [...state.macroQueue],
    promises:   { ...state.promises },
    events:     { ...state.events },
    consoleOut: [...state.consoleOut],
  });
}

// ── Helpers ───────────────────────────────────────────
function fakeSetImmediate(label) {
  state.macroQueue.push(label);
}

function fakeThen(label) {
  state.microQueue.push(label);
}

// ── Foo  ───────────────────────────────────────────
function foo(x) {
  state.callStack.push(`foo(${x})`);

  if (x > 10) {
    // x is too big — we stop here, nothing gets emitted
    snapshot(`foo(${x}) — x > 10, resolve() called, cycle stops`);

  } else if (x % 2 === 0) {
    // x is even — fire ev1 with x+1
    state.macroQueue.push(`function@22(${x + 1})`);
    snapshot(`foo(${x}) — even, ev1.emit(${x + 1})`);

  } else {
    // x is odd — fire ev2 with x+1
    state.macroQueue.push(`function@26(${x + 1})`);
    snapshot(`foo(${x}) — odd, ev2.emit(${x + 1})`);
  }

  state.callStack.pop();
}
// ── Print the trace table ─────────────────────────────
function printTrace() {
  const rows = trace.map((step) => {
    return {
  "program counter": step.pc,
  "call stack":      step.callStack.length ? "[" + step.callStack.join(", ") + "]" : "[]",
  "micro queue":     step.microQueue.length ? "[" + step.microQueue.join(", ") + "]" : "[]",
  "promises":        "{" + Object.entries(step.promises).map(([k,v]) => v && v !== "pending" ? `${k}:${v}` : k).join(", ") + "}",
  "macro queue":     step.macroQueue.length ? "[" + step.macroQueue.join(", ") + "]" : "[]",
  "event reg":       Object.keys(step.events).length ? "{ " + Object.entries(step.events).map(([k,v]) => `${k}:${v}`).join(", ") + " }" : "{}",
  "console output":  step.consoleOut[step.consoleOut.length - 1] || "",
};
  });

  console.table(rows);
}

// ── We'll add the simulation steps below here ─────────

// ── Simulation ────────────────────────────────────────

// Step 1: main() runs, both promises resolve, listeners register
// ── Simulation ────────────────────────────────────────

// line 5: promise@5 created and resolved
state.callStack.push("main()");
state.promises["promise@5"] = "";
snapshot("5");
state.promises["promise@5"] = "rs";

// line 8: promise@8 created and resolved  
state.promises["promise@8"] = "";
snapshot("8");
state.promises["promise@8"] = "rs";

// line 22: ev1 listener registered
state.events["ev1.run"] = "function@22";
snapshot("22");

// line 26: ev2 listener registered
state.events["ev2.run"] = "function@26";
snapshot("26");

// line 30: ev2.emit(0) fires synchronously
state.macroQueue.push("function@26(0)");
snapshot("30");

// eof: main() done
state.callStack.pop();
snapshot("eof");

// ── The cycle ─────────────────────────────────────────
while (state.macroQueue.length > 0) {
  const task = state.macroQueue.shift();
  state.callStack.push(task);

  const data = parseInt(task.match(/\((\d+)\)/)[1]);
  const isEv1 = task.includes("@22");
  const emitterName = isEv1 ? "ev1" : "ev2";

  state.consoleOut.push(`data ${data} received by ${emitterName}`);
  snapshot(`${task} — logged`);

  const promiseLabel = isEv1 ? "promise@8" : "promise@5";
  state.microQueue.push(`${promiseLabel}.then→foo(${data})`);
  snapshot(`${task} — .then() queued`);

  state.callStack.pop();
  snapshot(`${task} — callback returned`);
  
  while (state.microQueue.length > 0) {
    const microTask = state.microQueue.shift();
    state.callStack.push(microTask);
    snapshot(`micro: ${microTask}`);
    state.callStack.pop();
    foo(data);
  }
}

printTrace();