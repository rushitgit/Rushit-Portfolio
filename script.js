document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll) with optimized settings for performance
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        disable: 'mobile',
        startEvent: 'DOMContentLoaded',
        offset: 100
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position - optimized
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Throttle scroll events for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                updateActiveNavLink();
                isScrolling = false;
            }, 100);
        }
    });
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + 300;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    }
    
    // Enhanced Experience Section Animations
    initializeExperienceAnimations();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Log form data (replace with actual form submission)
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Add minimal neon text effects to specific elements
    addMinimalEffects();
    
    // Initialize the journey line once on load
    setTimeout(updateJourneyLine, 500);
});

// Enhanced Experience Section Animations
function initializeExperienceAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    // Create Intersection Observer for timeline items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation delay
                const index = Array.from(timelineItems).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                }, index * 150);
                
                // Unobserve after animation is triggered
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all timeline items
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Enhanced hover effects for timeline items
    timelineItems.forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        const dot = item.querySelector('.timeline-dot');
        const logo = item.querySelector('.company-logo');
        
        if (content) {
            // Add mouse enter/leave effects
            content.addEventListener('mouseenter', () => {
                // Pause any ongoing animations on hover
                if (dot) {
                    dot.style.animationPlayState = 'paused';
                }
                
                // Add ripple effect
                createRippleEffect(content);
            });
            
            content.addEventListener('mouseleave', () => {
                // Resume animations
                if (dot) {
                    dot.style.animationPlayState = 'running';
                }
            });
        }
        
        // Add logo loading effect
        if (logo) {
            // Check if image is loaded
            if (logo.complete) {
                logo.style.opacity = '1';
            } else {
                logo.addEventListener('load', () => {
                    logo.style.opacity = '1';
                    logo.style.transform = 'scale(1)';
                });
            }
        }
    });
    
    // Add floating animation trigger on scroll
    const experienceSection = document.querySelector('#experience');
    if (experienceSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    experienceSection.classList.add('section-active');
                    startFloatingParticles();
                }
            });
        }, { threshold: 0.3 });
        
        sectionObserver.observe(experienceSection);
    }
}

// Create ripple effect on timeline item hover
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'timeline-ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(76, 201, 240, 0.1)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '0';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Animate ripple
    requestAnimationFrame(() => {
        ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        ripple.style.transform = 'translate(-50%, -50%) scale(2)';
        ripple.style.opacity = '0';
    });
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Start floating particles animation
function startFloatingParticles() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.setProperty('--particle-delay', `${index * 0.5}s`);
        }, index * 200);
    });
}

// Enhanced company logo loading
function initializeCompanyLogos() {
    const logoIds = ['deriv-logo', 'jetsynthesys-logo', 'xpert-logo', 'cybage-logo', 'forcemotors-logo'];
    const logoUrls = {
        'deriv-logo': 'assets/images/logos/deriv-logo.png',
        'jetsynthesys-logo': 'assets/images/logos/jetsynthesys-logo.png',
        'xpert-logo': 'assets/images/logos/xpert-logo.png',
        'cybage-logo': 'assets/images/logos/cybage-logo.png',
        'forcemotors-logo': 'assets/images/logos/forcemotors-logo.png'
    };
    
    logoIds.forEach(id => {
        const img = document.getElementById(id);
        if (img && logoUrls[id]) {
            // Create new image element to preload
            const newImg = new Image();
            newImg.onload = function() {
                img.src = logoUrls[id];
                img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            };
            newImg.onerror = function() {
                // Keep placeholder if logo fails to load
                console.log(`Failed to load logo: ${id}`);
            };
            // Start loading
            newImg.src = logoUrls[id];
        }
    });
}

// Call logo initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeCompanyLogos();
});

// Function to add minimal neon text effects
function addMinimalEffects() {
    // Only apply glow to important titles, not all elements
    const glowElements = document.querySelectorAll('.section-title, .hero-content h1');
    
    glowElements.forEach(element => {
        element.classList.add('text-glow');
    });
}

// Update journey line height
function updateJourneyLine() {
    const journeySection = document.querySelector('.timeline-journey');
    if(!journeySection) return;
    
    const journeyLine = document.querySelector('.journey-line');
    const firstItem = document.querySelector('.journey-item:first-child');
    const lastItem = document.querySelector('.journey-item:last-child');
    
    if(journeyLine && firstItem && lastItem) {
        const firstIconTop = firstItem.querySelector('.journey-icon').offsetTop;
        const lastIconBottom = lastItem.querySelector('.journey-icon').offsetTop + 60;
        const lineHeight = lastIconBottom - firstIconTop + 30;
        
        journeyLine.style.height = `${lineHeight}px`;
        journeyLine.style.top = `${firstIconTop}px`;
    }
} 