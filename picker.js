(function () {
  'use strict';

  const STORAGE_KEY = 'rpm-portfolio-design';
  const designs = {
    minimalist: 'minimalist/',
    industrial: 'industrial/',
    editorial: 'editorial/',
    ethereal: 'ethereal/',
  };

  function getStoredDesign() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  function setStoredDesign(id) {
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }

  function clearStoredDesign() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  function redirectTo(designId) {
    const path = designs[designId];
    if (path) window.location.href = path;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('reset') === '1') {
    clearStoredDesign();
  }

  const remember = getStoredDesign();
  const skipPicker = params.get('picker') !== '1';

  if (remember && designs[remember] && skipPicker && !params.has('choose')) {
    redirectTo(remember);
    return;
  }

  const rememberCheckbox = document.getElementById('remember-design');
  const cards = document.querySelectorAll('[data-design]');

  cards.forEach((card) => {
    const id = card.dataset.design;
    const link = card.querySelector('.design-enter');

    if (link) {
      link.addEventListener('click', (e) => {
        if (rememberCheckbox && rememberCheckbox.checked) {
          setStoredDesign(id);
        }
      });
    }

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const enter = card.querySelector('.design-enter');
        if (enter) enter.click();
      }
    });
  });

  if (rememberCheckbox) {
    rememberCheckbox.checked = Boolean(remember);
    rememberCheckbox.addEventListener('change', () => {
      if (!rememberCheckbox.checked) clearStoredDesign();
    });
  }

  if (remember) {
    const active = document.querySelector(`[data-design="${remember}"]`);
    if (active) active.classList.add('selected');
  }
})();
