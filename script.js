// Password visibility toggle
function initPasswordToggle() {
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (!passwordToggle || !passwordInput) return;
    
    const eyeIcon = passwordToggle.querySelector('.eye-icon');
    if (!eyeIcon) return;
    
    // Eye open SVG (when password is visible - show open eye)
    const eyeOpenSVG = `<path d="M10 4C6 4 2.73 6.61 1 10.5C2.73 14.39 6 17 10 17C14 17 17.27 14.39 19 10.5C17.27 6.61 14 4 10 4ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" fill="currentColor"/>`;
    
    // Eye closed/slashed SVG (when password is hidden - show closed eye with slash)
    const eyeClosedSVG = `<path d="M2.5 2.5L17.5 17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M10 4C6 4 2.73 6.61 1 10.5C2.73 14.39 6 17 10 17C11.5 17 12.8 16.5 13.9 15.7M16.2 13.2C17.1 12.1 17.7 10.8 18 10.5C17.27 6.61 14 4 10 4C9.1 4 8.2 4.2 7.4 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/><path d="M10 7C8.34 7 7 8.34 7 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>`;
    
    function togglePassword() {
        const currentType = passwordInput.getAttribute('type');
        const newType = currentType === 'password' ? 'text' : 'password';
        
        passwordInput.setAttribute('type', newType);
        
        // Update icon based on visibility state
        // When password is visible (text), show closed/slashed eye (click to hide)
        // When password is hidden (password), show open eye (click to show)
        if (newType === 'text') {
            // Password is visible - show closed/slashed eye icon
            eyeIcon.innerHTML = eyeClosedSVG;
            passwordToggle.setAttribute('aria-label', 'Hide password');
            passwordToggle.setAttribute('title', 'Hide password');
            // Add class to apply school theme color
            passwordToggle.classList.add('password-visible');
        } else {
            // Password is hidden - show open eye icon
            eyeIcon.innerHTML = eyeOpenSVG;
            passwordToggle.setAttribute('aria-label', 'Show password');
            passwordToggle.setAttribute('title', 'Show password');
            // Remove class to revert to default muted color
            passwordToggle.classList.remove('password-visible');
        }
        
        // Focus back on input for better UX
        passwordInput.focus();
    }
    
    // Add click event listener - primary handler
    function handleToggle(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        togglePassword();
    }
    
    passwordToggle.addEventListener('click', handleToggle);
    passwordToggle.addEventListener('mouseup', handleToggle);
    
    // Add touch event for better mobile support
    passwordToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        togglePassword();
    });
    
    // Also set onclick directly as fallback
    passwordToggle.onclick = handleToggle;
    
    // Debug: Log to console to verify button is found
    console.log('Password toggle initialized:', passwordToggle);
}

// Initialize password toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPasswordToggle);
} else {
    initPasswordToggle();
}

// Form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Add your login logic here
    console.log('Login attempt:', { username, password });
    
    // Example: Show loading state
    const submitButton = loginForm.querySelector('.signin-button');
    const originalText = submitButton.querySelector('.button-text').textContent;
    
    submitButton.querySelector('.button-text').textContent = 'Signing in...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitButton.querySelector('.button-text').textContent = originalText;
        submitButton.disabled = false;
        // Handle success/error here
    }, 2000);
});

// Add smooth focus transitions
const inputs = document.querySelectorAll('.glass-input');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add parallax effect to abstract background on mouse move
const leftPanel = document.querySelector('.left-panel');
const shapes = document.querySelectorAll('.shape');

if (leftPanel) {
    leftPanel.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = leftPanel;
        
        const xPos = (clientX / offsetWidth - 0.5) * 20;
        const yPos = (clientY / offsetHeight - 0.5) * 20;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
        });
    });
}

// Add entrance animations
window.addEventListener('load', () => {
    const formContainer = document.querySelector('.form-container');
    const logoContainer = document.querySelector('.logo-container');
    const graduationCap = document.querySelector('.graduation-cap');
    
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(20px)';
        formContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            formContainer.style.opacity = '1';
            formContainer.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (logoContainer) {
        logoContainer.style.opacity = '0';
        logoContainer.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            logoContainer.style.opacity = '1';
        }, 100);
    }
    
    // Trigger cap landing animation after initial load
    if (graduationCap) {
        // Reset animation to trigger it
        graduationCap.style.animation = 'none';
        setTimeout(() => {
            graduationCap.style.animation = 'capDescend 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }, 10);
    }
});

