// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to form functionality for all contact buttons
document.querySelectorAll('.scroll-to-form').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const formSection = document.getElementById('quick-assessment-form');
        if (formSection) {
            const headerOffset = 120;
            const elementPosition = formSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Focus first input after scroll
            setTimeout(() => {
                const firstInput = formSection.querySelector('input');
                if (firstInput) {
                    firstInput.focus();
                    // firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 600);
        }
    });
});

// Form submission handler
const quickForm = document.getElementById('quickForm');
if (quickForm) {
    quickForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, textarea');
        const data = {};
        
        inputs.forEach(input => {
            data[input.placeholder || input.name] = input.value;
        });
        
        // Demo form - just show alert
        alert('Демо-форма отправлена! В реальном сайте данные будут отправлены в Telegram/CRM.\n\n' + 
              JSON.stringify(data, null, 2));
        
        // Reset form
        this.reset();
    });
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = null;
            }
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            
            // Use existing answer element
            const answer = faqItem.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .stage-card, .goal-card, .workflow-step, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Button click handlers (for ripple effect)
document.querySelectorAll('.btn-yellow, .btn-dark').forEach(button => {
    button.addEventListener('click', function(e) {
        // Skip if this button has scroll-to-form class (handled separately)
        if (this.classList.contains('scroll-to-form')) {
            return;
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect to scroll-to-form buttons
document.querySelectorAll('.scroll-to-form').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding: 0 20px;
    }
    
    .faq-item.active .faq-answer {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .faq-answer p {
        color: var(--text-light);
        line-height: 1.7;
        font-size: 15px;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle functionality
const initMobileMenu = () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const mobileButtons = document.querySelectorAll('.mobile-buttons .btn');
    
    if (!mobileToggle || !mobileMenu) return;
    
    // Toggle menu on button click
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = mobileMenu.classList.contains('active');
        
        // Toggle active state
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking on mobile buttons
    mobileButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Небольшая задержка для плавного перехода к форме
            setTimeout(() => {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }, 300);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize if it becomes desktop size
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }, 100);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });
};

// Initialize mobile menu on load
document.addEventListener('DOMContentLoaded', initMobileMenu);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%cGRANDLEGAL', 'font-size: 24px; font-weight: bold; color: #ffd700;');
console.log('%cАнтикризисное управление', 'font-size: 14px; color: #ffffff;');
