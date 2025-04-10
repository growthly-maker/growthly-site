document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const galleryMain = document.querySelector('.gallery-main img');
    const thumbs = document.querySelectorAll('.thumb');
    const processItems = document.querySelectorAll('.process-item');
    const resultItems = document.querySelectorAll('.result-item');
    const testimonialContent = document.querySelector('.testimonial-content');
    const ctaContent = document.querySelector('.cta-content');
    
    // Gallery Thumbnails Click Handler
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to current thumb
            this.classList.add('active');
            
            // Get image source from data attribute
            const imgSrc = this.getAttribute('data-src');
            
            // Update main image with animation
            if (galleryMain) {
                galleryMain.style.opacity = '0';
                galleryMain.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    galleryMain.src = imgSrc;
                    galleryMain.style.opacity = '1';
                    galleryMain.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // Initialize the gallery with the first thumbnail active
    if (thumbs.length > 0) {
        thumbs[0].classList.add('active');
    }
    
    // Reveal animations on scroll using Intersection Observer
    function setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, options);
        
        // Observe process items
        processItems.forEach(item => {
            observer.observe(item);
        });
        
        // Observe result items
        resultItems.forEach(item => {
            observer.observe(item);
        });
        
        // Observe testimonial content
        if (testimonialContent) {
            observer.observe(testimonialContent);
        }
        
        // Observe CTA content
        if (ctaContent) {
            observer.observe(ctaContent);
        }
    }
    
    // Initialize animations
    setupIntersectionObserver();
    
    // Animate statistics numbers
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number, .result-number');
        
        if (!statNumbers.length) return;
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            let value = 0;
            
            // Extraire la valeur numérique et le préfixe/suffixe
            const valueMatch = originalText.match(/([+\-]?)(\d+)(%?)/);
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
            
            // Set up Intersection Observer for each stat
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        window.requestAnimationFrame(step);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        });
    }
    
    // Initialize number animations
    animateNumbers();
});
