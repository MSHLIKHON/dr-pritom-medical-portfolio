const root = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark');
themeToggle.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.src = '';
  document.body.style.overflow = '';
};
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.dataset.caption;
  lightboxCaption.textContent = item.dataset.caption;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('#lightbox-close').focus();
}));
document.querySelector('#lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#sender-name').value.trim();
  const subject = document.querySelector('#message-subject').value;
  const message = document.querySelector('#message-body').value.trim();
  const text = `Hello Dr. Pritom Ghosh,\n\nName: ${name}\nSubject: ${subject}\n\n${message}\n\nSent from your medical portfolio.`;
  window.open(`https://wa.me/8801715675352?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
