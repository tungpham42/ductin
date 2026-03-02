document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Kinetic Scroll Animations
    const kineticElements = document.querySelectorAll('.kinetic-up');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };

    const kineticObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    kineticElements.forEach(el => kineticObserver.observe(el));

    // 2. Number Counter Animation (Kinetic Stats)
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    updateCounter();
                });
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-grid');
    if(statsSection) statsObserver.observe(statsSection);

    // 3. Header Shrink on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });
});

    //4. Projects Click Slide
    const track = document.querySelector('.projects-track');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
const cards = document.querySelectorAll('.projects-track .project-card');
const totalSlides = Math.ceil(cards.length / 2);

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    if (index >= totalSlides) index = 0;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) index = totalSlides - 1;
    updateSlider();
});