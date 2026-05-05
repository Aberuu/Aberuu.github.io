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

// Carousel functionality
const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn-prev');
const nextBtn = document.querySelector('.carousel-btn-next');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoScrollSpeed = 0.3; // pixels per frame - reduced for smoother transitions
let lastTime = 0;

carouselTrack.addEventListener('mousedown', dragStart);
carouselTrack.addEventListener('touchstart', dragStart);
carouselTrack.addEventListener('mouseup', dragEnd);
carouselTrack.addEventListener('touchend', dragEnd);
carouselTrack.addEventListener('mouseleave', dragEnd);
carouselTrack.addEventListener('mousemove', drag);
carouselTrack.addEventListener('touchmove', drag);

// Button navigation
prevBtn.addEventListener('click', () => {
  stopAutoScroll();
  currentTranslate += 320; // Move right (show previous)
  setSliderPosition();
  startAutoScroll();
});

nextBtn.addEventListener('click', () => {
  stopAutoScroll();
  currentTranslate -= 320; // Move left (show next)
  setSliderPosition();
  startAutoScroll();
});

function dragStart(e) {
  isDragging = true;
  if (e.type === 'touchstart') {
    startPos = e.touches[0].clientX;
  } else {
    startPos = e.clientX;
  }
  animationID = requestAnimationFrame(animation);
  carouselTrack.style.cursor = 'grabbing';
}

function drag(e) {
  if (isDragging) {
    const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  carouselTrack.style.cursor = 'grab';
  prevTranslate = currentTranslate;
  // Start continuous auto scroll
  startAutoScroll();
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function autoScroll(currentTime) {
  if (!isDragging) {
    currentTranslate -= autoScrollSpeed;
    setSliderPosition();
    animationID = requestAnimationFrame(autoScroll);
  }
}

function setSliderPosition() {
  const itemWidth = 320; // 300px + 20px gap
  const numUniqueItems = 5; // 5 unique items
  const totalWidth = itemWidth * numUniqueItems;
  
  // Infinite scroll: reset position seamlessly when reaches the end
  if (currentTranslate <= -totalWidth) {
    currentTranslate += totalWidth;
  }
  
  carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
  updateActiveItem(); 
}

function updateActiveItem() {
  const container = document.querySelector('.carousel-container');
  const containerRect = container.getBoundingClientRect();
  const centerX = containerRect.left + containerRect.width / 2;
  
  carouselItems.forEach((item, index) => {
    const itemRect = item.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 4;
    const distanceFromCenter = Math.abs(centerX - itemCenterX);
    const maxDistance = containerRect.width / 4;
    
    const scale = Math.max(0.8, 1 - (distanceFromCenter / maxDistance) * 0.5);
    const opacity = Math.max(0.8, 1 - (distanceFromCenter / maxDistance) * 0.7);
    const blur = Math.min(2, (distanceFromCenter / maxDistance) * 5);
    
    item.style.transform = `scale(${scale})`;
    item.style.opacity = opacity;
    item.style.filter = `blur(${blur}px)`;
    item.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out, filter 2s ease-o';
    
    if (distanceFromCenter < 150) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Initialize
updateActiveItem();
startAutoScroll();

// Update on window resize
window.addEventListener('resize', updateActiveItem);

// Auto-scroll functions
function startAutoScroll() {
  stopAutoScroll(); // Clear any existing interval
  animationID = requestAnimationFrame(autoScroll);
}

function stopAutoScroll() {
  if (animationID) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }
}

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
