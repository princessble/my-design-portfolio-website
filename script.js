// 1) Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// 2) Active nav highlight
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav__link");

function setActiveLink() {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// 3) Contact form demo
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();

    if (!name || !email || !message) {
      note.textContent = "Please fill in all fields.";
      return;
    }

    note.textContent = "✅ Message sent!. I’ll get back to you soon!";
    form.reset();
  });
}

// 4) Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// 5) Back-to-top (improved)
const backToTop = document.getElementById("backToTop");

function toggleBackToTop(){
  if (window.scrollY > 500) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
}
window.addEventListener("scroll", toggleBackToTop);
toggleBackToTop();

// use pointerdown for better mobile response
backToTop.addEventListener("pointerdown", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 6) Theme toggle (saved)
const themeToggle = document.getElementById("themeToggle");
const themeText = document.getElementById("themeText");

function setTheme(mode){
  if (mode === "light") {
    document.body.classList.add("light");
    themeText.textContent = "Light";
  } else {
    document.body.classList.remove("light");
    themeText.textContent = "Dark";
  }
  localStorage.setItem("theme", mode);
}
setTheme(localStorage.getItem("theme") || "dark");

themeToggle.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// 7) Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const category = card.dataset.category;
      card.style.display = (filter === "all" || category === filter) ? "block" : "none";
    });
  });
});

// 8) Gallery modal
const modal = document.getElementById("imgModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    modalImage.src = img.src;
    modalCaption.textContent = img.closest("figure").querySelector("figcaption").textContent;
  });
});

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  modalCaption.textContent = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
});

// 9) Typing animation
const typingEl = document.getElementById("typingText");
const phrases = [
  "a Design & Web Professional.",
  "a Web Developer (Projects on GitHub).",
  "an RPA Learner & Builder.",
  "a Creative Content Designer."
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {
    typingEl.textContent = currentPhrase.slice(0, charIndex++);
    if (charIndex > currentPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typingEl.textContent = currentPhrase.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      charIndex = 0;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 65);
}
typeLoop();
