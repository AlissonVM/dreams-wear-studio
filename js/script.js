let slideIndex = 1; // For carousel
let cart = []; // Array to store cart items

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

    // --- Carousel functionality ---
    showSlides(slideIndex);

    // --- Add to Cart functionality ---
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            const productName = e.target.dataset.name;
            const productPrice = parseFloat(e.target.dataset.price);
            const productImage = e.target.dataset.image;

            addItemToCart(productId, productName, productPrice, productImage);
        });
    });

    // --- Cart Modal functionality ---
    const cartModal = document.getElementById('cartModal');
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');

    openCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
        renderCart(); // Render cart items when modal opens
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (e) => {
        if (e.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // --- Basic Contact Form submission alert ---
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent actual form submission for prototype
            alert('Mensaje enviado. ¡Gracias por contactarnos! Te responderemos pronto.');
            contactForm.reset(); // Clear the form
        });
    }
});

// --- Carousel Functions ---
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

// Optional: Auto-slide (uncomment to enable)
// let autoSlideInterval = setInterval(() => {
//     plusSlides(1);
// }, 5000); // Change image every 5 seconds

// const carouselContainer = document.querySelector('.carousel-container');
// if (carouselContainer) {
//     carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
//     carouselContainer.addEventListener('mouseleave', () => {
//         autoSlideInterval = setInterval(() => {
//             plusSlides(1);
//         }, 5000);
//     });
// }


// --- Cart Functions ---
function addItemToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    updateCartCount();
    alert(`${name} ha sido añadido al carrito.`); // User feedback
}

function removeItemFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart(); // Re-render cart after removal
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let total = 0;

    cartItemsContainer.innerHTML = ''; // Clear previous items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        cartTotalElement.textContent = 'S/ 0.00';
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Cantidad: ${item.quantity}</p>
                <p class="item-price">S/ ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `S/ ${total.toFixed(2)}`;

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const idToRemove = e.target.closest('.remove-item').dataset.id;
            removeItemFromCart(idToRemove);
        });
    });
}
