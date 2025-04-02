// Generate a placeholder image for company logos with a circular design
function createPlaceholderImage() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 200;  // Larger size for better quality
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Create circular background with gradient
    ctx.beginPath();
    ctx.arc(100, 100, 95, 0, Math.PI * 2);
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createRadialGradient(100, 100, 10, 100, 100, 95);
    gradient.addColorStop(0, '#111111');
    gradient.addColorStop(0.7, '#0e0e0e');
    gradient.addColorStop(1, '#080808');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add circular border
    ctx.beginPath();
    ctx.arc(100, 100, 95, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(76, 201, 240, 0.6)';
    ctx.stroke();
    
    // Add text
    ctx.font = 'bold 40px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(76, 201, 240, 0.9)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LOGO', 100, 100);
    
    // Add subtle star particles
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * 200;
        const y = Math.random() * 200;
        const radius = Math.random() * 1 + 0.5;
        const dx = x - 100;
        const dy = y - 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only draw stars inside the circle
        if (distance < 90) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
            ctx.fill();
        }
    }
    
    // Return data URL
    return canvas.toDataURL('image/png');
}

// Print the data URL to console - you can copy this and save it as placeholder.png
console.log(createPlaceholderImage()); 