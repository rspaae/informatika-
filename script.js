// Inisialisasi particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: "#6366f1" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#06b6d4",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// Slide Management
class Presentation {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideIndicators = document.getElementById('slideIndicators');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;

        this.init();
    }

    init() {
        // Update slide counters
        document.getElementById('current-slide').textContent = this.currentSlide + 1;
        document.getElementById('total-slides').textContent = this.totalSlides;

        // Create slide indicators
        this.createIndicators();

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Fullscreen functionality
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());

        this.updateNavigation();
    }

    createIndicators() {
        this.slideIndicators.innerHTML = '';
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `slide-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.slideIndicators.appendChild(indicator);
        });
    }

    goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;

        // Hide current slide
        this.slides[this.currentSlide].classList.remove('active');

        // Show new slide
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');

        this.updateNavigation();
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }

    updateNavigation() {
        // Update buttons
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;

        // Update indicators
        document.querySelectorAll('.slide-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Update slide counter
        document.getElementById('current-slide').textContent = this.currentSlide + 1;
    }

    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.previousSlide();
                break;
            case 'ArrowRight':
            case ' ':
                this.nextSlide();
                break;
            case 'Home':
                this.goToSlide(0);
                break;
            case 'End':
                this.goToSlide(this.totalSlides - 1);
                break;
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
}

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Presentation();
});

// Add interactive effects to code blocks
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'scale(1.02)';
            block.style.transition = 'transform 0.3s ease';
        });
        
        block.addEventListener('mouseleave', () => {
            block.style.transform = 'scale(1)';
        });
    });

    // Add animation to purpose cards
    const purposeCards = document.querySelectorAll('.purpose-card-large');
    purposeCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideIn 0.6s ease-out forwards';
    });
});