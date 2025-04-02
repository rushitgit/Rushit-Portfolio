// Optimized Starfield Animation with Interactive Text Masking Effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Stars array
    const stars = [];
    const starCount = 400; // Reduced star count for better performance
    
    // Star properties for variation
    const starColors = ['#ffffff', '#eeeeee', '#cccccc', '#8fa5ff', '#a1d4ff'];
    
    // Text to mask with stars
    let textMask = null;
    let nameText = "Rushit Palesha";
    
    // Interactive elements
    let mouseX = 0;
    let mouseY = 0;
    let textMaskOffset = { x: 0, y: 0 };
    let isInteracting = false;
    let textRipples = [];
    
    // Network visualization (constellation effect)
    let showConnections = true;
    let mouseParticle = { x: 0, y: 0, size: 0, isActive: false };
    
    // Config for stars and effects
    const config = {
        speed: 0.15,
        density: 1,
        starSize: 1.2,
        maxTextOffset: 30,
        textRippleColor: 'rgba(76, 201, 240, 0.2)',
        textRippleDuration: 3000, // ms
        maxRipples: 5,
        connectionDistance: 150, // Maximum distance for connecting stars
        connectionOpacity: 0.15, // Opacity of connections
        maxConnections: 3, // Max connections per star for performance
        mouseConnectionDistance: 200 // Distance from mouse to create connections
    };
    
    // Resize canvas to full screen
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        // Recreate text mask on resize
        createTextMask();
    }
    
    // Create stars
    function createStars() {
        stars.length = 0; // Clear existing stars
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * config.starSize + 0.1,
                speed: (Math.random() * config.speed) + 0.05,
                color: starColors[Math.floor(Math.random() * starColors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                inText: false // Flag to mark if star is within text
            });
        }
    }
    
    // Create text mask for "see-through" effect
    function createTextMask() {
        // Create off-screen canvas for the mask
        textMask = document.createElement('canvas');
        textMask.width = width;
        textMask.height = height;
        
        const maskCtx = textMask.getContext('2d');
        
        // Clear with transparent black
        maskCtx.clearRect(0, 0, width, height);
        
        // Set up text
        maskCtx.fillStyle = 'white';
        const fontSize = Math.min(width * 0.1, 120); // Responsive font size
        maskCtx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
        maskCtx.textAlign = 'center';
        maskCtx.textBaseline = 'middle';
        
        // Add text in center of the viewport with offset
        const textX = width / 2 + textMaskOffset.x;
        const textY = height / 2.5 + textMaskOffset.y;
        maskCtx.fillText(nameText, textX, textY);
        
        // Add ripple effects if any
        drawRipples(maskCtx);
    }
    
    // Add a ripple effect when clicked
    function addTextRipple(x, y) {
        if (textRipples.length >= config.maxRipples) {
            // Remove oldest ripple
            textRipples.shift();
        }
        
        textRipples.push({
            x: x,
            y: y,
            size: 10,
            maxSize: Math.min(width, height) * 0.4,
            opacity: 0.8,
            startTime: Date.now()
        });
    }
    
    // Draw ripple effects on the mask
    function drawRipples(maskCtx) {
        const currentTime = Date.now();
        
        textRipples = textRipples.filter(ripple => {
            const age = currentTime - ripple.startTime;
            if (age > config.textRippleDuration) return false;
            
            // Calculate ripple progress (0 to 1)
            const progress = age / config.textRippleDuration;
            
            // Update ripple properties based on progress
            const size = ripple.maxSize * progress;
            const opacity = ripple.opacity * (1 - progress);
            
            // Draw ripple
            maskCtx.beginPath();
            maskCtx.arc(ripple.x, ripple.y, size, 0, Math.PI * 2);
            maskCtx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            maskCtx.fill();
            
            // Keep the ripple
            return true;
        });
    }
    
    // Draw the starfield animation
    function drawStarfield() {
        // Clear canvas with dark background (true black)
        ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        ctx.fillRect(0, 0, width, height);
        
        // Get mask data if available
        let maskData = null;
        if (textMask) {
            const maskCtx = textMask.getContext('2d');
            maskData = maskCtx.getImageData(0, 0, width, height).data;
        }
        
        // Update star inText status first
        updateStarsTextStatus(maskData);
        
        // Draw connections between stars (constellation effect)
        if (showConnections) {
            drawConnections();
        }
        
        // Draw and update stars
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            // Move star
            star.x += star.speed;
            if (star.x > width) {
                star.x = 0;
                star.y = Math.random() * height;
                // Reset inText flag when repositioned
                star.inText = false;
            }
            
            // Draw star
            ctx.beginPath();
            
            // Different style based on whether it's in text
            if (star.inText) {
                // Larger, brighter stars within text
                ctx.fillStyle = '#ffffff';
                const sizeMod = isInteracting ? 2 : 1.5;
                star.size *= sizeMod; // Bigger in text when interacting
                ctx.globalAlpha = 1; // Full opacity for text stars
                
                // Add glow effect for text stars when interacting
                if (isInteracting) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(76, 201, 240, 0.8)';
                }
            } else {
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.opacity;
            }
            
            // Draw the star
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Reset shadow
            ctx.shadowBlur = 0;
            
            // Reset size if it was modified
            if (star.inText) {
                const sizeMod = isInteracting ? 2 : 1.5;
                star.size /= sizeMod;
            }
        }
        
        // Draw mouse particle if active
        if (mouseParticle.isActive) {
            drawMouseParticle();
        }
        
        // Reset global alpha
        ctx.globalAlpha = 1;
        
        // Request next frame
        requestAnimationFrame(drawStarfield);
    }
    
    // Update which stars are within the text area
    function updateStarsTextStatus(maskData) {
        if (!maskData) return;
        
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            // Check if star is in text mask area
            const dataIndex = ((Math.floor(star.y) * width) + Math.floor(star.x)) * 4;
            star.inText = maskData[dataIndex] > 0; // Check if white (part of text)
        }
    }
    
    // Draw connections between nearby stars (constellation effect)
    function drawConnections() {
        // Draw connections only between stars that are close enough
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            let connectionCount = 0;
            
            // Limit connections per star for performance
            if (connectionCount >= config.maxConnections) continue;
            
            for (let j = i + 1; j < stars.length; j++) {
                if (connectionCount >= config.maxConnections) break;
                
                const otherStar = stars[j];
                
                // Calculate distance between stars
                const dx = star.x - otherStar.x;
                const dy = star.y - otherStar.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect stars if they're close enough
                if (distance < config.connectionDistance) {
                    connectionCount++;
                    
                    // Calculate opacity based on distance
                    const opacity = (1 - distance / config.connectionDistance) * config.connectionOpacity;
                    
                    // Enhance connections if either star is in text
                    const connectionColor = (star.inText || otherStar.inText) 
                        ? `rgba(76, 201, 240, ${opacity * 2})`
                        : `rgba(255, 255, 255, ${opacity})`;
                    
                    // Draw connection
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(otherStar.x, otherStar.y);
                    ctx.strokeStyle = connectionColor;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            
            // Connect to mouse particle if it's active and close enough
            if (mouseParticle.isActive) {
                const dx = star.x - mouseParticle.x;
                const dy = star.y - mouseParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.mouseConnectionDistance) {
                    // Calculate opacity based on distance
                    const opacity = (1 - distance / config.mouseConnectionDistance) * 0.3;
                    
                    // Enhanced connection if star is in text
                    const connectionColor = star.inText 
                        ? `rgba(76, 201, 240, ${opacity * 2})` 
                        : `rgba(255, 255, 255, ${opacity})`;
                    
                    // Draw connection
                    ctx.beginPath();
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(mouseParticle.x, mouseParticle.y);
                    ctx.strokeStyle = connectionColor;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Draw the mouse particle
    function drawMouseParticle() {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(76, 201, 240, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(76, 201, 240, 0.5)';
        ctx.arc(mouseParticle.x, mouseParticle.y, mouseParticle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Handle mouse movement for interactive effects
    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update mouse particle position
        mouseParticle.x = mouseX;
        mouseParticle.y = mouseY;
        
        // Calculate offset from center
        const centerX = width / 2;
        const centerY = height / 2.5;
        
        // Calculate distance from center
        const distX = (mouseX - centerX) / centerX; // -1 to 1
        const distY = (mouseY - centerY) / centerY; // -1 to 1
        
        // Apply offset with dampening
        textMaskOffset.x = distX * config.maxTextOffset;
        textMaskOffset.y = distY * config.maxTextOffset;
        
        // Regenerate mask with new offset
        createTextMask();
    }
    
    // Handle canvas click for ripple effect
    function handleCanvasClick(e) {
        addTextRipple(e.clientX, e.clientY);
        createTextMask();
        
        // Pulse the mouse particle
        mouseParticle.size = 5;
        setTimeout(() => {
            mouseParticle.size = 2;
        }, 300);
    }
    
    // Initialize
    function init() {
        resizeCanvas();
        createStars();
        
        // Initialize mouse particle
        mouseParticle.size = 2;
        mouseParticle.isActive = true;
        
        // Start the animation
        drawStarfield();
        
        // Add event listeners for interactive effects
        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('click', handleCanvasClick);
        
        // Add listeners for interaction state
        canvas.addEventListener('mouseenter', () => { 
            isInteracting = true;
            mouseParticle.isActive = true;
        });
        
        canvas.addEventListener('mouseleave', () => { 
            isInteracting = false;
            mouseParticle.isActive = false;
            textMaskOffset = { x: 0, y: 0 };
            createTextMask();
        });
        
        // Add keyboard shortcut to toggle connections (press 'c')
        document.addEventListener('keydown', (e) => {
            if (e.key === 'c') {
                showConnections = !showConnections;
            }
        });
        
        // Add extra interaction with journey section
        const journeySection = document.getElementById('journey');
        if (journeySection) {
            // Add special interaction when journey section is visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Enhance star effects in journey section
                    config.connectionDistance *= 1.5; // Increase connection distance
                    config.connectionOpacity = 0.25;  // Make connections more visible
                    
                    // Return to normal when leaving section
                    setTimeout(() => {
                        config.connectionDistance /= 1.5;
                        config.connectionOpacity = 0.15;
                    }, 1000);
                }
            }, { threshold: 0.3 });
            
            observer.observe(journeySection);
        }
    }
    
    // Handle resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        createStars();
    });
    
    // Add a custom animation to draw attention to the text initially
    setTimeout(() => {
        const centerX = width / 2;
        const centerY = height / 2.5;
        addTextRipple(centerX, centerY);
        createTextMask();
    }, 1000);
    
    // Start animation
    init();
}); 