// Main JavaScript file for LaVie platform

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Search functionality
    const searchForm = document.querySelector('#search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performSearch();
        });
    }

    // Rating system
    const ratingInputs = document.querySelectorAll('.rating-input');
    if (ratingInputs) {
        ratingInputs.forEach(input => {
            input.addEventListener('change', function(e) {
                updateRating(e.target.value);
            });
        });
    }

    // Message system
    const messageForm = document.querySelector('#message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }

    // Geolocation
    if ("geolocation" in navigator) {
        const locationButton = document.querySelector('#get-location');
        if (locationButton) {
            locationButton.addEventListener('click', function() {
                navigator.geolocation.getCurrentPosition(function(position) {
                    updateLocation(position.coords.latitude, position.coords.longitude);
                });
            });
        }
    }
});

// Search function
function performSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        const query = searchInput.value.trim();
        // Here you would typically make an API call to your backend
        // For now, we'll just show a message
        searchResults.innerHTML = `<div class="alert alert-info">Recherche en cours pour: ${query}</div>`;
    }
}

// Update rating
function updateRating(rating) {
    // Here you would typically make an API call to your backend
    console.log('Rating updated:', rating);
}

// Send message
function sendMessage() {
    const messageInput = document.querySelector('#message-input');
    const messageStatus = document.querySelector('#message-status');
    
    if (messageInput && messageStatus) {
        const message = messageInput.value.trim();
        if (message) {
            // Here you would typically make an API call to your backend
            messageStatus.innerHTML = '<div class="alert alert-success">Message envoyé!</div>';
            messageInput.value = '';
        }
    }
}

// Update location
function updateLocation(latitude, longitude) {
    const locationStatus = document.querySelector('#location-status');
    if (locationStatus) {
        locationStatus.innerHTML = `
            <div class="alert alert-success">
                Position mise à jour: Lat: ${latitude}, Long: ${longitude}
            </div>
        `;
    }
}

// Form validation
function validateForm(formId) {
    const form = document.querySelector(formId);
    if (!form) return false;

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });

    return isValid;
}

// Notification system
class NotificationSystem {
    static show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show`;
        notification.role = 'alert';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        const container = document.querySelector('.notification-container') || document.body;
        container.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// File upload preview
function previewImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.querySelector('#image-preview');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}
