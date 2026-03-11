document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       1. SMART HEADER SCROLL
       Adds a shadow and shrinks the padding when 
       the user scrolls down.
    ========================================== */
    const header = document.getElementById('main-header');
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       2. KINETIC SCROLL ANIMATIONS
       Uses IntersectionObserver to detect when an 
       element enters the viewport, then adds the 
       'in-view' class to trigger the CSS animation.
    ========================================== */
    const observerOptions = {
        root: null, // use the browser viewport
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('in-view');
                // Stop observing once animated so it doesn't repeat unnecessarily
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Find all elements with the kinetic-up class and observe them
    const animatedElements = document.querySelectorAll('.kinetic-up');
    animatedElements.forEach(el => scrollObserver.observe(el));


    /* ==========================================
       3. PROJECTS SLIDER LOGIC
       Calculates card widths dynamically so it 
       works perfectly on both mobile and desktop.
    ========================================== */
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const cards = document.querySelectorAll('.project-card');

    if (track && prevBtn && nextBtn && cards.length > 0) {
        let currentIndex = 0;

        const updateSliderPosition = () => {
            // Get the current width of a single card
            const cardWidth = cards[0].offsetWidth;
            // Get the gap between cards from the CSS (fallback to 40px)
            const gap = parseInt(window.getComputedStyle(track).gap) || 40;
            // Calculate how far to move the track
            const moveAmount = cardWidth + gap;

            track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
        };

        nextBtn.addEventListener('click', () => {
            // Calculate how many cards are visible on the screen right now
            const trackWidth = document.querySelector('.projects-viewport').offsetWidth;
            const cardWidth = cards[0].offsetWidth;
            const visibleCards = Math.floor(trackWidth / cardWidth);
            
            // Prevent sliding past the last card
            const maxIndex = cards.length - visibleCards;

            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        // Recalculate slider position if the user rotates their phone or resizes the window
        window.addEventListener('resize', () => {
            // Reset to beginning on resize to prevent awkward half-card views
            currentIndex = 0; 
            updateSliderPosition();
        });
    }

});


/* ==========================================
   ENGINEERING CALCULATOR LOGIC
   Calculates required motor power in kW
========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const btnCalculate = document.getElementById('btn-calculate');
    const resultBox = document.getElementById('calc-result');
    const outputKw = document.getElementById('output-kw');

    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => {
            // 1. Get input values
            const mass = parseFloat(document.getElementById('calc-load').value);
            const speed = parseFloat(document.getElementById('calc-speed').value);
            const inclineDegrees = parseFloat(document.getElementById('calc-incline').value);
            const friction = parseFloat(document.getElementById('calc-friction').value);

            // Validate inputs
            if (isNaN(mass) || isNaN(speed)) {
                alert("Vui lòng nhập đầy đủ Tổng Tải Trọng và Tốc Độ.");
                return;
            }

            // 2. Physics Constants
            const g = 9.81; // Gravity (m/s^2)
            const efficiency = 0.75; // Estimated drive efficiency (75%)
            const safetyFactor = 1.2; // 20% safety buffer for startup torque

            // Convert degrees to radians for JS Math functions
            const radians = inclineDegrees * (Math.PI / 180);

            // 3. Calculate Force (Newtons)
            // Force = Force of Friction + Force of Gravity (if inclined)
            const forceFriction = mass * g * Math.cos(radians) * friction;
            const forceGravity = mass * g * Math.sin(radians);
            const totalForce = forceFriction + forceGravity;

            // 4. Calculate Power (Kilowatts)
            // Power = (Force * Velocity) / (1000 * efficiency)
            let powerKW = (totalForce * speed) / (1000 * efficiency);
            
            // Apply safety factor
            powerKW = powerKW * safetyFactor;

            // 5. Display Result (rounded to 2 decimal places)
            outputKw.innerText = powerKW.toFixed(2);
            resultBox.style.display = 'block';
        });
    }
});

/* ==========================================
   TROUBLESHOOTING WIKI: INSTANT SEARCH
   Filters the symptom cards based on user input
========================================== */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('wiki-search');
    const wikiCards = document.querySelectorAll('.wiki-card');

    if (searchInput) {
        // Add a slight blue border glow when focused for better UX
        searchInput.addEventListener('focus', () => {
            searchInput.style.borderColor = '#0068ff';
        });
        searchInput.addEventListener('blur', () => {
            searchInput.style.borderColor = '#ddd';
        });

        // The actual filter logic
        searchInput.addEventListener('keyup', (e) => {
            // Get the user's search term and convert it to lowercase
            const term = e.target.value.toLowerCase();

            // Loop through all the cards on the page
            wikiCards.forEach(card => {
                // Grab all the text inside the card (symptom, cause, solution)
                const cardText = card.textContent.toLowerCase();

                // If the text contains the search term, show it. Otherwise, hide it.
                if (cardText.includes(term)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