// Add continuous subtle animation to the cap after landing
window.addEventListener('load', () => {
    setTimeout(() => {
        const cap = document.querySelector('.graduation-cap');
        if (cap) {
            cap.style.animation = 'capDescend 2.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, capFloat 4s ease-in-out 2.5s infinite';
        }
    }, 100);
});

// Helper function to safely check if storage is available
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

// Helper function to safely get from localStorage
function safeGetStorage(key, defaultValue) {
    if (!isStorageAvailable()) {
        return defaultValue;
    }
    try {
        return localStorage.getItem(key) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// Helper function to safely set to localStorage
function safeSetStorage(key, value) {
    if (!isStorageAvailable()) {
        return false;
    }
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        return false;
    }
}

// Theme Toggle Functionality - Initialize after DOM is ready
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const currentTheme = safeGetStorage('theme', 'light');
    html.setAttribute('data-theme', currentTheme);

    // Update line gradient colors based on theme
    function updateLineColors() {
        const lineStops = document.querySelectorAll('.line-stop');
        const isDark = html.getAttribute('data-theme') === 'dark';
        
        lineStops.forEach(stop => {
            stop.setAttribute('stop-color', isDark ? '#ffffff' : '#000000');
        });
    }

    // Initialize line colors
    updateLineColors();

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        
        // Try to save theme preference, but don't fail if storage is unavailable
        safeSetStorage('theme', newTheme);
        
        // Update line gradient colors
        updateLineColors();
    });
}

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// Logo and Text Rotation - Change every 3 seconds
function initLogoRotation() {
    const logoImage = document.getElementById('logoImage');
    const logoText = document.getElementById('logoText');
    const logoImageMobile = document.getElementById('logoImageMobile');
    const logoTextMobile = document.getElementById('logoTextMobile');
    const html = document.documentElement;
    
    if (!logoImage || !logoText) return;
    
    const welcomeTitle = document.getElementById('welcomeTitle');
    
    const logos = [
        { image: '/Myskool.png', text: 'mySkool', theme: 'myskool', welcome: 'Welcome to mySkool!' },
        { image: '/HPGS.png', text: 'HPGS CONNECT', theme: 'hpgs', welcome: 'Welcome to HPGS CONNECT!' },
        { image: '/elixir.png', text: 'Elixir', theme: 'elixir', welcome: 'Welcome to Elixir!' },
        { image: '/iuss.png', text: 'IUSS', theme: 'iuss', welcome: 'Welcome to IUSS!' }
    ];
    
    let currentIndex = 0;
    
    // Update school name display
    function updateSchoolName() {
        const schoolNameEl = document.getElementById('currentSchoolName');
        if (schoolNameEl) {
            schoolNameEl.textContent = logos[currentIndex].text;
        }
    }
    
    // Update menu items to show available schools (excluding current)
    function updateMenuItems() {
        const menuItems = document.querySelectorAll('[data-action="switch-school"]');
        const currentSchool = logos[currentIndex].text;
        
        // Get all available schools except the current one
        const availableSchools = logos.filter(logo => logo.text !== currentSchool);
        
        // Update or create menu items
        menuItems.forEach((item, index) => {
            if (index < availableSchools.length) {
                const school = availableSchools[index];
                const label = item.querySelector('.fluid-nav-item-label');
                if (label) {
                    label.textContent = school.text;
                }
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // If we need more items than exist, create them
        if (availableSchools.length > menuItems.length) {
            const fluidNav = document.getElementById('fluidNav');
            if (fluidNav) {
                for (let i = menuItems.length; i < availableSchools.length; i++) {
                    const school = availableSchools[i];
                    const newItem = document.createElement('div');
                    newItem.className = 'fluid-nav-item';
                    newItem.setAttribute('data-action', 'switch-school');
                    newItem.innerHTML = `
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L3 7V17H7V12H13V17H17V7L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="fluid-nav-item-label">${school.text}</span>
                    `;
                    fluidNav.appendChild(newItem);
                }
            }
        }
    }
    
    function rotateLogo() {
        // Fade out
        logoImage.style.opacity = '0';
        logoText.style.opacity = '0';
        if (welcomeTitle) {
            welcomeTitle.style.opacity = '0';
        }
        
        setTimeout(() => {
            // Change logo and text
            currentIndex = (currentIndex + 1) % logos.length;
            logoImage.src = logos[currentIndex].image;
            logoImage.alt = logos[currentIndex].text + ' Logo';
            logoText.textContent = logos[currentIndex].text;
            
            // Update mobile logo if it exists
            if (logoImageMobile) {
                logoImageMobile.src = logos[currentIndex].image;
                logoImageMobile.alt = logos[currentIndex].text + ' Logo';
            }
            if (logoTextMobile) {
                logoTextMobile.textContent = logos[currentIndex].text;
            }
            
            // Update welcome title
            if (welcomeTitle) {
                welcomeTitle.textContent = logos[currentIndex].welcome;
            }
            
            // Update data-logo attribute to change colors
            const theme = logos[currentIndex].theme;
            if (theme === 'hpgs' || theme === 'elixir' || theme === 'iuss') {
                html.setAttribute('data-logo', theme);
            } else {
                html.removeAttribute('data-logo');
            }
            
            // Update school name in fluid nav
            updateSchoolName();
            
            // Update menu items
            updateMenuItems();
            
            // Fade in
            logoImage.style.opacity = '1';
            logoText.style.opacity = '1';
            if (welcomeTitle) {
                welcomeTitle.style.opacity = '1';
            }
            
            // Re-initialize 3D hover effect for new logo after image loads
            logoImage.onload = () => {
                initLogo3DHover();
            };
            if (logoImage.complete) {
                setTimeout(() => {
                    initLogo3DHover();
                }, 100);
            }
        }, 300); // Half of transition time
    }
    
    // Function to switch to a specific school
    function switchToSchool(schoolName) {
        const schoolIndex = logos.findIndex(logo => logo.text === schoolName);
        if (schoolIndex !== -1 && schoolIndex !== currentIndex) {
            // Fade out
            logoImage.style.opacity = '0';
            logoText.style.opacity = '0';
            if (welcomeTitle) {
                welcomeTitle.style.opacity = '0';
            }
            
            setTimeout(() => {
                // Change logo and text
                currentIndex = schoolIndex;
                logoImage.src = logos[currentIndex].image;
                logoImage.alt = logos[currentIndex].text + ' Logo';
                logoText.textContent = logos[currentIndex].text;
                
                // Update mobile logo if it exists
                if (logoImageMobile) {
                    logoImageMobile.src = logos[currentIndex].image;
                    logoImageMobile.alt = logos[currentIndex].text + ' Logo';
                }
                if (logoTextMobile) {
                    logoTextMobile.textContent = logos[currentIndex].text;
                }
                
                // Update welcome title
                if (welcomeTitle) {
                    welcomeTitle.textContent = logos[currentIndex].welcome;
                }
                
                // Update data-logo attribute to change colors
                const theme = logos[currentIndex].theme;
                if (theme === 'hpgs' || theme === 'elixir' || theme === 'iuss') {
                    html.setAttribute('data-logo', theme);
                } else {
                    html.removeAttribute('data-logo');
                }
                
                // Update school name in fluid nav
                updateSchoolName();
                
                // Update menu items
                updateMenuItems();
                
                // Fade in
                logoImage.style.opacity = '1';
                logoText.style.opacity = '1';
                if (welcomeTitle) {
                    welcomeTitle.style.opacity = '1';
                }
                
                // Reset transform after fade in
                setTimeout(() => {
                    logoImage.style.setProperty('transform', 'rotateX(0deg) rotateY(0deg)', 'important');
                    // Re-initialize 3D hover effect for new logo
                    initLogo3DHover();
                }, 600);
            }, 300);
        }
    }
    
    // Add transition for smooth fade
    logoImage.style.transition = 'opacity 0.6s ease';
    logoText.style.transition = 'opacity 0.6s ease';
    if (welcomeTitle) {
        welcomeTitle.style.transition = 'opacity 0.6s ease, color 0.6s ease';
    }
    
    // Expose functions globally for fluid nav
    window.switchSchool = function() {
        rotateLogo();
    };
    
    window.switchToSchool = function(schoolName) {
        switchToSchool(schoolName);
    };
    
    // Initialize school name and menu items
    updateSchoolName();
    updateMenuItems();
}

// Fluid Navigation Menu
function initFluidNavigation() {
    const fluidNav = document.getElementById('fluidNav');
    const fluidNavToggle = document.getElementById('fluidNavToggle');
    const switchSchoolItem = document.querySelector('[data-action="switch-school"]');
    const toggleThemeItem = document.querySelector('[data-action="toggle-theme"]');
    
    if (!fluidNav || !fluidNavToggle) return;
    
    let isExpanded = false;
    
    function toggleMenu() {
        isExpanded = !isExpanded;
        fluidNav.setAttribute('data-expanded', isExpanded);
    }
    
    // Toggle menu on main button click
    fluidNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Switch school - handle all school items (use event delegation for dynamic items)
    document.addEventListener('click', (e) => {
        const schoolItem = e.target.closest('[data-action="switch-school"]');
        if (schoolItem && isExpanded) {
            e.stopPropagation();
            const schoolName = schoolItem.querySelector('.fluid-nav-item-label')?.textContent.trim();
            if (schoolName && window.switchToSchool) {
                window.switchToSchool(schoolName);
            } else if (window.switchSchool) {
                window.switchSchool();
            }
            toggleMenu();
        }
    });
    
    // Toggle theme
    if (toggleThemeItem) {
        toggleThemeItem.addEventListener('click', (e) => {
            e.stopPropagation();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
            }
            toggleMenu();
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isExpanded && !fluidNav.contains(e.target)) {
            isExpanded = false;
            fluidNav.setAttribute('data-expanded', 'false');
        }
    });
}

// 3D Hover Effect for Logo - Interactive mouse-based tilt
let logo3DHoverHandlers = null;
function initLogo3DHover() {
    const logoImage = document.getElementById('logoImage');
    const logoWrapper = document.querySelector('.logo-wrapper');
    if (!logoImage || !logoWrapper) return;
    
    // Remove old event listeners if they exist
    if (logo3DHoverHandlers) {
        logoWrapper.removeEventListener('mouseenter', logo3DHoverHandlers.enter);
        logoWrapper.removeEventListener('mouseleave', logo3DHoverHandlers.leave);
        logoWrapper.removeEventListener('mousemove', logo3DHoverHandlers.move);
    }
    
    let isHovering = false;
    
    const handleMouseEnter = () => {
        isHovering = true;
        logoImage.style.transition = 'transform 0.1s ease-out';
    };
    
    const handleMouseLeave = () => {
        isHovering = false;
        logoImage.style.transition = 'transform 0.4s ease-out';
        logoImage.style.setProperty('transform', 'rotateX(0deg) rotateY(0deg)', 'important');
    };
    
    const handleMouseMove = (e) => {
        if (!isHovering) return;
        
        const rect = logoWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate rotation based on mouse position (max 20 degrees)
        const rotateY = (mouseX / (rect.width / 2)) * 20;
        const rotateX = -(mouseY / (rect.height / 2)) * 20;
        
        // Apply 3D transform with !important to override CSS
        logoImage.style.setProperty('transform', `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`, 'important');
    };
    
    logoWrapper.addEventListener('mouseenter', handleMouseEnter);
    logoWrapper.addEventListener('mouseleave', handleMouseLeave);
    logoWrapper.addEventListener('mousemove', handleMouseMove);
    
    // Store handlers for cleanup
    logo3DHoverHandlers = {
        enter: handleMouseEnter,
        leave: handleMouseLeave,
        move: handleMouseMove
    };
}

// Initialize logo rotation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLogoRotation();
        initFluidNavigation();
        initLogo3DHover();
    });
} else {
    initLogoRotation();
    initFluidNavigation();
    initLogo3DHover();
}