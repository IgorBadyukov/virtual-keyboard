const realKeyboard = () => {
  let lang = 'en';
  let flag = false;
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
    flag = true;
  }

  function shiftDown() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInner"] : item["ruInner"];
        }
      }
    }
    flag = false;
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
            if (flag) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'ShiftRight':
            if (flag) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'AltLeft':
            if (flag) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            else {
              flag = true;
            }
            break;
          case 'AltRight':
            if (flag) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            else {
              flag = true;
            }
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
          case 'ShiftRight':
            shiftDown();
            break;
          case 'AltLeft':
            flag = false
            break;
          case 'AltRight':
            flag = false;
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

  function changeLanguage() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInner"] : item["ruInner"];
        }
      }
    }
    flag = false;
  }

  function setLocalStorageSize() {
    localStorage.setItem('size', caseSize);
  }

  function setLocalStorageLang() {
    localStorage.setItem('lang', lang);
  }
  window.addEventListener('beforeunload', setLocalStorageLang);

  function getLocalStorageSize() {
    if (localStorage.getItem('size')) {
      caseSize = localStorage.getItem('size');
    }
    else {
      caseSize = 'down';
    }
  }

  function getLocalStorageLang() {
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    }
    else {
      lang = 'en';
    }
    changeLanguage();
  }
  window.addEventListener('load', () => {
    localStorage.setItem('size', 'down');
    getSymbols();
  });

  const moveSymbolSArray = (symbols) => {
    symbolsArray = [...symbols];
    getLocalStorageLang();
  };

  async function getSymbols() {
    const url = '../src/assets/db/symbols.json';
    const res = await fetch(url);
    const data = await res.json();
    moveSymbolSArray(data);
  }
};

export default realKeyboard;
