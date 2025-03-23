// js/main.js

// Fonctions pour gérer les modales
function openModal(id) {
    document.getElementById(id).classList.add("active");
    // Empêcher le défilement du body lorsque la modale est ouverte
    document.body.style.overflow = "hidden";
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
    // Réactiver le défilement du body
    document.body.style.overflow = "auto";
}

// Variables pour la gestion du scroll
let lastScrollY = window.scrollY;
const navbar = document.getElementById("navbar");
const header = document.querySelector(".main-header");

// Fonction pour gérer l'affichage de la navbar lors du défilement
function handleScroll() {
    // Pour la navbar
    if (window.scrollY < 50 || window.scrollY < lastScrollY) {
        // Si on est en haut ou on remonte => afficher la barre
        navbar.classList.remove("hidden");
    } else {
        // Si on descend => cacher la barre
        navbar.classList.add("hidden");
    }
    
    // Pour le header
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Défilement vers le bas
        header.style.transform = "translateY(-100%)";
    } else {
        // Défilement vers le haut
        header.style.transform = "translateY(0)";
    }
    
    // Mise à jour de la position de l'indicateur de défilement
    updateScrollIndicator();
    
    lastScrollY = window.scrollY;
}

// Fonction pour mettre à jour l'indicateur de défilement
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator::after');
    if (scrollIndicator) {
        const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.height = `${scrollPercentage}%`;
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    // Affichage initial de la navbar
    navbar.classList.remove("hidden");
    
    // S'assurer que la vidéo de l'héro joue automatiquement
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        heroVideo.play().catch(error => {
            console.log("La lecture automatique de la vidéo a été empêchée:", error);
            // Fallback: ajouter un bouton pour lire la vidéo manuellement
            const playButton = document.createElement('button');
            playButton.textContent = "Lecture";
            playButton.className = "video-play-button";
            playButton.addEventListener('click', () => heroVideo.play());
            document.querySelector('.video-container').appendChild(playButton);
        });
    }
    
    // Fermer les modales en cliquant à l'extérieur du contenu
    const modals = document.querySelectorAll(".modal");
    
    modals.forEach(modal => {
        modal.addEventListener("click", function(event) {
            // Si on clique sur la modale mais pas sur son contenu
            if (event.target === modal) {
                // Récupérer l'ID de la modale et la fermer
                closeModal(modal.id);
            }
        });
    });

    // Gestion du sélecteur de langue
    const languageOptions = document.querySelectorAll(".language-option");
    
    languageOptions.forEach(option => {
        option.addEventListener("click", function() {
            // Retirer la classe 'selected' de toutes les options
            languageOptions.forEach(opt => {
                opt.classList.remove("selected");
                opt.classList.remove("current");
            });
            // Ajouter la classe 'selected' à l'option cliquée
            this.classList.add("selected");
            
            // Ici, vous pourriez ajouter du code pour changer la langue du site
            // Par exemple : changeLanguage(this.textContent);
        });
    });
});

// Écouteur d'événement sur le scroll
window.addEventListener("scroll", handleScroll);