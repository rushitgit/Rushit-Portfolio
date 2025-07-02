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
    
    // Initialize About Section Animations
    initAboutAnimations();
    
    // Initialize Experience Section Animations
    initExperienceAnimations();
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

// ==========================================================================
// About Section Anime.js Animations
// ==========================================================================

function initAboutAnimations() {
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded, using fallback animations');
        return;
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-anime');
                const delay = parseInt(element.getAttribute('data-delay')) || 0;

                switch (animationType) {
                    case 'fadeInUp':
                        animateFadeInUp(element, delay);
                        break;
                    case 'slideInLeft':
                        animateSlideInLeft(element, delay);
                        break;
                    case 'slideInRight':
                        animateSlideInRight(element, delay);
                        break;
                    case 'scaleIn':
                        animateScaleIn(element, delay);
                        break;
                    case 'slideInUp':
                        animateSlideInUp(element, delay);
                        break;
                    case 'textReveal':
                        animateTextReveal(element, delay);
                        break;
                    case 'counter':
                        animateCounter(element, delay);
                        break;
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all elements with data-anime attributes
    document.querySelectorAll('[data-anime]').forEach(el => {
        // Set initial states
        const animationType = el.getAttribute('data-anime');
        setInitialState(el, animationType);
        observer.observe(el);
    });

    // Initialize floating animations for avatar tech icons
    initFloatingAnimations();
}

// Set initial states for animations
function setInitialState(element, animationType) {
    switch (animationType) {
        case 'fadeInUp':
            anime.set(element, {
                opacity: 0,
                translateY: 50
            });
            break;
        case 'slideInLeft':
            anime.set(element, {
                opacity: 0,
                translateX: -100
            });
            break;
        case 'slideInRight':
            anime.set(element, {
                opacity: 0,
                translateX: 100
            });
            break;
        case 'scaleIn':
            anime.set(element, {
                opacity: 0,
                scale: 0.8
            });
            break;
        case 'slideInUp':
            anime.set(element, {
                opacity: 0,
                translateY: 60
            });
            break;
        case 'textReveal':
            anime.set(element, {
                opacity: 0,
                translateY: 30
            });
            break;
    }
}

// Animation functions
function animateFadeInUp(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: delay,
        easing: 'easeOutCubic'
    });
}

function animateSlideInLeft(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateX: [-100, 0],
        duration: 800,
        delay: delay,
        easing: 'easeOutElastic(1, .8)'
    });
}

function animateSlideInRight(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 800,
        delay: delay + 100,
        easing: 'easeOutElastic(1, .8)'
    });
}

function animateScaleIn(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        delay: delay,
        easing: 'easeOutBack(1.7)'
    });
}

function animateSlideInUp(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 1000,
        delay: delay,
        easing: 'easeOutCubic'
    });
}

function animateTextReveal(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: delay,
        easing: 'easeOutQuart',
        complete: function() {
            // Add a subtle pulse effect after reveal
            anime({
                targets: element,
                scale: [1, 1.02, 1],
                duration: 1000,
                easing: 'easeInOutSine'
            });
        }
    });
}

function animateCounter(element, delay = 0) {
    const target = parseInt(element.getAttribute('data-target'));
    const numberElement = element.querySelector('.stat-number');
    
    anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 600,
        delay: delay,
        easing: 'easeOutBack(1.7)',
        complete: function() {
            // Counter animation
            anime({
                targets: { count: 0 },
                count: target,
                duration: 2000,
                easing: 'easeOutCubic',
                update: function(anim) {
                    numberElement.textContent = Math.round(anim.animatables[0].target.count);
                }
            });
        }
    });
}

// Floating animations for avatar tech icons
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('[data-anime="floating"]');
    
    floatingElements.forEach((element, index) => {
        anime({
            targets: element,
            translateY: [0, -15, 0],
            duration: 2000 + (index * 200),
            easing: 'easeInOutSine',
            loop: true,
            delay: index * 500
        });
    });
}

// Advanced hover animations for cards
document.addEventListener('DOMContentLoaded', function() {
    // Achievement card hover animations
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.achievement-icon i');
            const badge = card.querySelector('.achievement-badge');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: icon,
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, 0],
                    duration: 500,
                    easing: 'easeInOutSine'
                });
                
                anime({
                    targets: badge,
                    scale: [1, 1.3],
                    rotate: [0, 15],
                    duration: 300,
                    easing: 'easeOutBack(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = card.querySelector('.achievement-badge');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: badge,
                    scale: [1.3, 1],
                    rotate: [15, 0],
                    duration: 300,
                    easing: 'easeInCubic'
                });
            }
        });
    });

    // Description card hover animations
    const descriptionCards = document.querySelectorAll('.description-card');
    
    descriptionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = card.querySelector('.card-icon i');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: icon,
                    scale: [1, 1.1],
                    rotate: [0, 5],
                    duration: 300,
                    easing: 'easeOutBack(1.7)'
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = card.querySelector('.card-icon i');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: icon,
                    scale: [1.1, 1],
                    rotate: [5, 0],
                    duration: 300,
                    easing: 'easeInCubic'
                });
            }
        });
    });

    // Stat card pulse animation on hover
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const number = card.querySelector('.stat-number');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: number,
                    scale: [1, 1.1, 1],
                    duration: 400,
                    easing: 'easeInOutSine'
                });
                         }
         });
     });
});

