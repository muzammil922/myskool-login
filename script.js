// Password visibility toggle
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');

passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Update icon (simple toggle - you can enhance with different icons)
    const eyeIcon = passwordToggle.querySelector('.eye-icon');
    if (type === 'text') {
        eyeIcon.style.opacity = '0.7';
    } else {
        eyeIcon.style.opacity = '1';
    }
});

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

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light
let currentTheme = 'light';
try {
    currentTheme = localStorage.getItem('theme') || 'light';
} catch (e) {
    // Storage access not allowed (e.g., in iframe or restricted context)
    console.warn('Storage access not available:', e);
    currentTheme = 'light';
}
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
    try {
        localStorage.setItem('theme', newTheme);
    } catch (e) {
        // Storage access not allowed (e.g., in iframe or restricted context)
        console.warn('Could not save theme preference:', e);
    }
    
    // Update line gradient colors
    updateLineColors();
});