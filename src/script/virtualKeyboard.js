const virtualKeyboard = () => {
    const keysBtn = document.querySelectorAll('.key');
    const textArea = document.querySelector('.area__txt');

    function deleteWord(str, pos) {
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
                        textArea.value = textArea.value.slice(0, -1);
                        break;
                    case 'Enter':
                        textArea.focus();
                        textArea.value = textArea.value + '\n';
                        break;
                    case 'Delete':
                        textArea.focus();
                        deleteWord(textArea.value, textArea.selectionStart);
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
}

export default virtualKeyboard;