// Tema Geçişi
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  // Buton simgesini değiştir
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});

// Mobil Menü Aç/Kapat
const burger = document.getElementById("burger");
// DÜZELTME: burada ".navlinks" değil, "navLinks" id'si olduğu için:
// const navLinks = document.getElementById(".navlinks");  // yanlış
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Yukarı Çık Butonu
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// CV Paneli Aç/Kapa
const cvPanel = document.getElementById('cvPanel');
const cvHandle = document.getElementById('cvHandle');

cvHandle.addEventListener('mouseenter', () => {
  cvPanel.classList.add('open');
  cvPanel.setAttribute('aria-expanded', 'true');
});

cvPanel.addEventListener('mouseleave', () => {
  cvPanel.classList.remove('open');
  cvPanel.setAttribute('aria-expanded', 'false');
});

cvHandle.addEventListener('click', (e) => {
  e.stopPropagation();
  cvPanel.classList.toggle('open');
  const isOpen = cvPanel.classList.contains('open');
  cvPanel.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

cvHandle.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  cvPanel.classList.toggle('open');
  const isOpen = cvPanel.classList.contains('open');
  cvPanel.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}, { passive: true });

document.addEventListener('click', (e) => {
  if (!cvPanel.contains(e.target)) {
    cvPanel.classList.remove('open');
    cvPanel.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('touchstart', (e) => {
  if (!cvPanel.contains(e.target)) {
    cvPanel.classList.remove('open');
    cvPanel.setAttribute('aria-expanded', 'false');
  }
}, { passive: true });