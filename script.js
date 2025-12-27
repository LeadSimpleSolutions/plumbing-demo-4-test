// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
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

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.feature-card, .service-card, .testimonial-card, ' +
    '.service-detail-card, .value-card, .team-member, ' +
    '.cert-item, .why-item, .additional-service'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('formMessage');
        const formData = new FormData(this);
        
        // Simulate form submission (replace with actual backend integration)
        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Thank you for your request! We\'ll contact you within 2 hours during business hours.';
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1000);
    });
}

// Hero form handling
const heroForm = document.getElementById('heroForm');
if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('heroFormMessage');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual backend integration)
        setTimeout(() => {
            formMessage.className = 'form-message success';
            formMessage.textContent = '✓ Success! We\'ll contact you within 2 hours.';
            heroForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1000);
        
        // For actual implementation, use fetch or XMLHttpRequest:
        /*
        fetch('your-backend-endpoint.php', {
            method: 'POST',
            body: new FormData(this)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! We\'ll contact you soon.';
                heroForm.reset();
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Something went wrong. Please try again.';
            }
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Network error. Please try again.';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        */
    });
}

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card, .feature-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Stats counter animation (for about page)
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const hasPlus = text.includes('+');
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            target.textContent = number.toLocaleString() + (hasPlus ? '+' : '');
                            clearInterval(timer);
                        } else {
                            target.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
                        }
                    }, 30);
                }
                observer.unobserve(target);
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(animateStats, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

// Add active state to current page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Testimonial card stagger animation
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Emergency notice pulse animation
const emergencyNotice = document.querySelector('.emergency-notice');
if (emergencyNotice) {
    setInterval(() => {
        emergencyNotice.style.transform = 'scale(1.02)';
        setTimeout(() => {
            emergencyNotice.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Add loading state to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    if (button.type === 'submit') {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                const originalText = this.textContent;
                this.classList.add('loading');
                this.textContent = 'Sending...';
                
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.textContent = originalText;
                }, 2000);
            }
        });
    }
});

// Console message for developers
console.log('%cPremier Plumbing Solutions', 'color: #1e3a8a; font-size: 24px; font-weight: bold;');
console.log('%cWebsite built with care and attention to detail', 'color: #2563eb; font-size: 14px;');

// Initialize all animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});
