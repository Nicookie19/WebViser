# WebViser

A simple web app that lets you do math calculations and see your data in colorful charts. It has two parts: a calculator for doing math, and a separate page for looking at charts of numbers you add.

## What You Can Do

- **Do Math**: Add, subtract, multiply, and divide numbers like a regular calculator.
- **Make Charts**: Look at your numbers in bar graphs, line graphs, or pie charts.
- **Add Your Own Numbers**: Put in your own data points with names to chart them.
- **Save Your Data**: The numbers you add stay saved even if you close the browser.
- **Works on Phone or Computer**: The app adjusts to fit different screen sizes.
- **Two Separate Pages**: Calculator on one page, charts on another for easy use.

## How to Use It

1. **Calculator Page** (open index.html):
   - Click number buttons to type numbers.
   - Click + - * / for math operations.
   - Click = to see the answer.
   - Click C to start over.
   - Click "View Visualization" to go to the charts page.

2. **Charts Page** (open visualization.html):
   - Pick what kind of chart you want from the menu (bar, line, or pie).
   - Type a name and a number in the boxes and click "Add Item" to add it to the chart.
   - Type the index number in the box and click "Remove Item" to take it out.
   - The chart updates right away.
   - Click "Back to Calculator" to go back.

## Explaining the Code in Simple Terms

### index.html (The Calculator Page)
This file sets up the calculator's look and buttons.

- `<!DOCTYPE html>`: Tells the browser this is a web page.
- `<html lang="en">`: Starts the page in English.
- `<head>`: Hidden info about the page.
  - `<meta charset="UTF-8">`: Uses special characters.
  - `<meta name="viewport"...>`: Makes it work on phones.
  - `<title>`: Page name in the browser tab.
  - `<link rel="stylesheet" href="styles.css">`: Loads the pretty colors and layout.
  - `<script src="...chart.js">`: Loads the chart-making tool.
- `<body>`: The visible part of the page.
  - `<div class="container">`: A box that holds everything.
    - `<h1>`: Big title at the top.
    - `<p>`: Description text.
    - `<div class="calculator">`: Box for the calculator.
      - `<input id="display">`: The screen that shows numbers and answers.
      - `<div class="calc-buttons">`: Grid of buttons.
        - Buttons for numbers 0-9 and decimal point: Click to add digits to the screen.
        - Buttons for operations (+ - * /): Click to choose what math to do.
        - = button: Click to calculate the answer.
        - C button: Click to clear everything.
    - Button for "View Visualization": Click to go to charts page.
    - `<div id="output">`: Extra space for messages.
  - `<script src="script.js">`: Loads the brain of the app.

### visualization.html (The Charts Page)
This file sets up the charts page.

- Similar head section as index.html.
- `<body>`:
  - `<div class="container">`: Main box.
    - `<h1>`: Title for charts.
    - `<p>`: Description.
    - `<select id="chartType">`: Dropdown menu to pick chart type (bar, line, pie).
    - `<canvas id="historyChart">`: Invisible drawing area where the chart appears.
    - `<div class="custom-data">`: Box for adding/removing data.
      - Input box for name: Type a name for the item here.
      - Input box for value: Type a number here.
      - "Add Item" button: Click to add the named item to the chart.
      - Input box for index: Type which item to remove (starting from 0).
      - "Remove Item" button: Click to take out that item.
    - Button for "Back to Calculator": Click to go back to math page.
  - `<script src="script.js">`: Loads the code that makes it work.

### script.js (The Brain of the App)
This file makes everything interactive with JavaScript.

- `let display = ...`: Gets the calculator screen to change it later.
- `let currentInput = ''`: Remembers the number you're typing now.
- `let previousInput = ''`: Remembers the number before the operation.
- `let operation = null`: Remembers what math you're doing (+ - * /).

- `appendNumber(number)`: Adds a digit to the current number and shows it on screen.
- `setOperation(op)`: Saves the math operation and gets ready for the next number.
- `calculate()`: Does the math based on the operation and shows the answer.
- `clearCalc()`: Wipes everything clean on the calculator.

- `let customItems = []`: List of numbers you add for charts.

- `loadCustomItems()`: When the page loads, gets saved numbers from browser storage.
- `saveCustomItems()`: Saves your numbers to browser storage so they stay.
- `addCustomItem()`: Takes the name and number you typed, adds it to the list, saves it, and updates the chart.
- `removeCustomItem()`: Takes the index you typed, removes that item from the list, saves, and updates chart.

- `updateChart()`: Draws the chart using your custom items. It gets the chart type from the dropdown menu (bar, line, or pie). For each item, it uses the name as a label and the value as the data point. If there are no items, it shows a message instead. The chart is responsive and fits the screen, with different colors for pie charts.

- `window.onload = ...`: When the page first loads, loads saved data and draws the chart.

### styles.css (The Pretty Colors and Layout)
This file makes the app look nice.

- `body`: Sets the background gradient, font, and centers everything.
- `.container`: Makes a white box with rounded corners and shadow for the main content.
- `.calculator`: Spaces out the calculator part.
- `#display`: Styles the calculator screen with border and background.
- `.calc-buttons`: Arranges buttons in a 4-column grid.
- `.calc-buttons button`: Makes buttons red with hover effects.
- `#historyChart`: Sets the chart size to 35% of screen height.
- `.custom-data`: Spaces out the add/remove inputs.
- `.custom-data input`: Styles input boxes with borders.
- `.custom-data button`: Makes add/remove buttons blue.
- `@media (max-width: 600px)`: Changes sizes for small screens like phones.

## What You Need to Run It

- **Chart.js**: A free tool loaded from the internet to make charts.

## How to Start

Just open index.html in any modern web browser. No special setup needed.

## Checking It Works

- **Calculator**: Try 2 + 3 = 5, or 10 / 2 = 5.
- **Charts**: Add items like "Apples: 10", "Bananas: 20", "Oranges: 30"; switch to pie chart; remove one by index.
- **Saving**: Close browser, open again, see if numbers are still there.
- **Mobile**: Make browser window small, see if it still looks good.
