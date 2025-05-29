 document.addEventListener('DOMContentLoaded', function() {
      const menuBtn = document.querySelector('.mobile-menu-btn');
      const nav = document.querySelector('.main-nav');
      const headerRight = document.querySelector('.header-right');
      
      menuBtn.addEventListener('click', function() {
        if (nav.style.display === 'block') {
          nav.style.display = 'none';
          headerRight.style.display = 'none';
        } else {
          nav.style.display = 'block';
          headerRight.style.display = 'flex';
          

          nav.style.animation = 'fadeIn 0.5s ease-out';
          headerRight.style.animation = 'fadeIn 0.5s ease-out';
          

          nav.style.position = 'absolute';
          nav.style.top = '100%';
          nav.style.left = '0';
          nav.style.width = '100%';
          nav.style.backgroundColor = '#fff';
          nav.style.padding = '20px';
          nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
          
          nav.querySelector('ul').style.flexDirection = 'column';
          nav.querySelector('ul').style.gap = '15px';
          
          headerRight.style.position = 'absolute';
          headerRight.style.top = 'calc(100% + 180px)';
          headerRight.style.left = '0';
          headerRight.style.width = '100%';
          headerRight.style.backgroundColor = '#fff';
          headerRight.style.padding = '20px';
          headerRight.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
          headerRight.style.flexDirection = 'column';
          headerRight.style.alignItems = 'flex-start';
          headerRight.style.gap = '15px';
        }
      });

      const filterBtns = document.querySelectorAll('.filter-btn');
      const bagCards = document.querySelectorAll('.bag-card');
      
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {

          filterBtns.forEach(b => b.classList.remove('active'));

          this.classList.add('active');
          
          const filter = this.getAttribute('data-filter');
          
          bagCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
              card.style.display = 'block';
              card.style.animation = 'fadeInUp 0.5s ease-out forwards';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });

      const quickViews = document.querySelectorAll('.quick-view');
      quickViews.forEach(view => {
        view.addEventListener('click', function() {
          // Здесь можно добавить модальное окно с подробной информацией
          alert('Функция быстрого просмотра будет реализована позже');
        });
      });
    });