# Task 1

## Planning

Right now, I want to implement a less than, and a greater than, logic so that I iteratively check through the entire array. Create lt and gt functions.

Then for event click, another function called min_max will run both lt and gt across the array.

Implement less than (`lt`) and greater than (`gt`) logic to iteratively check through an entire array. Then for the button click event, `min_max` will run both `lt` and `gt` across the array to find the minimum and maximum values.

## Bugs Fixed

### Bug 1: Wrong script filename

- `ce1.html` was referencing `minmax.js` but the actual file is `ce1.js`
- Fix: Change `<script src="minmax.js">` to `<script src="ce1.js">` in `ce1.html`

### Bug 2: `min` and `max` were reset on every loop iteration

- `min = a[0]` and `max = a[0]` were inside the `for` loop in `min_max()`
- Fix: Move both initializations to before the loop

### Bug 3: Return values of `lt` and `gt` were not captured

- `lt(n, min)` and `gt(n, max)` were called but their return values were discarded
- Fix: Assign the results back: `min = lt(n, min)` and `max = gt(n, max)`

## Extra

I want to make the whole page look extra nice. With claude's help, I made the whole thing look like Google Search and implemented some fun elements like false buttons to troll.

### Google Search UI

Made the whole page look like Google Search, including:

- Colourful letter-by-letter logo using Google's brand colours
- Rounded search bar with focus glow
- "MinMax Search" and "I'm Feeling Lucky" buttons styled like Google's
- Topbar with fake Gmail/Images links and a Sign In button
- Footer with fake Privacy/Terms links

### Fun elements

- **I'm Feeling Lucky** — generates a random-length list of random numbers (-100 to 100) and runs the search automatically
- **All other buttons** (Sign In, Gmail, Images, footer links) shake disapprovingly and show a "ha ha ha NO" parrot gif for ~2.5 seconds before disappearing
- **Spam protection** — each click spawns an independent parrot gif with a random offset from centre, all playing independently so the screen floods when spammed
- **Enter key** — pressing Enter in the input box triggers the search, same as clicking the button

### Input validation

Added proper error handling in `numbers()` for:

- Absolute value notation e.g. `|3|` — rejected with a helpful message
- Percentage/modulo e.g. `3%` — rejected with a helpful message
- Space-separated numbers e.g. `3 4` — tells user to use commas instead
- Decimal numbers e.g. `3.7` — rejected, whole numbers only
- Anything else non-numeric — rejected with a clear message
- Empty input and trailing/double commas — handled gracefully

### File structure

Got too carried away with the extras, so the work was split into two separate files to keep the submission clean:

- `ce1.html` / `ce1.js` — original plain implementation for submission
- `minmax.html` / `minmax.css` / `minmax.js` — the fancy Google Search version with all the extras

# Task 2

My friend told me to automate the printing. I want to try that.

Omg doing that took WAY WAY WAY too long. Holy balls!!

![Stack Trace Table]([Stack Trace Table](./StackTable.png))

Here is what I managed to get out of the entire simulator.js run in terminal.

## What is happening?

So basically in the first 6 lines until eof, main() is running. The two promises are created and immediately resolved. Then ev1 and ev2 are registered in the column "event reg". When ev2 emits (line 30 of task2.js), function@26 is added to the column "macro queue". This causes main() to return and the call stack to empty.

After that, the event loop dequeues `function@26(0)` from the macro queue and runs its callback body (lines 27–28), which calls `console.log` and schedules a `.then()` microtask.

The callback returns, the call stack clears, and the microtask drains, calling `foo(data)`, which emits the next event and queues the next macro task. This cycle repeats, incrementing `x` by 1 each time, alternating between ev1 and ev2, until `foo(11)` hits the `x > 10` branch and terminates.

## What gets printed in the console output

```
data 0 received by ev2
data 1 received by ev1
data 2 received by ev2
data 3 received by ev1
data 4 received by ev2
data 5 received by ev1
data 6 received by ev2
data 7 received by ev1
data 8 received by ev2
data 9 received by ev1
data 10 received by ev2
data 11 received by ev1
```

## DOES IT END?

Yes.

The chain of async callbacks eventually stops when the condition (x > 10) is fulfilled. However, this only happens after the fact, meaning, after 12 cycles, foo(11) is called and in the x>10 branch, resolve() results in no further scheduling. So nothing is added to the queue and the program ends there.
