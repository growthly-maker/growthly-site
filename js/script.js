document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const sections = document.querySelectorAll('section[id]');
    const statNumbers = document.querySelectorAll('.stat-number');
    const scrollIndicator = document.querySelector('.scroll-indicator');

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
    }
    
    // Animate statistics
    function animateStats() {
        if (!statNumbers.length) return;
        
        statNumbers.forEach(stat => {
            const targetValue = parseFloat(stat.textContent);
            const duration = 2000; // 2 seconds
            
            // Remove the % or + signs for animation
            const isSuffix = stat.textContent.includes('%') ? '%' : '';
            const isPrefix = stat.textContent.includes('+') ? '+' : '';
            let currentValue = 0;
            
            const animateCountUp = (timestamp, startValue, endValue, startTime) => {
                if (!startTime) startTime = timestamp;
                
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
                stat.textContent = `${isPrefix}${currentValue}${isSuffix}`;
                
                if (progress < 1) {
                    requestAnimationFrame(time => animateCountUp(time, startValue, endValue, startTime));
                }
            };
            
            // Start the animation
            requestAnimationFrame(time => animateCountUp(time, 0, targetValue));
        });
    }
    
    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                window.scrollTo({
                    top: servicesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
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
    
    // Wait for page load then animate stats
    window.addEventListener('load', animateStats);

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
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxEffect = scrollPosition * 0.4;
            
            heroBackground.style.transform = `translateY(${parallaxEffect}px)`;
        });
    }
});

// Function to initialize services section
function initServices() {
    const servicesGrid = document.querySelector('.services-grid');
    
    if (servicesGrid) {
        // Services data will be implemented in a future iteration
    }
}

// Function to initialize portfolio section
function initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        // Portfolio data will be implemented in a future iteration
    }
}

// Function to initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Testimonials slider will be implemented in a future iteration
    }
}

// These functions will be called when specific sections are implemented
// For now, we're just setting up the structure