// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark/Light mode toggle (for future implementation)
const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    // Add theme preference to localStorage
};

// Mobile menu toggle (for future implementation)
const toggleMenu = () => {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
};

// Animation on scroll (can be enhanced with libraries like AOS)
const animateOnScroll = () => {
    // Implementation for scroll animations
};