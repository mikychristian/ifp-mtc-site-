document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const revealItems = document.querySelectorAll('.reveal');
  const mobileToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  const setActiveLink = () => {
    const scrollY = window.scrollY + 160;
    const sections = ['#hero', '#filiere', '#galerie', '#contact'];

    sections.forEach((id, index) => {
      const section = document.querySelector(id);
      if (section && scrollY >= section.offsetTop) {
        navLinks.forEach((link) => link.classList.remove('text-sky-600'));
        if (navLinks[index]) navLinks[index].classList.add('text-sky-600');
      }
    });
  };

  const revealOnScroll = () => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.classList.add('visible');
      }
    });
  };

  const onScroll = () => {
    if (header) {
      header.classList.toggle('shadow-lg', window.scrollY > 20);
    }
    setActiveLink();
    revealOnScroll();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', revealOnScroll);
  onScroll();

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  });
});
