 
document.addEventListener('DOMContentLoaded', () => {
 
  const btn  = document.getElementById('menuToggle');
  const menu = document.getElementById('mainMenu');

  if (btn && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
      const open = menu.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    btn.addEventListener('click', (e) => {
      e.stopPropagation();   
      toggleMenu();
    });
 
    menu.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', closeMenu);
    });
 
    document.addEventListener('click', (e) => {
      const clickedInside = menu.contains(e.target) || btn.contains(e.target);
      if (!clickedInside) closeMenu();
    });
 
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  } 

  (function heroSlider(){
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;

    let idx = 0;
    const interval = 4500;

    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, interval);
  })();
 
  const sectionAnims = [
    { section: 'fade-up',    item: 'zoom-in' },
    { section: 'fade-right', item: 'fade-up' },
    { section: 'fade-left',  item: 'fade-up' },
    { section: 'flip-up',    item: 'zoom-in' },
    { section: 'fade-down',  item: 'fade-up' },
    { section: 'zoom-in',    item: 'flip-left' }
  ];

  const sections = Array.from(document.querySelectorAll('main.hero, section'));

  const itemSelectors = [
    '.card',
    '.thumb',
    '.icon',
    '.section-title',
    '.field',
    'h2','h3','p'
  ].join(',');

  sections.forEach((sec, i) => {
    const conf = sectionAnims[i % sectionAnims.length];

    sec.dataset.aos = conf.section;
    sec.dataset.aosDuration = '850';
    sec.dataset.aosOffset = '120';
    sec.dataset.aosOnce = 'true';

    const items = Array.from(sec.querySelectorAll(itemSelectors))
      .filter(el =>
        !el.classList.contains('slides') &&
        !el.classList.contains('slide') &&
        !el.classList.contains('overlay')
      );

    items.forEach((el, j) => {
      if (!el.dataset.aos) el.dataset.aos = conf.item;
      el.dataset.aosDelay = String(Math.min(j * 70, 600));
      el.dataset.aosDuration = '700';
      el.dataset.aosOnce = 'true';
    });
  });
 
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
 
  AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out-cubic',
    offset: 120
  });

  AOS.refreshHard();
}); 
