const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const professionData = {
  farmer: ['01 / CROP CYCLE', 'THE FARMER', 'Plants, harvests, and quietly keeps the entire settlement alive. An economy begins at the soil.'],
  librarian: ['02 / KNOWLEDGE KEEP', 'THE LIBRARIAN', 'Trades in maps, books, and enchantments. Every shelf is a route to somewhere the village has not been.'],
  armorer: ['03 / IRONWORKS', 'THE ARMORER', 'Turns raw metal into a second chance. When the raid comes, the armorer is already working.'],
  cleric: ['04 / THE NETHER', 'THE CLERIC', 'Studies the strange forces beneath the world and trades in rare ingredients gathered from the dark.']
};
const detail = document.querySelector('#profession-detail');
document.querySelectorAll('.profession').forEach(card => card.addEventListener('click', () => {
  document.querySelectorAll('.profession').forEach(item => item.classList.remove('active'));
  card.classList.add('active');
  const [label, title, copy] = professionData[card.dataset.prof];
  detail.animate([{opacity: 0, transform: 'translateY(8px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 350, easing: 'ease-out'});
  detail.querySelector('span').textContent = label;
  detail.querySelector('strong').textContent = title;
  detail.querySelector('p').textContent = copy;
}));

const parallaxLayers = document.querySelectorAll('[data-speed]');
if (!reduceMotion) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxLayers.forEach(layer => { layer.style.transform = `translate3d(0, ${y * Number(layer.dataset.speed)}px, 0)`; });
        header.style.background = y > 80 ? 'rgba(8, 14, 20, .78)' : 'transparent';
        header.style.backdropFilter = y > 80 ? 'blur(12px)' : 'none';
        ticking = false;
      });
      ticking = true;
    }
  }, {passive: true});
}

document.querySelectorAll('.timeline-item').forEach(item => item.addEventListener('mouseenter', () => {
  document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
}));
