/* ============================================
   WhatsApp Psychology 2.0 - Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Sticky Header --- */
  const header = document.getElementById('header');

  if (header) {
    const onScroll = () => {
      if (window.pageYOffset > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Smooth Scroll for Anchor Links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* --- Scroll Reveal (IntersectionObserver) --- */
  const revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* --- Staggered Children Reveal --- */
  const staggerContainers = document.querySelectorAll('.stagger-children');

  if (staggerContainers.length > 0 && 'IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 80}ms`;
            child.classList.add('revealed');
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -30px 0px'
    });

    staggerContainers.forEach(el => staggerObserver.observe(el));
  }

  /* --- Countdown Timer --- */
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMins = document.getElementById('timer-mins');
  const timerSecs = document.getElementById('timer-secs');

  if (timerDays && timerHours && timerMins && timerSecs) {
    // Target time: 6 days 23 hrs 59 mins from now
    let targetTime = new Date().getTime() + (6 * 24 * 60 * 60 * 1000) + (23 * 60 * 60 * 1000) + (59 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        timerDays.innerText = '00';
        timerHours.innerText = '00';
        timerMins.innerText = '00';
        timerSecs.innerText = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerDays.innerText = days < 10 ? '0' + days : days;
      timerHours.innerText = hours < 10 ? '0' + hours : hours;
      timerMins.innerText = minutes < 10 ? '0' + minutes : minutes;
      timerSecs.innerText = seconds < 10 ? '0' + seconds : seconds;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* --- Lightbox for Testimonial Screenshots --- */
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || 'Student Testimonial';
      lightbox.classList.add('lightbox--active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('lightbox--active');
      document.body.style.overflow = '';
    };

    document.querySelectorAll('.testimonial-img').forEach(img => {
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

});

/* --- Global Copy Account Number Helper --- */
function copyAccountNumber() {
  const accNum = document.getElementById('acc-num')?.innerText || '5601772067';
  const btnText = document.getElementById('copy-btn-text');

  navigator.clipboard.writeText(accNum).then(() => {
    if (btnText) {
      const originalText = btnText.innerText;
      btnText.innerText = '✅ Copied!';
      setTimeout(() => {
        btnText.innerText = originalText;
      }, 2500);
    }
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
