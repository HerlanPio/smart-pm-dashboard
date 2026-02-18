// Basic interactivity: mobile nav toggle and a simulated contact handler.
// Replace contact handler with real email/API integration when ready.

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
});

// Simple client-side contact form handler (demo only)
function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Please complete all fields.');
    return;
  }

  // For production: send this data to your backend or use a service (Netlify Forms, Formspree, SendGrid).
  console.log('Contact form submitted:', { name, email, message });

  // Friendly UX after "send"
  alert('Thanks! Your message has been noted. I will reply within 48 hours.');
  event.target.reset();
}