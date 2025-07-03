// Interactive Map Functions for Package Tracking

// Global map variables
let trackingMap = null;
let currentMarkers = [];
let routeControl = null;
let isMapInitialized = false;

// Initialize tracking map with package data
function initializeTrackingMap(data) {
    const mapContainer = document.getElementById('trackingMap');
    if (!mapContainer) return;

    // Clear existing map
    if (trackingMap) {
        trackingMap.remove();
    }

    // Get coordinates for locations
    const locations = getLocationCoordinates(data);
    
    // Initialize map
    trackingMap = L.map('trackingMap').setView([locations.current.lat, locations.current.lng], 4);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(trackingMap);

    // Clear existing markers
    currentMarkers = [];

    // Add origin marker
    const originMarker = L.marker([locations.origin.lat, locations.origin.lng], {
        icon: createCustomIcon('origin')
    }).addTo(trackingMap);
    
    originMarker.bindPopup(createPopupContent('Origin', locations.origin.name, 'origin'));
    currentMarkers.push(originMarker);

    // Add current location marker
    const currentMarker = L.marker([locations.current.lat, locations.current.lng], {
        icon: createCustomIcon('current')
    }).addTo(trackingMap);
    
    currentMarker.bindPopup(createPopupContent('Current Location', locations.current.name, data.status.toLowerCase().replace(' ', '-')));
    currentMarkers.push(currentMarker);

    // Add destination marker
    const destinationMarker = L.marker([locations.destination.lat, locations.destination.lng], {
        icon: createCustomIcon('destination')
    }).addTo(trackingMap);
    
    destinationMarker.bindPopup(createPopupContent('Destination', locations.destination.name, 'destination'));
    currentMarkers.push(destinationMarker);

    // Add route line
    const routeLine = L.polyline([
        [locations.origin.lat, locations.origin.lng],
        [locations.current.lat, locations.current.lng],
        [locations.destination.lat, locations.destination.lng]
    ], {
        color: '#2563eb',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(trackingMap);

    // Fit map to show all markers
    const group = new L.featureGroup(currentMarkers);
    trackingMap.fitBounds(group.getBounds().pad(0.1));

    // Add real-time animation for in-transit packages
    if (data.status === 'In Transit') {
        animatePackageMovement();
    }

    isMapInitialized = true;
}

// Get coordinates for different locations
function getLocationCoordinates(data) {
    const locationCoords = {
        'New York, NY, USA': { lat: 40.7128, lng: -74.0060, name: 'New York, NY' },
        'London, UK': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
        'Los Angeles, CA, USA': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, CA' },
        'Tokyo, Japan': { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
        'Paris, France': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
        'Sydney, Australia': { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
        'Toronto, Canada': { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada' },
        'Chicago, IL': { lat: 41.8781, lng: -87.6298, name: 'Chicago, IL' },
        'Miami, FL': { lat: 25.7617, lng: -80.1918, name: 'Miami, FL' },
        'Seattle, WA': { lat: 47.6062, lng: -122.3321, name: 'Seattle, WA' },
        'Berlin, Germany': { lat: 52.5200, lng: 13.4050, name: 'Berlin, Germany' },
        'Mumbai, India': { lat: 19.0760, lng: 72.8777, name: 'Mumbai, India' },
        'São Paulo, Brazil': { lat: -23.5505, lng: -46.6333, name: 'São Paulo, Brazil' },
        'Dubai, UAE': { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' }
    };

    const origin = locationCoords[data.origin] || locationCoords['New York, NY, USA'];
    const destination = locationCoords[data.destination] || locationCoords['London, UK'];
    
    let current;
    if (data.status === 'Delivered') {
        current = destination;
    } else if (data.status === 'Pending Pickup') {
        current = origin;
    } else {
        // Calculate intermediate position based on timeline progress
        const progress = calculateProgress(data);
        current = {
            lat: origin.lat + (destination.lat - origin.lat) * progress,
            lng: origin.lng + (destination.lng - origin.lng) * progress,
            name: 'In Transit'
        };
    }

    return { origin, current, destination };
}

// Calculate progress based on timeline
function calculateProgress(data) {
    if (!data.timeline || data.timeline.length === 0) {
        return Math.random() * 0.6 + 0.2; // Random progress between 20-80%
    }
    
    const totalSteps = 5; // Typical shipping steps
    const currentStep = data.timeline.length;
    return Math.min(currentStep / totalSteps, 0.9); // Max 90% until delivered
}

// Create custom map icons
function createCustomIcon(type) {
    const iconConfigs = {
        origin: { color: '#10b981', symbol: '📦', size: 30 },
        current: { color: '#f59e0b', symbol: '🚚', size: 35 },
        destination: { color: '#ef4444', symbol: '🏠', size: 30 }
    };

    const config = iconConfigs[type];
    
    return L.divIcon({
        html: `<div style="
            background: ${config.color};
            width: ${config.size}px;
            height: ${config.size}px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 3px 15px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            animation: ${type === 'current' ? 'pulse 2s infinite' : 'none'};
        ">${config.symbol}</div>`,
        className: 'custom-marker',
        iconSize: [config.size, config.size],
        iconAnchor: [config.size/2, config.size/2]
    });
}

// Create popup content for markers
function createPopupContent(title, location, status) {
    const statusText = status.replace('-', ' ').toUpperCase();
    return `
        <div class="custom-popup">
            <h4>${title}</h4>
            <p><strong>Location:</strong> ${location}</p>
            <span class="status ${status}">${statusText}</span>
            <div style="margin-top: 8px; font-size: 0.75rem; color: #6b7280;">
                ${new Date().toLocaleString()}
            </div>
        </div>
    `;
}

// Animate package movement for in-transit packages
function animatePackageMovement() {
    if (!trackingMap || currentMarkers.length < 2) return;
    
    let animationStep = 0;
    const animationInterval = setInterval(() => {
        const currentMarker = currentMarkers[1]; // Current location marker
        if (!currentMarker) {
            clearInterval(animationInterval);
            return;
        }
        
        const currentPos = currentMarker.getLatLng();
        const offset = 0.005; // Small movement offset
        const angle = (animationStep * 45) * (Math.PI / 180); // Convert to radians
        
        const newLat = currentPos.lat + Math.sin(angle) * offset;
        const newLng = currentPos.lng + Math.cos(angle) * offset;
        
        currentMarker.setLatLng([newLat, newLng]);
        animationStep++;
        
        // Stop animation after 16 steps (full circle)
        if (animationStep >= 16) {
            clearInterval(animationInterval);
        }
    }, 500);
}

// Center map on package location
function centerMapOnPackage() {
    if (trackingMap && currentMarkers.length > 1) {
        const currentMarker = currentMarkers[1]; // Current location marker
        trackingMap.setView(currentMarker.getLatLng(), 8);
        currentMarker.openPopup();
        
        // Add a subtle zoom animation
        setTimeout(() => {
            trackingMap.setZoom(10);
        }, 500);
    }
}

// Toggle route view
function toggleRouteView() {
    if (!trackingMap) return;

    const routeBtn = document.getElementById('routeViewBtn');
    
    if (routeControl) {
        trackingMap.removeLayer(routeControl);
        routeControl = null;
        routeBtn.innerHTML = '<i class="fas fa-route"></i> Show Route';
        routeBtn.classList.remove('active');
    } else {
        if (currentMarkers.length >= 3) {
            // Create animated route
            routeControl = L.polyline([
                currentMarkers[0].getLatLng(), // Origin
                currentMarkers[1].getLatLng(), // Current
                currentMarkers[2].getLatLng()  // Destination
            ], {
                color: '#2563eb',
                weight: 4,
                opacity: 0.8,
                dashArray: '10, 5',
                className: 'animated-route'
            }).addTo(trackingMap);
            
            // Add route markers for intermediate points
            addRouteMarkers();
            
            routeBtn.innerHTML = '<i class="fas fa-route"></i> Hide Route';
            routeBtn.classList.add('active');
        }
    }
}

// Add intermediate route markers
function addRouteMarkers() {
    if (currentMarkers.length < 3) return;
    
    const origin = currentMarkers[0].getLatLng();
    const destination = currentMarkers[2].getLatLng();
    
    // Add intermediate waypoints
    const waypoints = [
        { lat: origin.lat + (destination.lat - origin.lat) * 0.33, lng: origin.lng + (destination.lng - origin.lng) * 0.33 },
        { lat: origin.lat + (destination.lat - origin.lat) * 0.66, lng: origin.lng + (destination.lng - origin.lng) * 0.66 }
    ];
    
    waypoints.forEach((point, index) => {
        const waypointMarker = L.circleMarker([point.lat, point.lng], {
            radius: 6,
            fillColor: '#8b5cf6',
            color: 'white',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(trackingMap);
        
        waypointMarker.bindPopup(`<div class="custom-popup"><h4>Waypoint ${index + 1}</h4><p>Route checkpoint</p></div>`);
    });
}

// Toggle satellite view
function toggleSatelliteView() {
    if (!trackingMap) return;

    const satelliteBtn = document.getElementById('satelliteBtn');
    
    // Remove current tile layer
    trackingMap.eachLayer(function(layer) {
        if (layer._url) {
            trackingMap.removeLayer(layer);
        }
    });

    // Toggle between satellite and street view
    if (satelliteBtn.textContent.includes('Satellite')) {
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles © Esri',
            maxZoom: 18
        }).addTo(trackingMap);
        satelliteBtn.innerHTML = '<i class="fas fa-map"></i> Street View';
        satelliteBtn.classList.add('active');
    } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(trackingMap);
        satelliteBtn.innerHTML = '<i class="fas fa-satellite"></i> Satellite View';
        satelliteBtn.classList.remove('active');
    }
}

// Add weather overlay (optional feature)
function addWeatherOverlay() {
    if (!trackingMap) return;
    
    L.tileLayer('https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY', {
        attribution: 'Weather data © OpenWeatherMap',
        opacity: 0.5
    }).addTo(trackingMap);
}

// Export functions for global access
window.initializeTrackingMap = initializeTrackingMap;
window.centerMapOnPackage = centerMapOnPackage;
window.toggleRouteView = toggleRouteView;
window.toggleSatelliteView = toggleSatelliteView;