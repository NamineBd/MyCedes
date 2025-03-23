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

// Fermer les modales en cliquant à l'extérieur du contenu
document.addEventListener("DOMContentLoaded", function() {
    // Sélectionner toutes les modales
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
            languageOptions.forEach(opt => opt.classList.remove("selected"));
            // Ajouter la classe 'selected' à l'option cliquée
            this.classList.add("selected");
            
            // Ici, vous pourriez ajouter du code pour changer la langue du site
            // Par exemple : changeLanguage(this.textContent);
        });
    });
});

// Fonction pour masquer le header lors du défilement vers le bas
// et le montrer lors du défilement vers le haut
let lastScrollTop = 0;

window.addEventListener("scroll", function() {
    const header = document.querySelector(".main-header");
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Défilement vers le bas
        header.style.transform = "translateY(-100%)";
    } else {
        // Défilement vers le haut
        header.style.transform = "translateY(0)";
    }
    
    lastScrollTop = scrollTop;
});