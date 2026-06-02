  // Custom cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX - 18) * 0.12;
    followerY += (mouseY - followerY - 18) * 0.12;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = cursor.style.transform.replace(' scale(2)', ''); });
  });

  // Nav scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  });

  // Intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('.skill-card').forEach(el => observer.observe(el));

  // Form submit
  function handleSubmit(btn) {
    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#00c896';
      btn.style.opacity = '1';
      document.querySelectorAll('.form-input, .form-textarea').forEach(i => i.value = '');
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
      }, 3000);
    }, 1500);
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });