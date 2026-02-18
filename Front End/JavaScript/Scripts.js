// Contact form validation and submission (demo only, does not actually send emails)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var status = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.style.color = 'red';
    return;
  }
  if (!validateEmail(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.style.color = 'red';
    return;
  }
  status.textContent = 'Thank you for your message! I will get back to you soon.';
  status.style.color = 'green';
  this.reset();
});

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    var targetId = this.getAttribute('href').slice(1);
    var target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 50, behavior: 'smooth' });
    }
  });
});