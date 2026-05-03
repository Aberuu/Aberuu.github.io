// script.js

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if(window.scrollY > 50){
    navbar.style.background = "rgba(0,0,0,0.85)";
  } else {
    navbar.style.background = "rgba(0,0,0,0.5)";
  }
});

// Contact Form - Send Email
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Show loading message
    statusMessage.textContent = 'Mengirim pesan...';
    statusMessage.style.color = 'rgba(255, 132, 0, 0.9)';

    // Send email using EmailJS
    emailjs.send('service_YOUR_SERVICE_ID', 'template_YOUR_TEMPLATE_ID', {
      from_name: name,
      from_email: email,
      message: message,
      to_email: 'abelagaphe@gmail.com'
    })
    .then(function(response){
      statusMessage.textContent = '✓ Pesan berhasil dikirim! Terima kasih.';
      statusMessage.style.color = 'rgba(76, 175, 80, 0.9)';
      contactForm.reset();
    }, function(error){
      statusMessage.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi.';
      statusMessage.style.color = 'rgba(244, 67, 54, 0.9)';
      console.error('Error:', error);
    });
  });
}
