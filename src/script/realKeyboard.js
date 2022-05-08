const realKeyboard = () => {
  let lang = 'en';
  let flagShift = false;
  let flagAlt = false;
  let caseSize = 'down';
  const symbols = document.querySelectorAll('.symbol');
  const textArea = document.querySelector('.area__txt');
  const keysBtn = document.querySelectorAll('.key');

  let symbolsArray = [];

  function deleteWord(str, pos) {
    return str.slice(0, pos) + str.slice(pos + 1, str.length);
  }

  function addWord(str, posStart, posEnd, symbol) {
    return str.slice(0, posStart) + symbol + str.slice(posEnd, str.length);
  }

  function changeLanguage() {
    for (const key of symbols) {
      for (const item of symbolsArray) {
        if (key.dataset.name === item.code) {
          if (lang === 'en' && caseSize === 'down') {
            key.innerHTML = item.enInner;
          } else if (lang === 'en' && caseSize === 'up') {
            key.innerHTML = item.enInnerShift;
          } else if (lang === 'ru' && caseSize === 'down') {
            key.innerHTML = item.ruInner;
          } else {
            key.innerHTML = item.ruInnerShift;
          }
        }
      }
    }
    flagAlt = false;
    flagShift = false;
  }

  function getLocalStorageSize() {
    if (localStorage.getItem('size')) {
      caseSize = localStorage.getItem('size');
    } else {
      caseSize = 'down';
    }
  }

  function setLocalStorageSize() {
    localStorage.setItem('size', caseSize);
  }

  function capsLockClick(key) {
    getLocalStorageSize();
    key.classList.toggle('capslock__active');
    for (const item of symbols) {
      if (caseSize === 'down') {
        item.innerHTML = item.innerHTML.toUpperCase();
      } else {
        item.innerHTML = item.innerHTML.toLowerCase();
      }
    }
    caseSize = caseSize === 'down' ? 'up' : 'down';
    setLocalStorageSize();
  }

  function shiftUp() {
    for (const key of symbols) {
      for (const item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item.enInnerShift : item.ruInnerShift;
          key.innerHTML = caseSize === 'down' ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
        }
      }
    }
    flagShift = true;
  }

  function shiftDown() {
    for (const key of symbols) {
      for (const item of symbolsArray) {
        if (key.dataset.name === item.code) {
          key.innerHTML = lang === 'en' ? item.enInner : item.ruInner;
          key.innerHTML = caseSize === 'up' ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
        }
      }
      flagShift = false;
    }
  }

  function setLocalStorageLang() {
    localStorage.setItem('lang', lang);
  }
  window.addEventListener('beforeunload', setLocalStorageLang);

  function getLocalStorageLang() {
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    } else {
      lang = 'en';
    }
    changeLanguage();
  }

  document.addEventListener('keydown', (event) => {
    textArea.focus();
    keysBtn.forEach((key) => {
      event.preventDefault();
      if (key.dataset.name === event.code) {
        let curStart; let
          curEnd;
        switch (key.dataset.name) {
          case 'Tab':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '\t');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          case 'CapsLock':
            textArea.focus();
            capsLockClick(key);
            break;
          case 'Space':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, ' ');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          case 'ShiftLeft':
            textArea.focus();
            if (flagAlt) {
              lang = lang === 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'ShiftRight':
            textArea.focus();
            if (flagAlt) {
              textArea.focus();
              lang = lang === 'en' ? 'ru' : 'en';
              changeLanguage();
            }
            shiftUp();
            break;
          case 'AltLeft':
            textArea.focus();
            if (flagShift) {
              lang = lang === 'en' ? 'ru' : 'en';
              changeLanguage();
            } else {
              flagAlt = true;
            }
            break;
          case 'Delete':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            if (curStart === curEnd) {
              textArea.value = deleteWord(textArea.value, textArea.selectionStart);
              textArea.selectionStart = curStart;
              textArea.selectionEnd = curStart;
              break;
            } else {
              textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '');
              textArea.selectionStart = curStart;
              textArea.selectionEnd = curStart;
              break;
            }
          case 'Backspace':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            if (curStart === curEnd) {
              textArea.value = deleteWord(textArea.value, textArea.selectionStart - 1);
              textArea.selectionStart = curStart - 1;
              textArea.selectionEnd = curStart - 1;
              break;
            } else {
              textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '');
              textArea.selectionStart = curStart;
              textArea.selectionEnd = curStart;
              break;
            }
          case 'AltRight':
            textArea.focus();
            if (flagShift) {
              lang = lang === 'en' ? 'ru' : 'en';
              changeLanguage();
            } else {
              flagAlt = true;
            }
            break;
          case 'ArrowLeft':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '◄');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowRight':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '►');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowUp':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▲');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          case 'ArrowDown':
            textArea.focus();
            curStart = textArea.selectionStart;
            curEnd = textArea.selectionEnd;
            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▼');
            textArea.selectionStart = curStart + 1;
            textArea.selectionEnd = curStart + 1;
            break;
          default:
            break;
        }
        if (key.classList.contains('symbol')) {
          textArea.focus();
          curStart = textArea.selectionStart;
          curEnd = textArea.selectionEnd;
          textArea.value = addWord(textArea.value, curStart, curEnd, key.innerHTML);
          textArea.selectionStart = curStart + 1;
          textArea.selectionEnd = curStart + 1;
        }
        key.classList.add('key__active');
      }
    });
  });

  document.addEventListener('keyup', (event) => {
    keysBtn.forEach((key) => {
      if (key.dataset.name === event.code) {
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
          default:
            break;
        }
        key.classList.remove('key__active');
      }
    });
  });

  const moveSymbolSArray = (data) => {
    symbolsArray = [...data];
    getLocalStorageLang();
  };

  async function getSymbols() {
    const url = '../src/assets/db/symbols.json';
    const res = await fetch(url);
    const data = await res.json();
    moveSymbolSArray(data);
  }

  window.addEventListener('load', () => {
    localStorage.setItem('size', 'down');
    getSymbols();
  });
};

export default realKeyboard;
