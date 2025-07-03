// Global variables
let trackingData = {};
let shipmentCounter = 1000;

// Mock tracking database
const mockTrackingDatabase = {
    'SW123456789': {
        trackingNumber: 'SW123456789',
        status: 'In Transit',
        origin: 'New York, NY, USA',
        destination: 'London, UK',
        estimatedDelivery: '2024-01-15',
        serviceType: 'Express Air',
        timeline: [
            {
                status: 'Package Picked Up',
                location: 'New York, NY',
                date: '2024-01-10',
                time: '09:30 AM',
                description: 'Package collected from sender'
            },
            {
                status: 'Departed Origin Facility',
                location: 'JFK Airport, NY',
                date: '2024-01-10',
                time: '02:15 PM',
                description: 'Package departed from origin facility'
            },
            {
                status: 'In Transit',
                location: 'Atlantic Ocean',
                date: '2024-01-11',
                time: '08:45 AM',
                description: 'Package in transit to destination country'
            },
            {
                status: 'Arrived at Destination Facility',
                location: 'Heathrow Airport, London',
                date: '2024-01-12',
                time: '11:20 AM',
                description: 'Package arrived at destination facility'
            }
        ]
    },
    'SW987654321': {
        trackingNumber: 'SW987654321',
        status: 'Delivered',
        origin: 'Los Angeles, CA, USA',
        destination: 'Tokyo, Japan',
        estimatedDelivery: '2024-01-08',
        serviceType: 'Express Air',
        timeline: [
            {
                status: 'Package Picked Up',
                location: 'Los Angeles, CA',
                date: '2024-01-05',
                time: '10:00 AM',
                description: 'Package collected from sender'
            },
            {
                status: 'Departed Origin Facility',
                location: 'LAX Airport, CA',
                date: '2024-01-05',
                time: '03:30 PM',
                description: 'Package departed from origin facility'
            },
            {
                status: 'In Transit',
                location: 'Pacific Ocean',
                date: '2024-01-06',
                time: '09:15 AM',
                description: 'Package in transit to destination country'
            },
            {
                status: 'Arrived at Destination Facility',
                location: 'Narita Airport, Tokyo',
                date: '2024-01-07',
                time: '02:45 PM',
                description: 'Package arrived at destination facility'
            },
            {
                status: 'Out for Delivery',
                location: 'Tokyo Distribution Center',
                date: '2024-01-08',
                time: '08:00 AM',
                description: 'Package out for delivery'
            },
            {
                status: 'Delivered',
                location: 'Tokyo, Japan',
                date: '2024-01-08',
                time: '02:30 PM',
                description: 'Package delivered successfully'
            }
        ]
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupNavigation();
    setupForms();
    setupAnimations();
    setupEventListeners();
}

// Navigation functionality
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Setup form functionality
function setupForms() {
    // Tracking form
    const trackingForm = document.getElementById('trackingForm');
    if (trackingForm) {
        trackingForm.addEventListener('submit', handleTrackingSubmit);
    }

    // Pricing form
    const pricingForm = document.getElementById('pricingForm');
    if (pricingForm) {
        pricingForm.addEventListener('submit', handlePricingSubmit);
    }

    // Shipment form
    const shipmentForm = document.getElementById('shipmentForm');
    if (shipmentForm) {
        shipmentForm.addEventListener('submit', handleShipmentSubmit);
        setupShipmentFormListeners();
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Setup animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Setup additional event listeners
function setupEventListeners() {
    // Close modal functionality
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('successModal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Map control listeners
    const centerMapBtn = document.getElementById('centerMapBtn');
    const routeViewBtn = document.getElementById('routeViewBtn');
    const satelliteBtn = document.getElementById('satelliteBtn');

    if (centerMapBtn) {
        centerMapBtn.addEventListener('click', function() {
            if (typeof centerMapOnPackage === 'function') {
                centerMapOnPackage();
            }
        });
    }
    if (routeViewBtn) {
        routeViewBtn.addEventListener('click', function() {
            if (typeof toggleRouteView === 'function') {
                toggleRouteView();
            }
        });
    }
    if (satelliteBtn) {
        satelliteBtn.addEventListener('click', function() {
            if (typeof toggleSatelliteView === 'function') {
                toggleSatelliteView();
            }
        });
    }
}

// Quick track functionality
function quickTrack() {
    const input = document.getElementById('quickTrackInput');
    const trackingNumber = input.value.trim();
    
    if (!trackingNumber) {
        showNotification('Please enter a tracking number', 'error');
        return;
    }

    // Set the tracking number in the main form and scroll to it
    document.getElementById('trackingNumber').value = trackingNumber;
    scrollToSection('tracking');
    
    // Trigger the tracking search
    setTimeout(() => {
        handleTrackingSearch(trackingNumber);
    }, 500);
}

// Handle tracking form submission
function handleTrackingSubmit(e) {
    e.preventDefault();
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    const referenceNumber = document.getElementById('referenceNumber').value.trim();
    
    if (!trackingNumber) {
        showNotification('Please enter a tracking number', 'error');
        return;
    }
    
    handleTrackingSearch(trackingNumber, referenceNumber);
}

// Handle tracking search
function handleTrackingSearch(trackingNumber, referenceNumber = '') {
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        
        // Check if tracking number exists in mock database
        if (mockTrackingDatabase[trackingNumber]) {
            displayTrackingResults(mockTrackingDatabase[trackingNumber]);
        } else {
            // Generate mock data for unknown tracking numbers
            const mockData = generateMockTrackingData(trackingNumber);
            displayTrackingResults(mockData);
        }
    }, 1500);
}

// Generate mock tracking data
function generateMockTrackingData(trackingNumber) {
    const statuses = ['In Transit', 'Processing', 'Pending Pickup', 'Delivered'];
    const origins = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL', 'Seattle, WA'];
    const destinations = ['London, UK', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Toronto, Canada'];
    const services = ['Express Air', 'Standard Ground', 'Economy'];
    
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    
    // Generate estimated delivery date (3-7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 5) + 3);
    
    return {
        trackingNumber: trackingNumber,
        status: randomStatus,
        origin: randomOrigin,
        destination: randomDestination,
        estimatedDelivery: deliveryDate.toISOString().split('T')[0],
        serviceType: randomService,
        timeline: generateMockTimeline(randomStatus, randomOrigin, randomDestination)
    };
}

// Generate mock timeline
function generateMockTimeline(status, origin, destination) {
    const timeline = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - 3);
    
    timeline.push({
        status: 'Package Picked Up',
        location: origin,
        date: formatDate(baseDate),
        time: '09:30 AM',
        description: 'Package collected from sender'
    });
    
    if (status !== 'Pending Pickup') {
        baseDate.setDate(baseDate.getDate() + 1);
        timeline.push({
            status: 'Departed Origin Facility',
            location: origin + ' Facility',
            date: formatDate(baseDate),
            time: '02:15 PM',
            description: 'Package departed from origin facility'
        });
    }
    
    if (status === 'In Transit' || status === 'Delivered') {
        baseDate.setDate(baseDate.getDate() + 1);
        timeline.push({
            status: 'In Transit',
            location: 'International Hub',
            date: formatDate(baseDate),
            time: '08:45 AM',
            description: 'Package in transit to destination'
        });
    }
    
    if (status === 'Delivered') {
        baseDate.setDate(baseDate.getDate() + 1);
        timeline.push({
            status: 'Delivered',
            location: destination,
            date: formatDate(baseDate),
            time: '02:30 PM',
            description: 'Package delivered successfully'
        });
    }
    
    return timeline;
}

// Display tracking results
function displayTrackingResults(data) {
    const resultsContainer = document.getElementById('trackingResults');
    
    // Update package information
    document.getElementById('resultTrackingNumber').textContent = data.trackingNumber;
    document.getElementById('resultStatus').textContent = data.status;
    document.getElementById('resultOrigin').textContent = data.origin;
    document.getElementById('resultDestination').textContent = data.destination;
    document.getElementById('resultETA').textContent = formatDate(new Date(data.estimatedDelivery));
    document.getElementById('resultService').textContent = data.serviceType;
    
    // Set status color
    const statusElement = document.getElementById('resultStatus');
    statusElement.className = 'status';
    if (data.status === 'Delivered') {
        statusElement.classList.add('delivered');
    } else if (data.status === 'In Transit') {
        statusElement.classList.add('in-transit');
    } else {
        statusElement.classList.add('pending');
    }
    
    // Update timeline
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';
    
    data.timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-icon">
                <i class="fas ${getTimelineIcon(item.status)}"></i>
            </div>
            <div class="timeline-content">
                <h4>${item.status}</h4>
                <p>${item.description}</p>
                <div class="time">${item.date} at ${item.time} - ${item.location}</div>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
    
    // Show results
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Initialize and update map
    setTimeout(() => {
        if (typeof initializeTrackingMap === 'function') {
            initializeTrackingMap(data);
        }
    }, 500);
}

// Get timeline icon based on status
function getTimelineIcon(status) {
    const iconMap = {
        'Package Picked Up': 'fa-box',
        'Departed Origin Facility': 'fa-plane-departure',
        'In Transit': 'fa-truck',
        'Arrived at Destination Facility': 'fa-plane-arrival',
        'Out for Delivery': 'fa-truck-moving',
        'Delivered': 'fa-check-circle'
    };
    return iconMap[status] || 'fa-circle';
}

// Handle pricing form submission
function handlePricingSubmit(e) {
    e.preventDefault();
    
    const fromCountry = document.getElementById('fromCountry').value;
    const toCountry = document.getElementById('toCountry').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const serviceType = document.getElementById('serviceType').value;
    
    if (!fromCountry || !toCountry || !weight || !serviceType) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        const rates = calculateShippingRates(fromCountry, toCountry, weight, serviceType);
        displayPricingResults(rates);
    }, 1000);
}

