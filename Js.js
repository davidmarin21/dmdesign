let lang = 'en';

  function setLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.getElementById('btn-en').classList.toggle('active', l === 'en');
    document.getElementById('btn-es').classList.toggle('active', l === 'es');

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + l);
      if (!val) return;
      if (val.includes('<')) { el.innerHTML = val; } else { el.textContent = val; }
    });

    const ph = {
      'f-name': { en: 'John Smith',                                                   es: 'Juan García' },
      'f-biz':  { en: 'Restaurant, salon, clinic...',                                 es: 'Restaurante, salón, clínica...' },
      'f-msg':  { en: 'What does your business do? Any specific features you need?',  es: '¿A qué se dedica tu negocio? ¿Necesitas alguna función especial?' }
    };
    Object.entries(ph).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.placeholder = v[l]; });
    document.title = l === 'es' ? 'DMDesign — Diseño Web Profesional' : 'DMDesign — Professional Web Design';
  }

  function handleSubmit(btn) {
    btn.textContent = lang === 'es' ? '¡Mensaje enviado! ✓' : 'Message sent! ✓';
    btn.style.background = '#4caf50'; btn.style.color = '#fff'; btn.disabled = true;
  }

  // Cursor
  const cursor = document.getElementById('cursor'), ring = document.getElementById('cursor-ring');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
  (function animRing(){ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=Math.round(rx)+'px'; ring.style.top=Math.round(ry)+'px'; requestAnimationFrame(animRing); })();
  document.querySelectorAll('a,button,.portfolio-item').forEach(el=>{
    el.addEventListener('mouseenter',()=>{ cursor.style.width='18px'; cursor.style.height='18px'; ring.style.width='52px'; ring.style.height='52px'; });
    el.addEventListener('mouseleave',()=>{ cursor.style.width='10px'; cursor.style.height='10px'; ring.style.width='36px'; ring.style.height='36px'; });
  });

  // Nav
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));

  // Reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold: 0.1});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  setTimeout(() => document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('visible')), 100);
