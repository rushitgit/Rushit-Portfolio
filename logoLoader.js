// Logo Loader for Company Images
document.addEventListener('DOMContentLoaded', function() {
    // List of company logos to be loaded with fallback paths
    const logos = [
        {
            id: 'deriv-logo',
            path: 'assets/images/logos/deriv-logo.png',
            fallbackPath: 'assets/images/logos/placeholder.png',
            alt: 'Deriv'
        },
        {
            id: 'jetsynthesys-logo',
            path: 'assets/images/logos/jetsynthesys-logo.png',
            fallbackPath: 'assets/images/logos/placeholder.png',
            alt: 'Jetsynthesys'
        },
        {
            id: 'xpert-logo',
            path: 'assets/images/logos/bits-logo.png',
            fallbackPath: 'assets/images/logos/placeholder.png',
            alt: 'xPERT BPDC'
        },
        {
            id: 'cybage-logo',
            path: 'assets/images/logos/cybage-logo.png',
            fallbackPath: 'assets/images/logos/placeholder.png',
            alt: 'Cybage'
        },
        {
            id: 'forcemotors-logo',
            path: 'assets/images/logos/force-logo.png',
            fallbackPath: 'assets/images/logos/placeholder.png',
            alt: 'Force Motors'
        }
    ];

    // Function to load the company logo with fallback
    function loadLogo(logoConfig) {
        const logoElement = document.getElementById(logoConfig.id);
        if (!logoElement) {
            // If the element doesn't exist yet, create it in the appropriate timeline item
            createLogoElement(logoConfig);
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
            // If local image fails, use placeholder
            logoElement.src = 'assets/images/logos/placeholder.png';
            logoElement.alt = logoConfig.alt;
            logoElement.classList.add('loaded');
            console.warn(`Could not load logo for ${logoConfig.alt}, using placeholder.`);
        };
        
        localImage.src = logoConfig.path;
    }

    // Function to create logo elements for timeline items if they don't exist
    function createLogoElement(logoConfig) {
        // Find timeline items by company name
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const companyName = item.querySelector('h4');
            if (!companyName) return;
            
            // Extract company name from the header
            const companyText = companyName.textContent.toLowerCase();
            const logoCompanyName = logoConfig.alt.toLowerCase();
            
            // Match company name to timeline item
            if (companyText.includes(logoCompanyName)) {
                // Check if there's already a logo container
                let logoContainer = item.querySelector('.company-logo-container');
                
                if (!logoContainer) {
                    logoContainer = document.createElement('div');
                    logoContainer.className = 'company-logo-container';
                    const content = item.querySelector('.timeline-content');
                    if (content) {
                        content.insertBefore(logoContainer, content.firstChild);
                    }
                }
                
                // Check if the logo already exists
                if (!logoContainer.querySelector('img')) {
                    const logoImg = document.createElement('img');
                    logoImg.id = logoConfig.id;
                    logoImg.className = 'company-logo';
                    logoImg.alt = logoConfig.alt;
                    logoContainer.appendChild(logoImg);
                    
                    // Now load the logo
                    loadLogo(logoConfig);
                }
            }
        });
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
        2. Save your company logos with these standardized names:
           - deriv-logo.png
           - jetsynthesys-logo.png
           - xpert-logo.png
           - cybage-logo.png
           - forcemotors-logo.png
        3. Make all logos square or circular in shape
        4. Ensure each logo has a transparent background
        5. Standardize size to approximately 200x200 pixels
        `);
    }
    
    // Standardize logo sizes via CSS
    function addLogoStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .company-logo-container {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 15px;
            }
            
            .company-logo {
                width: 64px;
                height: 64px;
                object-fit: contain;
                border-radius: 50%;
                background-color: white;
                padding: 8px;
                box-shadow: 0 0 10px rgba(76, 201, 240, 0.3);
                opacity: 0;
                transition: all 0.5s ease;
            }
            
            .company-logo.loaded {
                opacity: 1;
            }
            
            .company-logo:hover {
                transform: scale(1.1);
                box-shadow: 0 0 15px rgba(76, 201, 240, 0.6);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize logo loading
    function initLogoLoader() {
        ensureDirectoriesExist();
        addLogoStyles();
        
        // Load each logo
        logos.forEach(loadLogo);
    }

    // Start the loading process
    initLogoLoader();
}); 