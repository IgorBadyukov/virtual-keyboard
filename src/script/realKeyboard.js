const realKeyboard = () => {
  let lang = 'en';
  let flagShift = false;
  let flagAlt = false;
  let caseSize = 'down';
  const symbols = document.querySelectorAll('.symbol');
  const textArea = document.querySelector('.area__txt');
  const keysBtn = document.querySelectorAll('.key');

  let symbolsArray = [];

  function addWord(str, posStart, posEnd, symbol) {
    return str.slice(0, posStart) + symbol + str.slice(posEnd, str.length);
  }

  function shiftUp() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInnerShift"] : item["ruInnerShift"];
          key.innerHTML = caseSize === 'down' ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
        }
      }
    }
    flagShift = true;
  }

  function shiftDown() {
    for (let key of symbols) {
      for (let item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item["enInner"] : item["ruInner"];
          key.innerHTML = caseSize === 'up' ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
        }
      }
      flagShift = false;
    }
  }

  document.addEventListener('keydown', (event) => {
    textArea.blur();
    keysBtn.forEach(key => {
      if (key.dataset.name == event.code) {
        let curStart, curEnd;
        switch (key.dataset.name) {
          case 'Tab':
            event.preventDefault();
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '\t');
            textArea.selectionStart = textArea.selectionEnd = curStart + 1;
            break;
          case 'CapsLock':
            textArea.focus();
            capsLockClick(key);
            break;
          case 'ShiftLeft':
            textArea.focus();
            if (flagAlt) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'ShiftRight':
            textArea.focus();
            if (flagAlt) {
              textArea.focus();
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'AltLeft':
            textArea.focus();
            if (flagShift) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            else {
              flagAlt = true;
            }
            break;
          case 'Delete':
            textArea.focus();
            textArea.focus();
            break;
          case 'Backspace':
            textArea.focus();
            textArea.focus();
            break;
          case 'AltRight':
            textArea.focus();
            if (flagShift) {
              lang = lang == 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            else {
              flagAlt = true;
            }
            break;
          case 'ArrowLeft':
            textArea.focus();
            event.preventDefault();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '◄');
            textArea.selectionStart = textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowRight':
            textArea.focus();
            event.preventDefault();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '►');
            textArea.selectionStart = textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowUp':
            textArea.focus();
            event.preventDefault();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▲');
            textArea.selectionStart = textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowDown':
            textArea.focus();
            event.preventDefault();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▼');
            textArea.selectionStart = textArea.selectionEnd = curStart + 1;
            break;
        }
        if (key.classList.contains('symbol')) {
          event.preventDefault();
          textArea.focus();
          curStart = textArea.selectionStart;
          curEnd = textArea.selectionEnd;
          textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, key.innerHTML);
          textArea.selectionStart = textArea.selectionEnd = curStart + 1;
        }
        key.classList.add('key__active');
      }
    });
  });

  document.addEventListener('keyup', (event) => {
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
            flagAlt = false;
            key.classList.remove('key__active');
            break;
          case 'AltRight':
            flagAlt = false;
            key.classList.remove('key__active');
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
          if (lang === 'en' && caseSize === 'down') {
            key.innerHTML = item["enInner"];
          }
          else if (lang === 'en' && caseSize === 'up') {
            key.innerHTML = item["enInnerShift"];
          }
          else if (lang === 'en' && caseSize === 'up') {
            key.innerHTML = item["enInnerShift"];
          }
          else if (lang === 'ru' && caseSize === 'down') {
            key.innerHTML = item["ruInner"];
          }
          else  {
            key.innerHTML = item["ruInnerShift"];
          }
        }
      }
    }
    flagAlt = false;
    flagShift = false;
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