// Calculate shipping rates
function calculateShippingRates(from, to, weight, preferredService) {
    const baseRates = {
        express: 45,
        standard: 25,
        economy: 15
    };
    
    // Distance multiplier (simplified)
    const distanceMultiplier = from === to ? 1 : 1.5;
    
    // Weight multiplier
    const weightMultiplier = Math.max(1, Math.ceil(weight / 5));
    
    const rates = [];
    
    Object.keys(baseRates).forEach(service => {
        const baseRate = baseRates[service];
        const totalRate = (baseRate * distanceMultiplier * weightMultiplier).toFixed(2);
        
        let deliveryTime;
        switch(service) {
            case 'express':
                deliveryTime = '1-2 business days';
                break;
            case 'standard':
                deliveryTime = '3-7 business days';
                break;
            case 'economy':
                deliveryTime = '7-14 business days';
                break;
        }
        
        rates.push({
            service: service.charAt(0).toUpperCase() + service.slice(1),
            price: totalRate,
            deliveryTime: deliveryTime,
            features: getServiceFeatures(service)
        });
    });
    
    return rates;
}

// Get service features
function getServiceFeatures(service) {
    const features = {
        express: ['Priority handling', 'Insurance included', 'Signature required', 'Real-time tracking'],
        standard: ['Standard handling', 'Basic insurance', 'Real-time tracking', 'Email notifications'],
        economy: ['Economy handling', 'Basic tracking', 'Email notifications', 'Eco-friendly option']
    };
    return features[service] || [];
}

