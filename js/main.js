// js/main.js

// Nouvelle version améliorée de la fonction d'animation
function animateShowcaseElements() {
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        if (isElementInViewport(item)) {
            // Activer l'item principal
            item.classList.add('visible');
            
            // Animer chaque type d'élément séparément avec des délais différents
            const elements = {
                category: item.querySelector('.showcase-category'),
                title: item.querySelector('.showcase-title'),
                description: item.querySelector('.showcase-description'),
                specs: item.querySelector('.specs'),
                image: item.querySelector('.showcase-image img')
            };
            
            // Animation séquentielle avec délais progressifs
            if (elements.category) {
                setTimeout(() => elements.category.classList.add('visible'), 100);
            }
            
            if (elements.title) {
                setTimeout(() => elements.title.classList.add('visible'), 200);
            }
            
            if (elements.description) {
                setTimeout(() => elements.description.classList.add('visible'), 300);
            }
            
            if (elements.specs) {
                setTimeout(() => elements.specs.classList.add('visible'), 400);
            }
            
            if (elements.image) {
                setTimeout(() => elements.image.classList.add('visible'), 100);
            }
        }
    });
}

// [Le reste du JavaScript reste inchangé]
function openModal(id) {
    document.getElementById(id).classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
    document.body.style.overflow = "auto";
}

let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const header = document.querySelector(".main-header");

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

function handleScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('visible');
        }
    });
    animateShowcaseElements();
}

function handleScroll() {
    if (window.scrollY < 50 || window.scrollY < lastScrollY) {
        navbar.classList.remove("hidden");
    } else {
        navbar.classList.add("hidden");
    }
    
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }
    
    updateScrollIndicator();
    handleScrollAnimation();
    lastScrollY = window.scrollY;
}

function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator::after');
    if (scrollIndicator) {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.height = `${scrollPercentage}%`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    navbar.classList.remove("hidden");
    
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.log("La lecture automatique de la vidéo a été empêchée:", error);
            const playButton = document.createElement('button');
            playButton.textContent = "Lecture";
            playButton.className = "video-play-button";
            playButton.addEventListener('click', () => heroVideo.play());
            document.querySelector('.video-container').appendChild(playButton);
        });
    }
    
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        modal.addEventListener("click", function(event) {
            if (event.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    const languageOptions = document.querySelectorAll(".language-option");
    languageOptions.forEach(option => {
        option.addEventListener("click", function() {
            languageOptions.forEach(opt => {
                opt.classList.remove("selected");
                opt.classList.remove("current");
            });
            this.classList.add("selected");
        });
    });
    
    handleScrollAnimation();
    animateShowcaseElements();
});

window.addEventListener("scroll", handleScroll);