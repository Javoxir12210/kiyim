    const modal = document.getElementById('sizeGuideModal');
    const btns = document.querySelectorAll('.size-guide-btn');
    const closeBtn = document.querySelector('.close-modal');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });