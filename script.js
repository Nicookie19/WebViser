let display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operation = null;
let calculationHistory = [];
let customItems = JSON.parse(localStorage.getItem('customItems')) || [];

function saveCustomItems() {
    localStorage.setItem('customItems', JSON.stringify(customItems));
}

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    display.value = currentInput;
    addToHistory(result);
    operation = null;
    previousInput = '';
}

function clearCalc() {
    currentInput = '';
    previousInput = '';
    operation = null;
    display.value = '';
}

function scientificOperation(op) {
    if (currentInput === '') return;
    const num = parseFloat(currentInput);
    if (isNaN(num)) return;
    let result;
    switch (op) {
        case 'sin':
            result = Math.sin(num);
            break;
        case 'cos':
            result = Math.cos(num);
            break;
        case 'tan':
            result = Math.tan(num);
            break;
        case 'asin':
            if (num < -1 || num > 1) {
                alert('Arcsin is defined only for values between -1 and 1');
                return;
            }
            result = Math.asin(num);
            break;
        case 'acos':
            if (num < -1 || num > 1) {
                alert('Arccos is defined only for values between -1 and 1');
                return;
            }
            result = Math.acos(num);
            break;
        case 'atan':
            result = Math.atan(num);
            break;
        case 'log':
            if (num <= 0) {
                alert('Logarithm of non-positive number is undefined');
                return;
            }
            result = Math.log10(num);
            break;
        case 'ln':
            if (num <= 0) {
                alert('Natural logarithm of non-positive number is undefined');
                return;
            }
            result = Math.log(num);
            break;
        case 'sqrt':
            if (num < 0) {
                alert('Square root of negative number is undefined');
                return;
            }
            result = Math.sqrt(num);
            break;
        case 'cbrt':
            result = Math.cbrt(num);
            break;
        case 'exp':
            result = Math.exp(num);
            break;
        case 'factorial':
            if (num < 0 || !Number.isInteger(num)) {
                alert('Factorial is defined only for non-negative integers');
                return;
            }
            result = factorial(num);
            break;
        case 'pow2':
            result = Math.pow(num, 2);
            break;
        case 'pow3':
            result = Math.pow(num, 3);
            break;
        case 'inv':
            if (num === 0) {
                alert('Division by zero');
                return;
            }
            result = 1 / num;
            break;
        case 'neg':
            result = -num;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    display.value = currentInput;
    addToHistory(result);
}

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

function addToHistory(result) {
    calculationHistory.push(result);
    if (calculationHistory.length > 10) {
        calculationHistory.shift();
    }
}

function updateChart() {
    const ctx = document.getElementById('historyChart');
    if (!ctx) return; // Exit if chart element doesn't exist
    const chartContext = ctx.getContext('2d');
    const chartType = document.getElementById('chartType') ? document.getElementById('chartType').value : 'bar';

    const labels = customItems.map(item => item.name);
    const data = customItems.map(item => item.value);
    const label = 'Custom Items';

    // Destroy existing chart if it exists
    if (window.myChart) {
        window.myChart.destroy();
    }

    if (customItems.length === 0) {
        // Display a message if no data
        const canvas = document.getElementById('historyChart');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '20px Arial';
        context.fillStyle = '#666';
        context.textAlign = 'center';
        context.fillText('No data to display. Add custom items on the calculator page.', canvas.width / 2, canvas.height / 2);
        return;
    }

    const config = {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: chartType === 'pie' ? [
                    'rgba(255, 107, 107, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)'
                ] : 'rgba(255, 107, 107, 0.6)',
                borderColor: 'rgba(255, 107, 107, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: chartType !== 'pie' ? {
                y: {
                    beginAtZero: true
                }
            } : {}
        }
    };

    window.myChart = new Chart(chartContext, config);
}

document.addEventListener('DOMContentLoaded', function() {
    updateChart();
});

function addCustomItem() {
    const name = document.getElementById('newItemName').value.trim();
    const value = parseFloat(document.getElementById('newItemValue').value);
    if (name && !isNaN(value)) {
        customItems.push({ name, value });
        saveCustomItems();
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemValue').value = '';
        updateChart();
    }
}

function updateCustomItemsList() {
    const list = document.getElementById('customItemsList');
    list.innerHTML = '<h3>Custom Items:</h3>';
    customItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'custom-item';
        itemDiv.innerHTML = `
            <span>${item.name}: ${item.value}</span>
            <button onclick="removeCustomItem(${index})">Remove</button>
        `;
        list.appendChild(itemDiv);
    });
}

function removeCustomItem() {
    const index = parseInt(document.getElementById('removeIndex').value);
    if (!isNaN(index) && index >= 0 && index < customItems.length) {
        customItems.splice(index, 1);
        saveCustomItems();
        document.getElementById('removeIndex').value = '';
        updateChart();
    }
}


