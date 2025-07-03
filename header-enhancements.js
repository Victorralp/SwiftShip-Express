// Advanced Header Enhancements

// Add search functionality to header
function addHeaderSearch() {
    const navContainer = document.querySelector('.nav-container');
    const searchContainer = document.createElement('div');
    searchContainer.className = 'header-search';
    searchContainer.innerHTML = `
        <div class="search-wrapper">
            <input type="text" placeholder="Track package..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
    `;
    
    // Insert before nav-menu
    const navMenu = document.querySelector('.nav-menu');
    navContainer.insertBefore(searchContainer, navMenu);
    
    // Add search styles
    const searchStyles = `
        .header-search {
            display: flex;
            align-items: center;
            margin-right: 20px;
        }
        
        .search-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 25px;
            padding: 2px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .search-wrapper:focus-within {
            border-color: #667eea;
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
            transform: scale(1.02);
        }
        
        .search-input {
            border: none;
            outline: none;
            padding: 10px 15px;
            border-radius: 25px;
            background: transparent;
            width: 200px;
            transition: width 0.3s ease;
            font-size: 0.9rem;
        }
        
        .search-input:focus {
            width: 250px;
        }
        
        .search-btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-btn:hover {
            transform: scale(1.1) rotate(90deg);
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        @media (max-width: 768px) {
            .header-search {
                display: none;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = searchStyles;
    document.head.appendChild(style);
    
    // Add search functionality
    const searchInput = searchContainer.querySelector('.search-input');
    const searchBtn = searchContainer.querySelector('.search-btn');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // If it looks like a tracking number, go to tracking
            if (query.match(/^SW\d+/i)) {
                document.getElementById('trackingNumber').value = query;
                scrollToSection('tracking');
                setTimeout(() => handleTrackingSearch(query), 500);
            } else {
                showNotification('Please enter a valid tracking number (e.g., SW123456789)', 'info');
            }
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Add notification badge to header
function addNotificationBadge() {
    const navMenu = document.querySelector('.nav-menu');
    const notificationItem = document.createElement('li');
    notificationItem.innerHTML = `
        <a href="#" class="notification-link">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
        </a>
    `;
    
    // Insert before ship-now button
    const shipBtn = navMenu.querySelector('li:last-child');
    navMenu.insertBefore(notificationItem, shipBtn);
    
    // Add notification styles
    const notificationStyles = `
        .notification-link {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.1);
            transition: all 0.3s ease;
            text-decoration: none;
            color: #667eea;
        }
        
        .notification-link:hover {
            background: rgba(102, 126, 234, 0.2);
            transform: scale(1.1);
            color: #764ba2;
        }
        
        .notification-link i {
            font-size: 1.2rem;
            animation: bellRing 2s ease-in-out infinite;
        }
        
        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            font-weight: 700;
            animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes bellRing {
            0%, 100% { transform: rotate(0deg); }
            10%, 30% { transform: rotate(10deg); }
            20% { transform: rotate(-10deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        @media (max-width: 768px) {
            .notification-link {
                width: 40px;
                height: 40px;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = notificationStyles;
    document.head.appendChild(style);
}

// Add breadcrumb navigation
function addBreadcrumb() {
    const navbar = document.querySelector('.navbar');
    const breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumb-container';
    breadcrumb.innerHTML = `
        <div class="breadcrumb">
            <a href="#home">Home</a>
            <span class="separator">></span>
            <span class="current">Dashboard</span>
        </div>
    `;
    
    navbar.appendChild(breadcrumb);
    
    // Add breadcrumb styles
    const breadcrumbStyles = `
        .breadcrumb-container {
            background: rgba(102, 126, 234, 0.05);
            padding: 8px 0;
            border-top: 1px solid rgba(102, 126, 234, 0.1);
        }
        
        .breadcrumb {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 30px;
            display: flex;
            align-items: center;
            font-size: 0.85rem;
            color: #6b7280;
        }
        
        .breadcrumb a {
            color: #667eea;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .breadcrumb a:hover {
            color: #764ba2;
        }
        
        .separator {
            margin: 0 10px;
            color: #d1d5db;
        }
        
        .current {
            color: #374151;
            font-weight: 500;
        }
        
        @media (max-width: 768px) {
            .breadcrumb {
                padding: 0 20px;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = breadcrumbStyles;
    document.head.appendChild(style);
}

// Add header announcement bar
function addAnnouncementBar() {
    const body = document.body;
    const announcement = document.createElement('div');
    announcement.className = 'announcement-bar';
    announcement.innerHTML = `
        <div class="announcement-content">
            <i class="fas fa-gift"></i>
            <span>🎉 Free shipping on orders over $100! Use code: FREESHIP100</span>
            <button class="close-announcement">&times;</button>
        </div>
    `;
    
    body.insertBefore(announcement, body.firstChild);
    
    // Add announcement styles
    const announcementStyles = `
        .announcement-bar {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 10px 0;
            text-align: center;
            position: relative;
            z-index: 1001;
            animation: slideDown 0.5s ease-out;
        }
        
        .announcement-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            position: relative;
        }
        
        .announcement-content i {
            animation: bounce 2s ease-in-out infinite;
        }
        
        .close-announcement {
            position: absolute;
            right: 20px;
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .close-announcement:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .announcement-content span {
                font-size: 0.9rem;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = announcementStyles;
    document.head.appendChild(style);
    
    // Add close functionality
    const closeBtn = announcement.querySelector('.close-announcement');
    closeBtn.addEventListener('click', () => {
        announcement.style.animation = 'slideUp 0.3s ease-out forwards';
        setTimeout(() => {
            announcement.remove();
            // Adjust navbar position
            document.querySelector('.navbar').style.top = '0';
        }, 300);
    });
    
    // Adjust navbar position
    document.querySelector('.navbar').style.top = announcement.offsetHeight + 'px';
    
    // Add slide up animation
    const slideUpStyle = document.createElement('style');
    slideUpStyle.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(-100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(slideUpStyle);
}

// Initialize all header enhancements
function initializeHeaderEnhancements() {
    addAnnouncementBar();
    addHeaderSearch();
    addNotificationBadge();
    // addBreadcrumb(); // Uncomment if needed
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeHeaderEnhancements, 100);
});

// Export functions
window.addHeaderSearch = addHeaderSearch;
window.addNotificationBadge = addNotificationBadge;
window.addBreadcrumb = addBreadcrumb;
window.addAnnouncementBar = addAnnouncementBar;