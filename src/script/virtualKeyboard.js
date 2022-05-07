const virtualKeyboard = () => {
    let caseSize = 'down';
    let lang = 'en'
    const keysBtn = document.querySelectorAll('.key');
    const shiftLeft = document.querySelector('.lshift');
    const shiftRight = document.querySelector('.rshift');
    const symbols = document.querySelectorAll('.symbol');
    const textArea = document.querySelector('.area__txt');

    let symbolsArray = [];

    function deleteWord(str, pos) {
        return str.slice(0, pos) + str.slice(pos + 1, str.length);
    }

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
    }

    function shiftDown() {
        for (let key of symbols) {
            for (let item of symbolsArray) {
                if (key.dataset.name === item.code) {
                    key.innerHTML = lang === 'en' ? item["enInner"] : item["ruInner"];
                    key.innerHTML = caseSize === 'up' ? key.innerHTML.toUpperCase() : key.innerHTML.toLowerCase();
                }
            }
        }
    }

    shiftLeft.addEventListener('mousedown', shiftUp);
    shiftLeft.addEventListener('mouseup', shiftDown);
    shiftRight.addEventListener('mousedown', shiftUp);
    shiftRight.addEventListener('mouseup', shiftDown);

    keysBtn.forEach(key => {

        key.addEventListener('click', (event) => {
            event.preventDefault();
            let curStart = textArea.selectionStart, curEnd = textArea.selectionEnd;
            if (key.classList.contains('side__btn')) {
                switch (key.dataset.name) {
                    case 'Tab':
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '\t');
                        textArea.selectionStart = textArea.selectionEnd = curStart + 1;
                        break;
                    case 'Backspace':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        if (curStart === curEnd) {
                            textArea.value = deleteWord(textArea.value, textArea.selectionStart - 1);
                            textArea.selectionStart = textArea.selectionEnd = curStart - 1;
                            break;
                        }
                        else {
                            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '');
                            textArea.selectionStart = textArea.selectionEnd = curStart;
                            break;
                        }
                    case 'Enter':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '\n');
                        textArea.selectionStart = textArea.selectionEnd = curStart;
                        break;
                    case 'Delete':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        if (curStart === curEnd) {
                            textArea.value = deleteWord(textArea.value, textArea.selectionStart);
                            textArea.selectionStart = textArea.selectionEnd = curStart;
                            break;
                        }
                        else {
                            textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '');
                            textArea.selectionStart = textArea.selectionEnd = curStart;
                            break;
                        }
                    case 'ArrowLeft':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '◄');
                        textArea.selectionStart = textArea.selectionEnd = curStart + 1;
                        break;
                    case 'ArrowRight':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '►');
                        textArea.selectionStart = textArea.selectionEnd = curStart + 1;
                        break;
                    case 'ArrowUp':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▲');
                        textArea.selectionStart = textArea.selectionEnd = curStart + 1;
                        break;
                    case 'ArrowDown':
                        textArea.focus();
                        curStart = textArea.selectionStart;
                        curEnd = textArea.selectionEnd;
                        textArea.value = addWord(textArea.value, textArea.selectionStart, textArea.selectionEnd, '▼');
                        textArea.selectionStart = textArea.selectionEnd = curStart + 1;
                        break;
                    case 'CapsLock':
                        getLocalStorageSize();
                        key.classList.toggle('capslock__active');
                        symbols.forEach((item) => {
                            if (caseSize === 'down') {
                                item.innerHTML = item.innerHTML.toUpperCase();
                            } else {
                                item.innerHTML = item.innerHTML.toLowerCase();
                            }
                        });
                        caseSize = caseSize === 'down' ? 'up' : 'down';
                        setLocalStorageSize();
                        break;
                }
            }
            else {
                clickBtn(key, curStart, curEnd);
            }
        });
    });

    function clickBtn (key, posStart, posEnd) {
        textArea.focus();
        // let curStart = textArea.selectionStart;
        // let curEnd = textArea.selectionEnd;
        textArea.value = addWord(textArea.value, posStart, posEnd, key.innerHTML);
        textArea.selectionStart = textArea.selectionEnd = posStart + 1;
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
}

export default virtualKeyboard;