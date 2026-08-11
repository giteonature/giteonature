const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Stocke l'index de l'image actuellement affichée en grand
let currentIndex = 0;

// Fonction pour mettre à jour et afficher l'image de la lightbox
function showImage(index) {
  const targetItem = galleryItems[index];
  const img = targetItem.querySelector('img');
 
  if (img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    currentIndex = index;
  }
}

// Ouvrir la lightbox au clic sur un élément de la grille
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showImage(index);
    lightbox.style.display = 'flex';
  });
});

// Fonctions de navigation
function nextImage() {
  // Revient à 0 si on dépasse la dernière image (boucle)
  let nextIndex = (currentIndex + 1) % galleryItems.length;
  showImage(nextIndex);
}

function prevImage() {
  // Va à la dernière image si on recule sous l'index 0
  let prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  showImage(prevIndex);
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

// Événements de clic pour la navigation
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Évite de fermer la lightbox en cliquant sur le fond
  nextImage();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  prevImage();
});

// Événements de fermeture
lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Gestion de la navigation avec les touches du clavier
document.addEventListener('keydown', (e) => {
  if (lightbox.style.display === 'flex') {
    if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  }
});
