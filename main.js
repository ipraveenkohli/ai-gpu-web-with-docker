// GPU Rental Business - Main JavaScript File
// Handles all interactive functionality and animations

class GPURentalApp {
    constructor() {
        this.currentStep = 1;
        this.maxSteps = 4;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.setupParticleBackground();
        this.initScrollAnimations();
    }

    setupEventListeners() {
        // Lead form modal
        document.addEventListener('click', (e) => {
            if (e.target.matches('.cta-button') || e.target.closest('.cta-button')) {
                e.preventDefault();
                this.openLeadForm();
            }
            
            if (e.target.matches('.modal-close') || e.target.classList.contains('modal-overlay')) {
                this.closeLeadForm();
            }

            // Form navigation
            if (e.target.matches('.next-step')) {
                e.preventDefault();
                this.nextStep();
            }
            
            if (e.target.matches('.prev-step')) {
                e.preventDefault();
                this.prevStep();
            }

            // Mobile menu
            if (e.target.matches('.mobile-menu-toggle')) {
                this.toggleMobileMenu();
            }
        });

        // Form validation
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-input')) {
                this.validateField(e.target);
            }
        });

        // GPU card interactions
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.gpu-card')) {
                this.handleGpuCardHover(e.target.closest('.gpu-card'));
            }
        });

        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    initAnimations() {
        // Typewriter effect for hero text
        if (document.querySelector('.typewriter-text')) {
            this.typewriterEffect();
        }

        // Animate numbers on scroll
        this.animateNumbers();
    }

    setupParticleBackground() {
        if (document.querySelector('#particle-canvas')) {
            this.initParticleSystem();
        }
    }

    initParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    typewriterEffect() {
        const element = document.querySelector('.typewriter-text');
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add gradient effect after typing
                element.style.background = 'linear-gradient(45deg, #00D4FF, #00FFFF)';
                element.style.webkitBackgroundClip = 'text';
                element.style.webkitTextFillColor = 'transparent';
            }
        }, 50);
    }

    animateNumbers() {
        const numberElements = document.querySelectorAll('.animate-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent.replace(/[^0-9]/g, ''));
                    this.countUp(target, finalNumber);
                    observer.unobserve(target);
                }
            });
        });

        numberElements.forEach(el => observer.observe(el));
    }

    countUp(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = element.textContent.replace(/[0-9,]+/, Math.floor(current).toLocaleString());
        }, 30);
    }

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    openLeadForm() {
        const modal = document.getElementById('lead-form-modal');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        this.currentStep = 1;
        this.updateFormStep();
        
        // Animate modal appearance
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    closeLeadForm() {
        const modal = document.getElementById('lead-form-modal');
        modal.style.opacity = '0';
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            if (this.currentStep < this.maxSteps) {
                this.currentStep++;
                this.updateFormStep();
            } else {
                this.submitForm();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateFormStep();
        }
    }

    updateFormStep() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.style.display = 'none';
        });
        
        // Show current step
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (currentStepEl) {
            currentStepEl.style.display = 'block';
        }
        
        // Update progress bar
        const progress = (this.currentStep / this.maxSteps) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        // Update step indicator
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            if (index + 1 <= this.currentStep) {
                indicator.classList.add('completed');
            } else {
                indicator.classList.remove('completed');
            }
        });
    }

    validateCurrentStep() {
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        const requiredFields = currentStepEl.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            message = 'This field is required';
            isValid = false;
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                message = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Show error if invalid
        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        field.parentNode.appendChild(errorEl);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    saveCurrentStepData() {
        const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"]`);
        const inputs = currentStepEl.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            this.formData[input.name] = input.value;
        });
    }

    submitForm() {
        // Show loading state
        const submitBtn = document.querySelector('.submit-form');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showSuccessMessage();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const successEl = document.createElement('div');
        successEl.className = 'success-message';
        successEl.innerHTML = `
            <div class="success-content">
                <h3>Thank You!</h3>
                <p>We've received your request and will contact you within 24 hours.</p>
                <button onclick="this.closest('.success-message').remove()" class="btn-primary">Close</button>
            </div>
        `;
        document.body.appendChild(successEl);
        
        setTimeout(() => {
            this.closeLeadForm();
            successEl.remove();
        }, 3000);
    }

    handleGpuCardHover(card) {
        // Add 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    toggleMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        menu.classList.toggle('active');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GPURentalApp();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}