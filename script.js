document.addEventListener('DOMContentLoaded', () => {
  // Initialize Swiper
  new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
    },
  });

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.info-card, .category-card').forEach((el) => {
    observer.observe(el);
  });

  // Particle Animation
  const particleContainer = document.querySelector('.particle-container');
  const numParticles = 30;

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.width = `${Math.random() * 8 + 4}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particleContainer.appendChild(particle);
  }

  // Текущее время
  function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('current-time');
    const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Tashkent' };
    const timeString = now.toLocaleTimeString('uz-UZ', options);
    const dateString = now.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    timeElement.textContent = `${timeString} | ${dateString}`;
  }
  updateTime(); // Инициализация
  setInterval(updateTime, 1000); // Обновление каждую секунду

  // Логика корзины и избранного
  const cartLink = document.querySelector('.cart-link');
  const wishlistLink = document.querySelector('.wishlist-link');
  const mainSections = document.querySelectorAll('section:not(.cart-section):not(.wishlist-section), header, nav, footer');
  const cartSection = document.querySelector('.cart-section');
  const wishlistSection = document.querySelector('.wishlist-section');
  const backToMainLinks = document.querySelectorAll('.back-to-main');

  // Показать корзину
  cartLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainSections.forEach(section => section.style.display = 'none');
    cartSection.style.display = 'block';
    renderCart();
  });

  // Показать избранное
  wishlistLink.addEventListener('click', (e) => {
    e.preventDefault();
    mainSections.forEach(section => section.style.display = 'none');
    wishlistSection.style.display = 'block';
    renderWishlist();
  });

  // Вернуться на главную
  backToMainLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // Скрыть корзину и избранное
      cartSection.style.display = 'none';
      wishlistSection.style.display = 'none';
      // Показать основные секции
      mainSections.forEach(section => {
        section.style.display = ''; // Сброс на стандартное значение CSS
        // Сброс стилей, чтобы избежать конфликтов
        section.style.opacity = '';
        section.style.transition = '';
        section.style.position = '';
        section.style.top = '';
        section.style.zIndex = '';
      });

      // Явно установим стили для nav
      const nav = document.querySelector('nav');
      nav.style.display = 'block';
      nav.style.position = 'fixed';
      nav.style.top = '90px'; // Соответствует твоему CSS
      nav.style.width = '100%';
      nav.style.zIndex = '999';

      // Явно установим стили для header
      const header = document.querySelector('header');
      header.style.display = 'flex';
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.zIndex = '1000';
    });
  });

  // Добавление в корзину
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image');
      addToCart({ name, price, image });
      alert(`${name} savatga qo'shildi!`);
    });
  });

  // Добавление в избранное
  document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const image = button.getAttribute('data-image');
      addToWishlist({ name, price, image });
      alert(`${name} sevimlilarga qo'shildi!`);
    });
  });

  // Функции для работы с корзиной
  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-message">Savat bo\'sh</p>';
      cartTotal.textContent = 'Jami: 0 so\'m';
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      cartItems.innerHTML += `
        <div class="cart-item">
          <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>Narx: ${item.price.toLocaleString()} so\'m</p>
          </div>
          <div class="item-actions">
            <button onclick="removeFromCart(${index})">O\'chirish</button>
          </div>
        </div>
      `;
    });
    cartTotal.textContent = `Jami: ${total.toLocaleString()} so\'m`;
  }

  window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  };

  // Функции для работы с избранным
  function addToWishlist(item) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.push(item);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.innerHTML = '';

    if (wishlist.length === 0) {
      wishlistItems.innerHTML = '<p class="empty-message">Sevimlilar bo\'sh</p>';
      return;
    }

    wishlist.forEach((item, index) => {
      wishlistItems.innerHTML += `
        <div class="wishlist-item">
          <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
          <div class="item-details">
            <h3>${item.name}</h3>
            <p>Narx: ${item.price.toLocaleString()} so\'m</p>
          </div>
          <div class="item-actions">
            <button onclick="removeFromWishlist(${index})">O\'chirish</button>
          </div>
        </div>
      `;
    });
  }

  window.removeFromWishlist = function(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
  }
});