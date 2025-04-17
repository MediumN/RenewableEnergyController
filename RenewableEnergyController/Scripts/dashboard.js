/**
 * dashboard.js
 * Handles all dashboard-specific functionality for the Renewable Energy Controller
 */

$(document).ready(function() {
    // Initialize the dashboard components
    initializeDashboard();
    
    // Set up refresh interval for live data (every 60 seconds)
    setInterval(refreshDashboardData, 60000);
    
    // Set up event handlers
    setupEventHandlers();
});

function initializeDashboard() {
    // Initialize dashboard widgets
    initializeEnergyProductionWidget();
    initializeBatteryStatusWidget();
    initializeAlertsWidget();
    initializeQuickStatsWidget();
    
    // Update the last refresh timestamp
    updateLastRefreshTimestamp();
}

function initializeEnergyProductionWidget() {
    // Check if widget exists on page
    if ($('#energy-production-widget').length === 0) return;
    
    // Get current energy production data
    var currentKWh = $('#energy-production-widget').data('current-kwh');
    var dailyKWh = $('#energy-production-widget').data('daily-kwh');
    var monthlyKWh = $('#energy-production-widget').data('monthly-kwh');
    
    // Update the values in the widget
    $('#current-kwh-value').text(currentKWh.toFixed(2));
    $('#daily-kwh-value').text(dailyKWh.toFixed(2));
    $('#monthly-kwh-value').text(monthlyKWh.toFixed(2));
    
    // Get production data for the chart
    var productionData = $('#energy-production-widget').data('production-data');
    
    // Initialize chart if data is available
    if (productionData && productionData.length > 0) {
        renderProductionChart(productionData);
    }
}

