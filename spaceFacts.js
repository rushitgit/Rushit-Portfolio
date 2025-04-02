// Lightweight Space Facts and LLM News
document.addEventListener('DOMContentLoaded', () => {
    const spaceFacts = [
        "The universe is estimated to be about 13.8 billion years old.",
        "The largest known star, UY Scuti, is approximately 1,700 times larger than our Sun.",
        "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
        "There are more stars in the universe than grains of sand on all the beaches on Earth.",
        "A day on Venus is longer than a year on Venus. Venus takes 243 Earth days to rotate once on its axis and 225 Earth days to orbit the Sun.",
        "The Milky Way galaxy is estimated to contain 100-400 billion stars.",
        "The Great Red Spot on Jupiter is a storm that has been raging for at least 400 years.",
        "Saturn's rings are mostly made of ice and rock, and some pieces are as small as a grain of sand while others are as large as mountains.",
        "If you could fly a plane to Pluto, it would take more than 800 years.",
        "There are more trees on Earth than stars in the Milky Way.",
        "The hottest planet in our solar system is Venus, not Mercury (despite Mercury being closer to the Sun).",
        "The human race could fit inside a sugar cube if all empty space in our atoms were removed.",
        "Neutron stars are so dense that a teaspoon of neutron star material would weigh about a billion tons."
    ];

    const llmNews = [
        {
            title: "OpenAI Unveils GPT-5",
            summary: "The latest model shows breakthrough performance in reasoning and understanding context.",
            date: "March 10, 2024"
        },
        {
            title: "Anthropic's Claude 3 Challenges GPT-4",
            summary: "Claude 3 comes in three versions—Haiku, Sonnet, and Opus—each for different use cases.",
            date: "March 4, 2024"
        },
        {
            title: "Google's Gemini Ultra for Enterprise",
            summary: "Google expands access to its most powerful model for specialized industries.",
            date: "February 15, 2024"
        },
        {
            title: "Meta's Open Source LLM",
            summary: "Meta's open-source model outperforms closed-source alternatives with less computing power.",
            date: "January 17, 2024"
        }
    ];

    // Cached DOM elements to prevent repeated queries
    let factElement = null;
    let newFactButton = null;
    let newsContainer = null;
    let factsModule = null;
    
    // Draggable functionality variables
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    // Throttle variables
    let isUpdating = false;
    let updateTimeout = null;
    
    function getRandomSpaceFact() {
        const randomIndex = Math.floor(Math.random() * spaceFacts.length);
        return spaceFacts[randomIndex];
    }

    function updateSpaceFact() {
        if (!factElement || isUpdating) return;
        
        // Set updating flag to prevent rapid clicks
        isUpdating = true;
        
        // Fade out
        factElement.style.opacity = 0;
        
        // Clear any existing timeout
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        
        // Update text and fade in after a short delay
        updateTimeout = setTimeout(() => {
            factElement.textContent = getRandomSpaceFact();
            factElement.style.opacity = 1;
            isUpdating = false;
        }, 300);
    }

    function populateLLMNews() {
        if (!newsContainer) return;
        
        // Clear container
        newsContainer.innerHTML = '';
        
        // Add news items only if visible in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadNews();
                observer.disconnect();
            }
        });
        
        observer.observe(newsContainer);
    }
    
    function loadNews() {
        // Use document fragment for better performance
        const fragment = document.createDocumentFragment();
        
        // Add news items
        llmNews.forEach((news, index) => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            newsItem.innerHTML = `
                <h4>${news.title}</h4>
                <p>${news.summary}</p>
                <span class="news-date">${news.date}</span>
            `;
            
            fragment.appendChild(newsItem);
            
            // Staggered fade-in effect using CSS classes instead of inline styles
            setTimeout(() => {
                newsItem.classList.add('fade-in');
            }, 100 * index);
        });
        
        // Add all items at once
        newsContainer.appendChild(fragment);
    }
    
    // Make the facts module draggable
    function makeFactsModuleDraggable() {
        if (!factsModule) return;
        
        // Add draggable cursor style
        factsModule.style.cursor = 'grab';
        
        // Mouse down event starts drag
        factsModule.addEventListener('mousedown', (e) => {
            // Only enable dragging if clicking on the header or empty space (not on buttons)
            if (e.target.id === 'new-fact-button' || e.target.closest('#new-fact-button')) {
                return;
            }
            
            isDragging = true;
            factsModule.style.cursor = 'grabbing';
            
            // Calculate offset from mouse position to element corner
            const rect = factsModule.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            
            // Prevent default behavior and text selection
            e.preventDefault();
        });
        
        // Mouse move event updates position
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            // Calculate new position
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            
            // Set position with boundary checks to keep it visible
            const maxX = window.innerWidth - factsModule.offsetWidth;
            const maxY = window.innerHeight - factsModule.offsetHeight;
            
            factsModule.style.left = `${Math.max(10, Math.min(maxX - 10, x))}px`;
            factsModule.style.bottom = 'auto';
            factsModule.style.top = `${Math.max(10, Math.min(maxY - 10, y))}px`;
            factsModule.style.right = 'auto';
        });
        
        // Mouse up event ends drag
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                factsModule.style.cursor = 'grab';
            }
        });
        
        // Add a subtle animation when dragging starts
        factsModule.addEventListener('mousedown', () => {
            if (!isDragging) {
                factsModule.style.boxShadow = '0 0 25px rgba(76, 201, 240, 0.5)';
            }
        });
        
        // Reset animation when dragging ends
        document.addEventListener('mouseup', () => {
            factsModule.style.boxShadow = '0 0 20px rgba(76, 201, 240, 0.3)';
        });
    }

    // Initialize 
    function init() {
        // Cache DOM elements
        factElement = document.getElementById('space-fact-text');
        newFactButton = document.getElementById('new-fact-button');
        newsContainer = document.getElementById('llm-news-container');
        factsModule = document.querySelector('.space-facts-module');
        
        // Only run if we have the required elements
        if (factElement) {
            // Initialize with a random space fact
            factElement.textContent = getRandomSpaceFact();
            
            // Update space fact every 30 seconds (reduced from 20 for performance)
            setInterval(updateSpaceFact, 30000);
            
            // Set up button to get a new fact
            if (newFactButton) {
                newFactButton.addEventListener('click', updateSpaceFact);
            }
        }
        
        // Populate LLM news if container exists
        if (newsContainer) {
            populateLLMNews();
        }
        
        // Make facts module draggable
        if (factsModule) {
            makeFactsModuleDraggable();
        }
    }
    
    // Start everything
    init();
}); 