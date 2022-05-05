const realKeyboard = () => {
  let lang = 'en';
  let caseSize = 'down';
  const symbols = document.querySelectorAll('.symbol');
  const textArea = document.querySelector('.area__txt');
  const keysBtn = document.querySelectorAll('.key');

  let symbolsArray = [];

  function shiftUp() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInnerShift"] : item["ruInnerShift"];
        }
      }
    }
  }

  function shiftDown() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInner"] : item["ruInner"];
        }
      }
    }
  }

  document.addEventListener('keydown', (event) => {
    textArea.focus();
    keysBtn.forEach(key => {
      if (key.dataset.name == event.code) {
        switch (key.dataset.name) {
          case 'CapsLock':
            capsLockClick(key);
            break;
          case 'ShiftLeft':
            shiftUp();
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
        switch (key.dataset.name) {
          case 'ShiftLeft':
            shiftDown();
            break;
        }
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

  async function getSymbols() {
    const url = '../src/assets/db/symbols.json';
    const res = await fetch(url);
    const data = await res.json();
    moveSymbolSArray(data);
  }

  const moveSymbolSArray = (symbols) => {
    symbolsArray = [...symbols];
  };

  window.addEventListener('load', () => {
    localStorage.setItem('size', 'down');
    getSymbols();
  });
};

export default realKeyboard;
