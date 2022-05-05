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

    shiftLeft.addEventListener('mousedown', shiftUp);
    shiftLeft.addEventListener('mouseup', shiftDown);
    shiftRight.addEventListener('mousedown', shiftUp);
    shiftRight.addEventListener('mouseup', shiftDown);

    keysBtn.forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('side__btn')) {
                switch (key.dataset.name) {
                    case 'Tab':
                        textArea.focus();
                        textArea.value = textArea.value + '\t';
                        break;
                    case 'Backspace':
                        textArea.focus();
                        textArea.value = deleteWord(textArea.value, textArea.selectionStart - 1);
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd;
                        break;
                    case 'Enter':
                        textArea.focus();
                        textArea.value = textArea.value + '\n';
                        break;
                    case 'Delete':
                        textArea.focus();
                        textArea.value = deleteWord(textArea.value, textArea.selectionStart);
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd - 1;
                        break;
                    case 'ArrowLeft':
                        textArea.focus();
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd - 1;
                        break;
                    case 'ArrowRight':
                        textArea.focus();
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd + 1;
                        break;
                    case 'ArrowUp':
                        textArea.focus();
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd - 77;
                        break;
                    case 'ArrowDown':
                        textArea.focus();
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd + 77;
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
                clickBtn(key);
            }
        });
    });

    function clickBtn (key) {
        textArea.focus();
        textArea.value = textArea.value + key.innerHTML;
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