document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const sections = document.querySelectorAll('section[id]');
    const statNumbers = document.querySelectorAll('.stat-number');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const aosElements = document.querySelectorAll('[data-aos]');

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

    // Animation AOS (Animate On Scroll)
    function initAOS() {
        if (!aosElements.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target); // Désinscrire l'élément après animation
                }
            });
        }, observerOptions);
        
        aosElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Accordion functionality
    function initAccordion() {
        if (!accordionHeaders.length) return;
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                // Toggle class active sur le header
                this.classList.toggle('active');
                
                // Get next sibling (content)
                const content = this.nextElementSibling;
                
                // Toggle max-height
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = '0';
                }
                
                // Close other accordions (optional - for single open accordion)
                accordionHeaders.forEach(otherHeader => {
                    if (otherHeader !== this && otherHeader.classList.contains('active')) {
                        otherHeader.classList.remove('active');
                        otherHeader.nextElementSibling.style.maxHeight = '0';
                    }
                });
            });
        });
        
        // Open first accordion by default
        if (accordionHeaders.length > 0) {
            accordionHeaders[0].click();
        }
    }

    // PORTFOLIO SECTION - SIMPLIFIÉ ET GARANTI FONCTIONNEL
    function initPortfolio() {
        // Get portfolio elements
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!filterBtns.length || !portfolioItems.length) return;
        
        // Ajouter la classe show à tous les éléments au démarrage
        portfolioItems.forEach((item, index) => {
            // Délai échelonné pour les animations d'entrée
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
        
        // Gestionnaire de clic pour les boutons de filtre
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                // Récupérer la valeur du filtre
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrer les éléments
                portfolioItems.forEach(item => {
                    // D'abord cacher tous les éléments avec transition
                    item.classList.remove('show');
                    
                    // Après un délai pour la transition de disparition
                    setTimeout(() => {
                        // Si 'all' ou correspond à la catégorie, montrer l'élément
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            // Petit délai pour permettre au navigateur de traiter le changement display
                            setTimeout(() => {
                                item.classList.add('show');
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300); // Délai correspondant à la durée de la transition CSS
                });
            });
        });
    }

    // Function to initialize services section
    function initServices() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        if (!serviceCards.length) return;
        
        // Add hover effect for cards
        serviceCards.forEach((card, index) => {
            // Staggered animation on page load
            setTimeout(() => {
                card.classList.add('fade-in');
                card.style.opacity = '1';
            }, index * 100);
            
            // Add hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
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
    initAOS();
    initAccordion();
    initServices();

    // Apply fade-in animation to hero section elements
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section .cta-buttons');
    heroElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

// Function to initialize testimonials slider
function initTestimonialsSlider() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Testimonials slider will be implemented in a future iteration
    }
}