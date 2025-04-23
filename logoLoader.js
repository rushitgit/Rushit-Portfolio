// Logo Loader for Company Images
document.addEventListener('DOMContentLoaded', function() {
    // List of company logos to be loaded with fallback paths
    const logos = [
        {
            id: 'deriv-logo',
            path: './assets/images/logos/deriv-logo.png',
            fallbackPath: './assets/images/logos/deriv-logo1.jpg', // Use jpg as secondary option
            alt: 'Deriv'
        },
        {
            id: 'jetsynthesys-logo',
            path: './assets/images/logos/jetsynthesys-logo.png',
            fallbackPath: './assets/images/logos/placeholder.png',
            alt: 'Jetsynthesys'
        },
        {
            id: 'xpert-logo',
            path: './assets/images/logos/bits-logo.png', // Using bits-logo.png for xPERT
            fallbackPath: './assets/images/logos/placeholder.png',
            alt: 'xPERT BPDC'
        },
        {
            id: 'cybage-logo',
            path: './assets/images/logos/cybage-logo.png',
            fallbackPath: './assets/images/logos/placeholder.png',
            alt: 'Cybage'
        },
        {
            id: 'forcemotors-logo',
            path: './assets/images/logos/force-logo.png', // Using force-logo.png
            fallbackPath: './assets/images/logos/placeholder.png',
            alt: 'Force Motors'
        }
    ];

    // Function to load the company logo with fallback
    function loadLogo(logoConfig) {
        const logoElement = document.getElementById(logoConfig.id);
        if (!logoElement) {
            console.warn(`Logo element with ID ${logoConfig.id} not found.`);
            return;
        }

        // Create image object to test local path
        const localImage = new Image();
        localImage.onload = function() {
            // If local image loads successfully, use it
            logoElement.src = logoConfig.path;
            logoElement.alt = logoConfig.alt;
            logoElement.classList.add('loaded');
        };
        
        localImage.onerror = function() {
            // If primary image fails, try fallback
            const fallbackImage = new Image();
            fallbackImage.onload = function() {
                logoElement.src = logoConfig.fallbackPath;
                logoElement.alt = logoConfig.alt;
                logoElement.classList.add('loaded');
            };
            
            fallbackImage.onerror = function() {
                // If both paths fail, use the parent's data-initials
                logoElement.style.display = 'none';
                console.warn(`Could not load logo for ${logoConfig.alt}, fallback to initials.`);
            };
            
            fallbackImage.src = logoConfig.fallbackPath;
        };
        
        localImage.src = logoConfig.path;
    }

    // Function to create directory structure if needed
    function ensureDirectoriesExist() {
        // This would typically be a server-side operation
        // For client-side JavaScript, we'll just log
        console.log('Directory structure check would happen server-side');
        
        // Output a guide for the user on how to save company logos
        console.log(`
        LOGO PREPARATION GUIDE:
        
        1. Create a folder: assets/images/logos
        2. Current logo files used:
           - deriv-logo.png or deriv-logo1.jpg
           - jetsynthesys-logo.png
           - bits-logo.png
           - cybage-logo.png
           - force-logo.png
        3. Make all logos square or circular in shape
        4. Ensure each logo has a transparent background
        5. Standardize size to approximately 200x200 pixels
        `);
    }
    
    // Initialize logo loading
    function initLogoLoader() {
        ensureDirectoriesExist();
        
        // Load each logo
        logos.forEach(loadLogo);
    }

    // Start the loading process
    initLogoLoader();
}); 