function renderProductionChart(data) {
    // Format data for the chart
    var labels = data.map(function(item) { 
        return new Date(item.TimeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
    });
    
    var values = data.map(function(item) { 
        return item.KWh; 
    });
    
    // Get canvas context
    var ctx = document.getElementById('dashboard-production-chart').getContext('2d');
    
    // Create chart
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
                pointRadius: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'kWh'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeBatteryStatusWidget() {
    // Check if widget exists on page
    if ($('#battery-status-widget').length === 0) return;
    
    // Get battery status data
    var chargePercentage = $('#battery-status-widget').data('charge-percentage');
    var chargeStatus = $('#battery-status-widget').data('charge-status');
    var estimatedRuntime = $('#battery-status-widget').data('estimated-runtime');
    
    // Update the values in the widget
    $('#battery-percentage').text(chargePercentage + '%');
    $('#battery-status').text(chargeStatus);
    $('#battery-runtime').text(estimatedRuntime + ' hours');
    
    // Update battery visualization
    updateBatteryVisualization(chargePercentage);
}

function updateBatteryVisualization(percentage) {
    // Update the battery fill level
    $('.battery-fill').css('height', percentage + '%');
    
    // Update the color based on the percentage
    var fillColor;
    if (percentage <= 20) {
        fillColor = '#FF5252'; // Red for low battery
    } else if (percentage <= 50) {
        fillColor = '#FFC107'; // Yellow for medium battery
    } else {
        fillColor = '#4CAF50'; // Green for good battery
    }
    
    $('.battery-fill').css('background-color', fillColor);
}

function initializeAlertsWidget() {
    // Check if widget exists on page
    if ($('#alerts-widget').length === 0) return;
    
    // Get alerts data
    var alerts = $('#alerts-widget').data('alerts');
    
    // Update alerts count
    var unreadCount = alerts.filter(function(alert) { return !alert.IsRead; }).length;
    $('#unread-alerts-count').text(unreadCount);
    
    // Display the alerts
    displayAlerts(alerts);
    
    // Set up mark as read functionality
    $('.mark-alert-read').on('click', function(e) {
        e.preventDefault();
        var alertId = $(this).data('alert-id');
        markAlertAsRead(alertId);
    });
}

function displayAlerts(alerts) {
    var $alertsList = $('#alerts-list');
    $alertsList.empty();
    
    if (alerts.length === 0) {
        $alertsList.append('<li class="no-alerts">No alerts at this time.</li>');
        return;
    }
    
    // Sort alerts by timestamp (most recent first) and take only the top 5
    alerts.sort(function(a, b) {
        return new Date(b.Timestamp) - new Date(a.Timestamp);
    });
    
    var alertsToShow = alerts.slice(0, 5);
    
    // Add each alert to the list
    $.each(alertsToShow, function(index, alert) {
        var alertClass = getAlertClass(alert.Type);
        var timeAgo = getTimeAgo(new Date(alert.Timestamp));
        
        var $alertItem = $('<li class="alert-item ' + alertClass + '"></li>');
        $alertItem.append('<div class="alert-message">' + alert.Message + '</div>');
        $alertItem.append('<div class="alert-meta">');
        $alertItem.append('<span class="alert-time">' + timeAgo + '</span>');
        
        if (!alert.IsRead) {
            $alertItem.append('<a href="#" class="mark-alert-read" data-alert-id="' + alert.Id + '">Mark Read</a>');
        }
        
        $alertItem.append('</div>');
        $alertsList.append($alertItem);
    });
    
    // Add view all link if there are more alerts
    if (alerts.length > 5) {
        $alertsList.append('<li class="view-all-alerts"><a href="/Alerts">View All Alerts (' + alerts.length + ')</a></li>');
    }
}

function getAlertClass(alertType) {
    switch (alertType) {
        case 0: // Warning
            return 'alert-warning';
        case 1: // Info
            return 'alert-info';
        case 2: // Success
            return 'alert-success';
        case 3: // Danger
            return 'alert-danger';
        default:
            return 'alert-info';
    }
}

function getTimeAgo(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + " year" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " month" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " day" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
    }
    
    return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
}

function markAlertAsRead(alertId) {
    // In a real application, this would make an AJAX call to mark the alert as read
    $.ajax({
        url: '/Alerts/MarkAsRead',
        type: 'POST',
        data: { id: alertId },
        success: function(response) {
            if (response.success) {
                // Update the UI
                var $alertItem = $('.mark-alert-read[data-alert-id="' + alertId + '"]').closest('.alert-item');
                $alertItem.find('.mark-alert-read').remove();
                
                // Update the unread count
                var currentCount = parseInt($('#unread-alerts-count').text());
                $('#unread-alerts-count').text(currentCount - 1);
            }
        },
        error: function() {
            console.error('Failed to mark alert as read');
        }
    });
}

function initializeQuickStatsWidget() {
    // Check if widget exists on page
    if ($('#quick-stats-widget').length === 0) return;
    
    // This would pull data from the server in a real application
    // For now, we'll just use the sample data from the markup
}

function refreshDashboardData() {
    // In a real application, this would make AJAX calls to get updated data
    // For demo purposes, we'll just simulate a refresh
    
    // Update the last refresh timestamp
    updateLastRefreshTimestamp();
    
    // Notify the user that data has been refreshed
    showNotification('Dashboard refreshed with latest data');
}

function updateLastRefreshTimestamp() {
    var now = new Date();
    var formattedTime = now.toLocaleTimeString();
    $('#last-refresh-time').text(formattedTime);
}

function showNotification(message) {
    var $notification = $('<div class="notification">' + message + '</div>');
    $('body').append($notification);
    
    // Show the notification
    setTimeout(function() {
        $notification.addClass('show');
    }, 100);
    
    // Hide and remove the notification after 3 seconds
    setTimeout(function() {
        $notification.removeClass('show');
        setTimeout(function() {
            $notification.remove();
        }, 300);
    }, 3000);
}

function setupEventHandlers() {
    // Handle refresh button click
    $('#refresh-dashboard').on('click', function(e) {
        e.preventDefault();
        refreshDashboardData();
    });
    
    // Handle toggle widgets button click
    $('.toggle-widget-button').on('click', function(e) {
        e.preventDefault();
        var $widget = $(this).closest('.dashboard-widget');
        var $content = $widget.find('.widget-content');
        
        $content.slideToggle(200);
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
    });
    
    // Handle system status indicators
    $('.system-status-indicator').on('click', function() {
        var statusType = $(this).data('status-type');
        showStatusDetails(statusType);
    });
}

function showStatusDetails(statusType) {
    // This would show a modal or details panel with more information
    // about the selected system status indicator
    var statusMessages = {
        'solar': 'Solar panels are functioning at optimal efficiency',
        'battery': 'Battery system is charging normally',
        'inverter': 'Inverter is operating within normal parameters',
        'grid': 'Grid connection is stable'
    };
    
    var message = statusMessages[statusType] || 'No details available';
    alert(message); // In a real app, this would be a modal dialog
}