    document.addEventListener('DOMContentLoaded', function() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const accessoryCards = document.querySelectorAll('.accessory-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          const filter = this.getAttribute('data-filter');

          accessoryCards.forEach(card => {
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
          alert('Функция быстрого просмотра будет реализована позже');
        });
      });
    });