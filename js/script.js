let slideIndex = 1;

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            alert('Producto añadido al carrito. (Funcionalidad completa en desarrollo)');
        });
    });

    // Basic form submission alert
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission for prototype
            alert('Mensaje enviado. ¡Gracias por contactarnos!');
            contactForm.reset(); // Clear the form
        });
    }

    // Initialize the carousel
    showSlides(slideIndex);
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Optional: Auto-slide
// let autoSlideInterval = setInterval(() => {
//     plusSlides(1);
// }, 5000); // Change image every 5 seconds

// // Pause auto-slide on hover (optional)
// const carouselContainer = document.querySelector('.carousel-container');
// carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
// carouselContainer.addEventListener('mouseleave', () => {
//     autoSlideInterval = setInterval(() => {
//         plusSlides(1);
//     }, 5000);
// });
