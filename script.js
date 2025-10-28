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


