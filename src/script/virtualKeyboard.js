const virtualKeyboard = () => {
    let caseSize = 'down';
    const keysBtn = document.querySelectorAll('.key');
    const symbols = document.querySelectorAll('.symbol');
    const textArea = document.querySelector('.area__txt');

    function deleteWord(str, pos) {
        console.log('dqwdqw')
        return str.slice(0, pos) + str.slice(pos + 1, str.length);
    }

    keysBtn.forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('side__btn')) {
                switch (key.dataset.name) {
                    case 'Tab':
                        textArea.focus();
                        textArea.value = textArea.value + '   ';
                        break;
                    case 'Backspace':
                        textArea.focus();
                        textArea.value = deleteWord(textArea.value, textArea.selectionStart - 1);
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd - 1;
                        break;
                    case 'Enter':
                        textArea.focus();
                        textArea.value = textArea.value + '\n';
                        break;
                    case 'Delete':
                        textArea.focus();
                        textArea.value = deleteWord(textArea.value, textArea.selectionStart);
                        textArea.selectionStart = textArea.selectionEnd = textArea.selectionEnd - 1;                        break;
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
                            }
                            else {
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

    window.addEventListener('load', () => {
        localStorage.setItem('size', 'down');
    });
}

export default virtualKeyboard;