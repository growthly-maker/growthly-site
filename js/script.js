document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const sections = document.querySelectorAll('section[id]');
    const statNumbers = document.querySelectorAll('.stat-number');

    // Header scroll effect
    function toggleHeaderClass() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    // Close menu when link is clicked
    function closeMenu() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Set active menu item based on scroll position
    function setActiveLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for anchor links
    function smoothScroll(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                closeMenu();
            }
        }
    }

    // Reveal animations on scroll
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
        
        // Animation for portfolio items
        animatePortfolioItems();
    }
    
    // Animation pour les statistiques
    function animateStats() {
        if (!statNumbers.length) return;
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            let value = 0;
            
            // Extraire la valeur numérique et le préfixe/suffixe
            const valueMatch = originalText.match(/([+]?)(\d+)(%?)/);
            if (!valueMatch) return;
            
            const prefix = valueMatch[1] || '';
            const targetValue = parseInt(valueMatch[2]);
            const suffix = valueMatch[3] || '';
            
            let startTimestamp = null;
            const duration = 1500; // Durée de l'animation en ms
            
            function step(timestamp) {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const easedProgress = Math.pow(progress, 3); // Fonction d'ease-in-out
                
                value = Math.floor(targetValue * easedProgress);
                stat.textContent = `${prefix}${value}${suffix}`;
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    stat.textContent = originalText; // Assure que la valeur finale est exacte
                }
            }
            
            window.requestAnimationFrame(step);
        });
    }

    // Portfolio Section Functions
    function initPortfolio() {
        // Get portfolio elements
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        // Set animation order for staggered animations
        portfolioItems.forEach((item, index) => {
            item.style.setProperty('--animation-order', index);
            if (index < 6) { // Show first 6 items immediately
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            }
        });
        
        // Filter button click handler
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach((item, index) => {
                    item.classList.remove('show');
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.add('show');
                            }, index * 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300); // Wait for fade out animation to complete
                });
            });
        });
    }
    
    // Animate portfolio items when they come into view
    function animatePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const windowHeight = window.innerHeight;
        
        portfolioItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const itemVisible = 150;
            
            if (itemTop < windowHeight - itemVisible) {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            }
        });
    }

    // Event Listeners
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('scroll', revealOnScroll);
    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Initialize
    toggleHeaderClass();
    setActiveLink();
    animateStats();
    initPortfolio();

    // Add reveal class to elements that should animate on scroll
    document.querySelectorAll('.section-header, .services-grid, .portfolio-grid, .about-content, .testimonials-slider, .contact-content').forEach(element => {
        element.classList.add('reveal');
    });

    // Apply fade-in animation to hero section elements
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section .cta-buttons');
    heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Function to initialize services section
function initServices() {
    const servicesGrid = document.querySelector('.services-grid');
    
    if (servicesGrid) {
        // Services data will be implemented in a future iteration
    }
}

// Function to initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Testimonials slider will be implemented in a future iteration
    }
}