// ==========================================================================
// Premium Experience Section Animations
// ==========================================================================

function initExperienceAnimations() {
    // Check if anime.js is loaded
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded for experience animations');
        return;
    }

    // Intersection Observer for experience animations
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-anime');
                const delay = parseInt(element.getAttribute('data-delay')) || 0;

                switch (animationType) {
                    case 'titleReveal':
                        animateExperienceTitle(element, delay);
                        break;
                    case 'slideInUp':
                        animateExperienceSlideUp(element, delay);
                        break;
                    case 'counterUp':
                        animateExperienceCounter(element, delay);
                        break;
                    case 'iconPop':
                        animateCareerIcon(element, delay);
                        break;
                    case 'experienceReveal':
                        animateExperienceCard(element, delay);
                        break;
                    case 'achievementSlide':
                        animateAchievement(element, delay);
                        break;
                    case 'summaryReveal':
                        animateExperienceSummary(element, delay);
                        break;
                }
                
                experienceObserver.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all experience elements with data-anime attributes
    document.querySelectorAll('#experience [data-anime]').forEach(el => {
        const animationType = el.getAttribute('data-anime');
        setExperienceInitialState(el, animationType);
        experienceObserver.observe(el);
    });

    // Initialize continuous animations
    initExperienceContinuousAnimations();
}

// Set initial states for experience animations
function setExperienceInitialState(element, animationType) {
    switch (animationType) {
        case 'titleReveal':
            anime.set(element, {
                opacity: 0,
                translateY: 50,
                scale: 0.9
            });
            break;
        case 'slideInUp':
            anime.set(element, {
                opacity: 0,
                translateY: 80
            });
            break;
        case 'counterUp':
            anime.set(element, {
                opacity: 0,
                scale: 0.8
            });
            break;
        case 'iconPop':
            anime.set(element, {
                opacity: 0,
                scale: 0.5,
                rotate: -180
            });
            break;
        case 'experienceReveal':
            anime.set(element, {
                opacity: 0,
                translateY: 100,
                scale: 0.95
            });
            break;
        case 'achievementSlide':
            anime.set(element, {
                opacity: 0,
                translateX: -50
            });
            break;
        case 'summaryReveal':
            anime.set(element, {
                opacity: 0,
                translateY: 60,
                scale: 0.9
            });
            break;
    }
}

// Experience animation functions
function animateExperienceTitle(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.9, 1],
        duration: 1200,
        delay: delay,
        easing: 'easeOutElastic(1, .8)',
        complete: function() {
            // Add continuous glow effect
            anime({
                targets: element,
                textShadow: [
                    '0 0 20px rgba(76, 201, 240, 0.5)',
                    '0 0 30px rgba(76, 201, 240, 0.8)',
                    '0 0 20px rgba(76, 201, 240, 0.5)'
                ],
                duration: 3000,
                easing: 'easeInOutSine',
                loop: true
            });
        }
    });
}

function animateExperienceSlideUp(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [80, 0],
        duration: 1000,
        delay: delay,
        easing: 'easeOutCubic'
    });
}

function animateExperienceCounter(element, delay = 0) {
    const target = parseInt(element.getAttribute('data-target'));
    const numberElement = element.querySelector('.stat-number');
    
    anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: delay,
        easing: 'easeOutBack(1.7)',
        complete: function() {
            // Counter animation with easing
            anime({
                targets: { count: 0 },
                count: target,
                duration: 2500,
                easing: 'easeOutExpo',
                update: function(anim) {
                    numberElement.textContent = Math.round(anim.animatables[0].target.count);
                },
                complete: function() {
                    // Add subtle pulse effect after counter finishes
                    anime({
                        targets: numberElement,
                        scale: [1, 1.05, 1],
                        duration: 500,
                        easing: 'easeInOutSine'
                    });
                }
            });
        }
    });
}

function animateCareerIcon(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [-180, 0],
        duration: 800,
        delay: delay,
        easing: 'easeOutBack(1.7)',
        complete: function() {
            // Add floating animation
            anime({
                targets: element,
                translateY: [0, -8, 0],
                duration: 3000 + (delay * 2),
                easing: 'easeInOutSine',
                loop: true
            });
        }
    });
}

