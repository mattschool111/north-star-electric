document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !mainNav.contains(e.target)) {
            mainNav.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Carousel Functionality
    const carousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.carousel-slide'),
        prevButton: document.querySelector('.carousel-button.prev'),
        nextButton: document.querySelector('.carousel-button.next'),
        dotsContainer: document.querySelector('.carousel-dots'),

        init() {
            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.showSlide(index));
                this.dotsContainer.appendChild(dot);
            });

            // Add event listeners
            this.prevButton.addEventListener('click', () => this.prevSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());

            // Start auto-play
            this.startAutoPlay();
        },

        showSlide(index) {
            // Remove active class from all slides and dots
            this.slides.forEach(slide => slide.classList.remove('active'));
            document.querySelectorAll('.carousel-dot').forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            this.slides[index].classList.add('active');
            this.dots[index].classList.add('active');
        },

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(this.currentSlide);
        },

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(this.currentSlide);
        },

        startAutoPlay() {
            this.interval = setInterval(() => this.nextSlide(), 5000);
        },

        stopAutoPlay() {
            clearInterval(this.interval);
        },

        setupEventListeners() {
            // Button clicks
            this.prevButton.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });

            this.nextButton.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });

            // Dot clicks
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.stopAutoPlay();
                    this.currentSlide = index;
                    this.showSlide(this.currentSlide);
                    this.startAutoPlay();
                });
            });

            // Pause on hover
            const carouselContainer = document.querySelector('.carousel-container');
            carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    };

    // Initialize carousel when DOM is loaded
    carousel.init();

    // Map Initialization
    const map = L.map('map').setView([42.4055, -82.1860], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for both locations
    const chathamMarker = L.marker([42.4055, -82.1860]).addTo(map);
    const windsorMarker = L.marker([42.3174, -83.0371]).addTo(map);

    // Add popups with location information
    chathamMarker.bindPopup(`
        <strong>Chatham Location</strong><br>
        123 Main Street<br>
        Chatham, ON N7M 5K1<br>
        Phone: (519) 555-0123
    `);

    windsorMarker.bindPopup(`
        <strong>Windsor Location</strong><br>
        456 Queen Street<br>
        Windsor, ON N9A 1A1<br>
        Phone: (519) 555-0456
    `);
}); 