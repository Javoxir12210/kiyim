  document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const shoeCards = document.querySelectorAll('.shoe-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        filterBtns.forEach(b => b.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        shoeCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Быстрый просмотр
    const quickViews = document.querySelectorAll('.quick-view');
    quickViews.forEach(view => {
      view.addEventListener('click', function() {
        // Здесь можно добавить модальное окно с подробной информацией
        alert('Функция быстрого просмотра будет реализована позже');
      });
    });
  });