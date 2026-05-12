// pour gsap:
document.addEventListener("DOMContentLoaded", (event) => {
gsap.registerPlugin(ScrollTrigger)
});

//-----------------------

/* ── Cursor ── */
const cur = document.getElementById('cur');
document.addEventListener('mousemove', e => {
  gsap.to(cur, { x: e.clientX, y: e.clientY, duration: .1, ease: 'power2.out' });
});
document.querySelectorAll('a, button, .tool-badge, .project-row').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

/* ── Nav scrolled ── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', scrollY > 50);
}, { passive: true });

/* ── Navbar active section ── */
const navLinks = document.querySelectorAll('.nav-links a[data-section]');
const sectionIds = ['skills', 'projects', 'contact'];
const sectionEls = sectionIds.map(id => document.getElementById(id));

function updateActive() {
  const mid = scrollY + window.innerHeight * 0.42;
  let current = '';
  sectionEls.forEach(sec => {
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + scrollY;
    if (mid >= top) current = sec.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === current));
}
window.addEventListener('scroll', updateActive, { passive: true });
updateActive();

/* ── Marquee ── */
const items = ['Python','JavaScript','Node.js','SQL','Docker','Git','Figma','REST API','Algorithme'];
const band = document.getElementById('marquee-inner');
[...items, ...items, ...items, ...items].forEach(t => {
  const s = document.createElement('span');
  s.className = 'marquee-item' + (t === 'Open to internship' ? ' accent' : '');
  s.textContent = t;
  band.appendChild(s);
});

/* ── Hero entrance ── */
gsap.set(['.hero-eyebrow', '.hero-bottom'], { opacity: 0, y: 20 });
gsap.set('.hero-headline .word', { opacity: 0, y: 60 });

gsap.timeline({ delay: .15 })
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' })
  .to('.hero-headline .word', { opacity: 1, y: 0, duration: .9, stagger: .12, ease: 'power4.out' }, '-=.2')
  .to('.hero-bottom', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.4');

/* ── Scroll reveals ── */
gsap.utils.toArray('.reveal').forEach(el => {
  gsap.fromTo(el, { opacity: 0, y: 28 }, {
    opacity: 1, y: 0, duration: .85, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});
gsap.utils.toArray('.reveal-left').forEach(el => {
  gsap.fromTo(el, { opacity: 0, x: -24 }, {
    opacity: 1, x: 0, duration: .85, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
  });
});

/* ── Skill bars ── */
document.querySelectorAll('.skill-fill').forEach(bar => {
  ScrollTrigger.create({
    trigger: bar, start: 'top 90%', once: true,
    onEnter: () => { bar.style.width = bar.dataset.w + '%'; }
  });
});

/* ── Project rows slide ── */
document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('mouseenter', () => gsap.to(row, { x: 6, duration: .3, ease: 'power2.out' }));
  row.addEventListener('mouseleave', () => gsap.to(row, { x: 0, duration: .5, ease: 'elastic.out(1,.6)' }));
});

/* ── Tool badges stagger ── */
ScrollTrigger.create({
  trigger: '.tools-row', start: 'top 90%', once: true,
  onEnter: () => {
    gsap.fromTo('.tool-badge', { opacity: 0, scale: .88 }, {
      opacity: 1, scale: 1, duration: .4, stagger: .04, ease: 'back.out(1.5)'
    });
  }
});