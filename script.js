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