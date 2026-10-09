
document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // TEMA DEĞİŞTİRME
  // =========================
  const themeToggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");

    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"
      );
    }

    try {
      localStorage.setItem("siteTheme", theme);
    } catch (error) {
      // Site, localStorage olmadan da çalışabilir.
    }
  }

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("siteTheme") || "dark";
  } catch (error) {
    // Varsayılan tema koyu.
  }

  setTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });


  // =========================
  // TÜRKÇE / İNGİLİZCE
  // =========================
  const languageToggle = document.getElementById("language-toggle");

  function setLanguage(language) {
    const isEnglish = language === "en";

    // HTML içinde data-tr ve data-en bulunan tüm metinler
    document.querySelectorAll("[data-tr][data-en]").forEach((element) => {
      element.textContent = isEnglish
        ? element.dataset.en
        : element.dataset.tr;
    });

    // Form yer tutucuları
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    if (nameInput) {
      nameInput.placeholder = isEnglish
        ? "Enter your full name"
        : "Adınız ve soyadınız";
    }

    if (emailInput) {
      emailInput.placeholder = isEnglish
        ? "you@example.com"
        : "ornek@email.com";
    }

    if (messageInput) {
      messageInput.placeholder = isEnglish
        ? "Write your message here..."
        : "Mesajınızı yazın...";
    }

    if (languageToggle) {
      languageToggle.textContent = isEnglish
        ? "🇹🇷 Türkçe"
        : "🇬🇧 English";
    }

    document.documentElement.lang = language;
    document.title = isEnglish
      ? "Nilüfer Göriş | Software Development Portfolio"
      : "Nilüfer Göriş | Yazılım Geliştirme Portföyü";

    try {
      localStorage.setItem("siteLanguage", language);
    } catch (error) {
      // Dil tercihi kaydedilemese de çeviri çalışır.
    }
  }

  let currentLanguage = "tr";

  try {
    currentLanguage = localStorage.getItem("siteLanguage") || "tr";
  } catch (error) {
    // Varsayılan dil Türkçe.
  }

  setLanguage(currentLanguage);

  languageToggle?.addEventListener("click", () => {
    currentLanguage = currentLanguage === "tr" ? "en" : "tr";
    setLanguage(currentLanguage);
  });


  // =========================
  // MOBİL MENÜ
  // =========================
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    navLinks?.classList.remove("show");
    burger?.setAttribute("aria-expanded", "false");
  }

  burger?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("show") ?? false;
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeCVPanel();
    }
  });


  // =========================
  // YUKARI ÇIK BUTONU
  // =========================
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  function updateScrollButton() {
    if (!scrollToTopBtn) return;

    const visible = window.scrollY > 300;
    scrollToTopBtn.classList.toggle("visible", visible);
    scrollToTopBtn.setAttribute("aria-hidden", String(!visible));
  }

  window.addEventListener("scroll", updateScrollButton, {
    passive: true
  });

  updateScrollButton();

  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  // =========================
  // SAĞ TARAFTAKİ CV PANELİ
  // =========================
  const cvPanel = document.getElementById("cvPanel");
  const cvHandle = document.getElementById("cvHandle");

  function openCVPanel() {
    if (!cvPanel) return;

    cvPanel.classList.add("open");
    cvPanel.setAttribute("aria-expanded", "true");
  }

  function closeCVPanel() {
    if (!cvPanel) return;

    cvPanel.classList.remove("open");
    cvPanel.setAttribute("aria-expanded", "false");
  }

  function toggleCVPanel() {
    if (!cvPanel) return;

    const isOpen = cvPanel.classList.contains("open");

    if (isOpen) {
      closeCVPanel();
    } else {
      openCVPanel();
    }
  }

  cvHandle?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleCVPanel();
  });

  // Fareyle üzerine gelince açılması yalnızca masaüstünde
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cvHandle?.addEventListener("mouseenter", openCVPanel);

    cvPanel?.addEventListener("mouseleave", closeCVPanel);
  }

  document.addEventListener("click", (event) => {
    if (cvPanel && !cvPanel.contains(event.target)) {
      closeCVPanel();
    }
  });


  // =========================
  // İLETİŞİM FORMU
  // =========================
  // Formun e-posta göndermesi için ayrıca EmailJS
  // SDK'sı ve hesap/servis/template ayarları gerekir.
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent =
        currentLanguage === "en"
          ? "Email delivery is not configured yet. Please email me directly."
          : "E-posta gönderimi henüz yapılandırılmadı. Lütfen doğrudan e-posta gönderin.";

      formStatus.setAttribute("role", "status");
    }
  });
})
