document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('hero');
    
    if (heroSection) {
        // Création de l'élément canvas pour les particules
        const canvas = document.createElement('canvas');
        canvas.classList.add('particles-canvas');
        heroSection.appendChild(canvas);
        
        // Configuration des particules
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 50;
        const colors = ['#5D859B', '#FFCD3D', '#E74C3C', '#2C3E50'];
        
        // Fonction de redimensionnement du canvas
        function resizeCanvas() {
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;
            createParticles();
        }
        
        // Création des particules
        function createParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 4 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: {
                        x: (Math.random() - 0.5) * 1.5,
                        y: (Math.random() - 0.5) * 1.5
                    },
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }
        
        // Animation des particules
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Mise à jour de la position
                particle.x += particle.speed.x;
                particle.y += particle.speed.y;
                
                // Rebondissement sur les bords
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speed.x = -particle.speed.x;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speed.y = -particle.speed.y;
                }
                
                // Dessin de la particule
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.closePath();
            });
            
            // Connection entre les particules proches
            connectParticles();
            
            requestAnimationFrame(animateParticles);
        }
        
        // Connexion des particules proches
        function connectParticles() {
            const maxDistance = 150;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    
                    const distance = Math.sqrt(
                        Math.pow(p1.x - p2.x, 2) + 
                        Math.pow(p1.y - p2.y, 2)
                    );
                    
                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = p1.color;
                        ctx.globalAlpha = 0.2 * (1 - distance / maxDistance);
                        ctx.lineWidth = 1;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
        
        // Gestion du redimensionnement de la fenêtre
        window.addEventListener('resize', resizeCanvas);
        
        // Initialisation
        resizeCanvas();
        animateParticles();
    }
});