function animateExperienceCard(element, delay = 0) {
    const card = element.querySelector('.experience-card-premium');
    const achievements = element.querySelectorAll('.achievement-item');
    const techTags = element.querySelectorAll('.tech-tag');
    
    // Main card animation
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [100, 0],
        scale: [0.95, 1],
        duration: 1000,
        delay: delay,
        easing: 'easeOutCubic',
        complete: function() {
            // Stagger animate achievements
            if (achievements.length > 0) {
                anime({
                    targets: achievements,
                    opacity: [0, 1],
                    translateX: [-30, 0],
                    duration: 600,
                    delay: anime.stagger(150, {start: 200}),
                    easing: 'easeOutElastic(1, .8)'
                });
            }
            
            // Stagger animate tech tags
            if (techTags.length > 0) {
                anime({
                    targets: techTags,
                    opacity: [0, 1],
                    scale: [0.8, 1],
                    translateY: [20, 0],
                    duration: 500,
                    delay: anime.stagger(100, {start: 800}),
                    easing: 'easeOutBack(1.7)'
                });
            }
        }
    });
}

function animateAchievement(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 700,
        delay: delay,
        easing: 'easeOutElastic(1, .8)'
    });
}

function animateExperienceSummary(element, delay = 0) {
    anime({
        targets: element,
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1],
        duration: 1000,
        delay: delay,
        easing: 'easeOutBack(1.7)'
    });
}

// Continuous animations for experience section
function initExperienceContinuousAnimations() {
    // Animate timeline spine glow
    const spineGlow = document.querySelector('.spine-glow');
    if (spineGlow) {
        anime({
            targets: spineGlow,
            opacity: [0.3, 0.8, 0.3],
            duration: 4000,
            easing: 'easeInOutSine',
            loop: true
        });
    }
    
    // Animate career path line
    const pathLine = document.querySelector('.path-line');
    if (pathLine) {
        anime({
            targets: pathLine,
            opacity: [0.5, 1, 0.5],
            duration: 3000,
            easing: 'easeInOutSine',
            loop: true
        });
    }
    
    // Animate current position pulse
    const currentDot = document.querySelector('.timeline-dot.current .dot-pulse');
    if (currentDot) {
        anime({
            targets: currentDot,
            scale: [1, 1.5],
            opacity: [1, 0],
            duration: 2000,
            easing: 'easeOutCubic',
            loop: true
        });
    }
    
    // Animate current badge pulse
    const currentBadge = document.querySelector('.date-badge.current-badge');
    if (currentBadge) {
        anime({
            targets: currentBadge,
            boxShadow: [
                '0 0 10px rgba(0, 255, 136, 0.3)',
                '0 0 20px rgba(0, 255, 136, 0.6)',
                '0 0 10px rgba(0, 255, 136, 0.3)'
            ],
            duration: 2000,
            easing: 'easeInOutSine',
            loop: true
        });
    }
}

// Enhanced hover animations for experience cards
document.addEventListener('DOMContentLoaded', function() {
    // Experience card hover animations
    const experienceCards = document.querySelectorAll('.experience-card-premium');
    
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const logo = card.querySelector('.company-logo-premium');
            const achievements = card.querySelectorAll('.achievement-icon i');
            const techTags = card.querySelectorAll('.tech-tag');
            
            if (typeof anime !== 'undefined') {
                // Logo spotlight animation
                anime({
                    targets: logo,
                    scale: [1, 1.05, 1],
                    duration: 600,
                    easing: 'easeInOutSine'
                });
                
                // Achievement icons bounce
                if (achievements.length > 0) {
                    anime({
                        targets: achievements,
                        scale: [1, 1.2, 1],
                        duration: 400,
                        delay: anime.stagger(50),
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
                
                // Tech tags wave animation
                if (techTags.length > 0) {
                    anime({
                        targets: techTags,
                        translateY: [0, -5, 0],
                        duration: 600,
                        delay: anime.stagger(50),
                        easing: 'easeInOutSine'
                    });
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const achievements = card.querySelectorAll('.achievement-icon i');
            
            if (typeof anime !== 'undefined' && achievements.length > 0) {
                anime({
                    targets: achievements,
                    scale: [1.2, 1],
                    duration: 300,
                    easing: 'easeInCubic'
                });
            }
        });
    });

    // Stats hover animations
    const statItems = document.querySelectorAll('.experience-stats .stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const number = item.querySelector('.stat-number');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: number,
                    scale: [1, 1.15, 1],
                    duration: 500,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    });
    
    // Career icons hover animation
    const careerIcons = document.querySelectorAll('.career-icon');
    
    careerIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const iconElement = icon.querySelector('i');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: iconElement,
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, 0],
                    duration: 600,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    });
}); 