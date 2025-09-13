/*PARA HEADER Y FOOTER*/
document.querySelector('header nav').classList.toggle('active');



// Responsive Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

// Carousel Functionality
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.indicator-button');
    this.currentSlide = 0;
    this.interval = null;

    this.init();
  }

  init() {
    this.updateSlide();
    this.startAutoPlay();
    this.addEventListeners();
  }

  updateSlide() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
      const indicator = this.indicators[index];
      if (indicator) {
        indicator.classList.toggle('active', index === this.currentSlide);
      }
    });
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlide();
  }

  startAutoPlay() {
    this.interval = setInterval(() => this.nextSlide(), 5000);
  }

  addEventListeners() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.currentSlide = index;
        this.updateSlide();
        clearInterval(this.interval);
        this.startAutoPlay();
      });
    });
  }
}

if (document.querySelector('.carousel-container')) {
  new Carousel();
}

// Form Validation
class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      const error = input.nextElementSibling;
      if (!input.value.trim()) {
        error.style.display = 'block';
        isValid = false;
      } else {
        error.style.display = 'none';
      }
    });

    if (isValid) {
      this.showSuccess();
      this.form.reset();
    }
  }

  showSuccess() {
    const alert = document.createElement('div');
    alert.className = 'alert-success';
    alert.innerHTML = '¡Mensaje enviado con éxito! <i class="fas fa-check"></i>';
    this.form.parentElement.insertBefore(alert, this.form);
    setTimeout(() => alert.remove(), 3000);
  }
}

if (document.querySelector('.contact-form')) {
  new ContactForm();
}

// Scroll Animation
const fadeInElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeInElements.forEach(element => observer.observe(element));

// Smooth Scroll for Buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Dynamic Stats Update (Example)
class StatsUpdater {
  constructor() {
    this.stats = document.querySelectorAll('.stat-value');
    this.init();
  }

  init() {
    this.stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let count = 0;
      const duration = 2000;
      const step = target / (duration / 16);
      const updateCount = () => {
        count += step;
        if (count < target) {
          stat.textContent = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      updateCount();
    });
  }
}

if (document.querySelector('.stats-grid')) {
  new StatsUpdater();
}

// Progress Bar Animation
document.querySelectorAll('.progress-fill').forEach(bar => {
  const width = bar.style.width || bar.dataset.width;
  if (width) {
    bar.style.transition = 'none';
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1.5s ease';
      bar.style.width = width;
    }, 100);
  }
});