const realKeyboard = () => {
  let lang = 'en';
  let caseSize = 'down';
  const symbols = document.querySelectorAll('.symbol');
  const textArea = document.querySelector('.area__txt');
  const keysBtn = document.querySelectorAll('.key');

  document.addEventListener('keydown', (event) => {
    textArea.focus();
    keysBtn.forEach(key => {
      if (key.dataset.name == event.code) {
        switch (key.dataset.name) {
          case 'CapsLock':
            capsLockClick(key);
            break;
        }
        key.classList.add('key__active');
      }
    });
  });

  document.addEventListener('keyup', (event) => {
    textArea.blur();
    keysBtn.forEach(key => {
      if (key.dataset.name == event.code) {
        key.classList.remove('key__active');
      }
    })
  });

  function capsLockClick(key) {
    getLocalStorageSize();
    key.classList.toggle('capslock__active');
    symbols.forEach((item) => {
      if (caseSize === 'down') {
        item.innerHTML = item.innerHTML.toUpperCase();
      }
      else {
        item.innerHTML = item.innerHTML.toLowerCase();
      }
    });
    caseSize = caseSize === 'down' ? 'up' : 'down';
    setLocalStorageSize();
  }

  function setLocalStorageSize() {
    localStorage.setItem('size', caseSize);
  }

  function getLocalStorageSize() {
    if (localStorage.getItem('size')) {
      caseSize = localStorage.getItem('size');
    }
    else {
      caseSize = 'down';
    }
  }
  window.addEventListener('load', () => {
    localStorage.setItem('size', 'down');
  });
};

export default realKeyboard;