// Display pricing results
function displayPricingResults(rates) {
    const resultsContainer = document.getElementById('pricingResults');
    const rateOptions = document.getElementById('rateOptions');
    
    rateOptions.innerHTML = '';
    
    rates.forEach(rate => {
        const rateOption = document.createElement('div');
        rateOption.className = 'rate-option';
        rateOption.innerHTML = `
            <div class="rate-header">
                <div class="rate-service">${rate.service} Shipping</div>
                <div class="rate-price">$${rate.price}</div>
            </div>
            <div class="rate-details">
                <p><strong>Delivery:</strong> ${rate.deliveryTime}</p>
                <p><strong>Features:</strong> ${rate.features.join(', ')}</p>
            </div>
        `;
        
        rateOption.addEventListener('click', () => {
            document.querySelectorAll('.rate-option').forEach(option => {
                option.classList.remove('selected');
            });
            rateOption.classList.add('selected');
        });
        
        rateOptions.appendChild(rateOption);
    });
    
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Setup shipment form listeners
function setupShipmentFormListeners() {
    // Service type change listener
    const serviceSelect = document.getElementById('shipmentService');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateShipmentTotal);
    }
    
    // Checkbox listeners for additional services
    const checkboxes = document.querySelectorAll('#shipmentForm input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateShipmentTotal);
    });
    
    // Initial total calculation
    updateShipmentTotal();
}

