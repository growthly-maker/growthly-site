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
    
    // Reveal animations on scroll using Intersection Observer
    function setupIntersectionObserver() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, options);
        
        portfolioItems.forEach(item => {
            observer.observe(item);
        });
        
        // Also observe other elements that should animate on scroll
        const revealElements = document.querySelectorAll('.section-header, .portfolio-cta, .about-content, .testimonials-slider, .contact-content');
        revealElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Portfolio Section Functions
    function initPortfolio() {
        // Get portfolio elements
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!filterBtns.length || !portfolioItems.length) return;
        
        // Filter button click handler with improved animations
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Animation timing variables
                const animOutDuration = 300; // ms
                const staggerDelay = 50; // ms
                
                // Filter portfolio items with enhanced animations
                portfolioItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    const shouldShow = filterValue === 'all' || category === filterValue;
                    
                    // First hide all items with animation
                    item.style.transition = `all ${animOutDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
                    
                    if (shouldShow) {
                        // For items that should be shown
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(40px)';
                            
                            // Slight delay to ensure hide animation completes
                            setTimeout(() => {
                                item.style.display = '';
                                
                                // Stagger the reveal of each item
                                setTimeout(() => {
                                    item.style.opacity = '1';
                                    item.style.transform = 'translateY(0)';
                                }, staggerDelay * index);
                            }, animOutDuration);
                        }, 10); // Small delay to ensure batch processing
                    } else {
                        // For items that should be hidden
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(40px)';
                        
                        // Hide after animation completes
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, animOutDuration);
                    }
                });
            });
        });
        
        // Initially show all items with staggered animation
        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${0.1 + (index * 0.1)}s`;
        });
    }

    // Event Listeners
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('scroll', setActiveLink);
    menuToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Initialize
    toggleHeaderClass();
    setActiveLink();
    animateStats();
    initPortfolio();
    setupIntersectionObserver();

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