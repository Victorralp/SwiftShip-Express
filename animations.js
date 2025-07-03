// Advanced Animations and Effects

// Create particles for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    
    for (let i = 0; i < 9; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Create scroll progress bar
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Create floating back to top button
function createFloatingButton() {
    const floatingBtn = document.createElement('a');
    floatingBtn.href = '#home';
    floatingBtn.className = 'floating-btn';
    floatingBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    floatingBtn.style.display = 'none';
    
    document.body.appendChild(floatingBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            floatingBtn.style.display = 'flex';
        } else {
            floatingBtn.style.display = 'none';
        }
    });
    
    floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced form animations
function enhanceFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            input.addEventListener('focus', () => {
                label.style.transform = 'translateY(-5px) scale(0.9)';
                label.style.color = '#2563eb';
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '#374151';
                }
            });
        }
    });
}

// Typewriter effect for hero text
function typewriterEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        heroTitle.textContent += text.charAt(i);
        i++;
        
        if (i > text.length) {
            clearInterval(typeInterval);
            heroTitle.style.borderRight = 'none';
        }
    }, 100);
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image i, .service-card i');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Magnetic button effect
function magneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .ship-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Glitch effect for loading
function glitchEffect(element) {
    const glitchInterval = setInterval(() => {
        element.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
        element.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.filter = 'hue-rotate(0deg)';
        }, 100);
    }, 2000);
    
    return glitchInterval;
}

// Ripple effect for buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all animations
function initializeAnimations() {
    createParticles();
    createScrollProgress();
    createFloatingButton();
    enhanceFormAnimations();
    magneticButtons();
    addRippleEffect();
    initParallax();
    
    // Delay typewriter effect
    setTimeout(typewriterEffect, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Export functions for global use
window.glitchEffect = glitchEffect;