// Update shipment total
function updateShipmentTotal() {
    const serviceSelect = document.getElementById('shipmentService');
    const signatureRequired = document.getElementById('signatureRequired');
    const insuranceRequired = document.getElementById('insuranceRequired');
    
    let shippingCost = 0;
    let additionalCost = 0;
    
    // Get shipping cost from selected service
    if (serviceSelect && serviceSelect.value) {
        const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
        const priceMatch = serviceText.match(/\$(\d+\.\d+)/);
        if (priceMatch) {
            shippingCost = parseFloat(priceMatch[1]);
        }
    }
    
    // Add additional services
    if (signatureRequired && signatureRequired.checked) {
        additionalCost += 5.00;
    }
    
    if (insuranceRequired && insuranceRequired.checked) {
        additionalCost += 10.00;
    }
    
    const totalCost = shippingCost + additionalCost;
    
    // Update display
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('additionalCost').textContent = `$${additionalCost.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2)}`;
}

// Handle shipment form submission
function handleShipmentSubmit(e) {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
        'senderName', 'senderAddress', 'senderCity', 'senderZip', 'senderCountry', 'senderPhone', 'senderEmail',
        'recipientName', 'recipientAddress', 'recipientCity', 'recipientZip', 'recipientCountry', 'recipientPhone', 'recipientEmail',
        'packageWeight', 'packageValue', 'packageLength', 'packageWidth', 'packageHeight', 'packageDescription', 'shipmentService'
    ];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showNotification(`Please fill in the ${fieldId.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            field.focus();
            return;
        }
    }
    
    showLoading();
    
    // Simulate shipment creation
    setTimeout(() => {
        hideLoading();
        
        // Generate tracking number
        const newTrackingNumber = `SW${Date.now().toString().slice(-9)}`;
        
        // Create shipment data
        const shipmentData = {
            trackingNumber: newTrackingNumber,
            sender: {
                name: document.getElementById('senderName').value,
                company: document.getElementById('senderCompany').value,
                address: document.getElementById('senderAddress').value,
                city: document.getElementById('senderCity').value,
                zip: document.getElementById('senderZip').value,
                country: document.getElementById('senderCountry').value,
                phone: document.getElementById('senderPhone').value,
                email: document.getElementById('senderEmail').value
            },
            recipient: {
                name: document.getElementById('recipientName').value,
                company: document.getElementById('recipientCompany').value,
                address: document.getElementById('recipientAddress').value,
                city: document.getElementById('recipientCity').value,
                zip: document.getElementById('recipientZip').value,
                country: document.getElementById('recipientCountry').value,
                phone: document.getElementById('recipientPhone').value,
                email: document.getElementById('recipientEmail').value
            },
            package: {
                weight: document.getElementById('packageWeight').value,
                value: document.getElementById('packageValue').value,
                dimensions: {
                    length: document.getElementById('packageLength').value,
                    width: document.getElementById('packageWidth').value,
                    height: document.getElementById('packageHeight').value
                },
                description: document.getElementById('packageDescription').value
            },
            service: document.getElementById('shipmentService').value,
            options: {
                signatureRequired: document.getElementById('signatureRequired').checked,
                insuranceRequired: document.getElementById('insuranceRequired').checked,
                smsNotifications: document.getElementById('smsNotifications').checked,
                emailNotifications: document.getElementById('emailNotifications').checked
            },
            totalCost: document.getElementById('totalCost').textContent
        };
        
        // Add to mock database
        mockTrackingDatabase[newTrackingNumber] = generateMockTrackingData(newTrackingNumber);
        
        // Show success message
        showSuccessModal(`Shipment created successfully!<br><br><strong>Tracking Number: ${newTrackingNumber}</strong><br><br>You will receive email confirmation shortly.`);
        
        // Reset form
        document.getElementById('shipmentForm').reset();
        updateShipmentTotal();
        
    }, 2000);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        showSuccessModal('Thank you for your message! We will get back to you within 24 hours.');
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function showSuccessModal(message) {
    document.getElementById('successMessage').innerHTML = message;
    document.getElementById('successModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Add some sample tracking numbers for testing
function addSampleTrackingNumbers() {
    const sampleNumbers = ['SW123456789', 'SW987654321', 'SW555666777', 'SW111222333'];
    console.log('Sample tracking numbers for testing:', sampleNumbers);
}

// Initialize sample data
addSampleTrackingNumbers();