/**
 * charts.js
 * Handles all charting functionality for the Renewable Energy Controller
 */

// Initialize charts when document is ready
$(document).ready(function () {
    initializeCharts();
});

function initializeCharts() {
    // Check if charts need to be rendered on the current page
    if ($('#energyProductionChart').length > 0) {
        renderEnergyProductionChart();
    }
    
    if ($('#batteryStatusChart').length > 0) {
        renderBatteryStatusChart();
    }
    
    if ($('#dailyUsageChart').length > 0) {
        renderDailyUsageChart();
    }
    
    if ($('#monthlyTrendsChart').length > 0) {
        renderMonthlyTrendsChart();
    }
    
    if ($('#systemHealthChart').length > 0) {
        renderSystemHealthChart();
    }
}

function renderEnergyProductionChart() {
    // Get chart data from the data attribute or API
    var chartData = $('#energyProductionChart').data('chart-data');
    
    if (!chartData) {
        console.error('No data available for energy production chart');
        return;
    }
    
    // Format data for chart.js
    var labels = chartData.map(function(item) { 
        return new Date(item.TimeStamp).toLocaleTimeString(); 
    });
    
    var values = chartData.map(function(item) { 
        return item.KWh; 
    });
    
    var ctx = document.getElementById('energyProductionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Energy Production (kWh)',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kWh'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            return 'Time: ' + tooltipItems[0].label;
                        },
                        label: function(context) {
                            return 'Energy: ' + context.raw.toFixed(2) + ' kWh';
                        }
                    }
                }
            }
        }
    });
}

function renderBatteryStatusChart() {
    var chargePercentage = $('#batteryStatusChart').data('charge-percentage');
    
    if (chargePercentage === undefined) {
        console.error('No data available for battery status chart');
        return;
    }
    
    var ctx = document.getElementById('batteryStatusChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Charged', 'Remaining'],
            datasets: [{
                data: [chargePercentage, 100 - chargePercentage],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(200, 200, 200, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(200, 200, 200, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Add percentage text in the center
    Chart.pluginService.register({
        beforeDraw: function(chart) {
            if (chart.canvas.id === 'batteryStatusChart') {
                var width = chart.chart.width;
                var height = chart.chart.height;
                var ctx = chart.chart.ctx;
                
                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                
                var text = chargePercentage + "%";
                var textX = Math.round((width - ctx.measureText(text).width) / 2);
                var textY = height / 2;
                
                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }
    });
}

function renderDailyUsageChart() {
    var chartData = $('#dailyUsageChart').data('chart-data');
    
    if (!chartData) {
        console.error('No data available for daily usage chart');
        return;
    }
    
    var labels = chartData.map(function(item) { return item.Day; });
    var values = chartData.map(function(item) { return item.KWh; });
    
    var ctx = document.getElementById('dailyUsageChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Daily Usage (kWh)',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kWh'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Day'
                    }
                }
            }
        }
    });
}

function renderMonthlyTrendsChart() {
    // This is a sample chart for monthly trends
    // In a real app, you would pull this data from an API
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Sample data - would normally come from the server
    var production = [320, 332, 401, 454, 502, 499, 470, 450, 420, 370, 350, 330];
    var consumption = [270, 285, 301, 354, 390, 420, 430, 410, 400, 350, 330, 310];
    
    var ctx = document.getElementById('monthlyTrendsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Production (kWh)',
                    data: production,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.4
                },
                {
                    label: 'Consumption (kWh)',
                    data: consumption,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'kWh'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

function renderSystemHealthChart() {
    // This would be data-driven in a real application
    var components = $('#systemHealthChart').data('components');
    
    if (!components) {
        console.error('No data available for system health chart');
        return;
    }
    
    // Count components by status
    var statusCounts = {
        'OK': 0,
        'Warning': 0,
        'Error': 0
    };
    
    components.forEach(function(component) {
        statusCounts[component.Status]++;
    });
    
    var ctx = document.getElementById('systemHealthChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['OK', 'Warning', 'Error'],
            datasets: [{
                data: [statusCounts.OK, statusCounts.Warning, statusCounts.Error],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(255, 99, 132, 0.8)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            var label = context.label || '';
                            var value = context.raw || 0;
                            var total = context.dataset.data.reduce((a, b) => a + b, 0);
                            var percentage = Math.round((value / total) * 100);
                            return label + ': ' + value + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}