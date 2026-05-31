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

### Bug 4: Reference to non-existent element `span1`

- `handleButton1Click()` tried to get an element with id `span1`, which doesn't exist in the HTML
- This caused a null reference error that crashed the handler silently
- Fix: Remove those two lines

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
