const virtualKeyboard = () => {
    const keysBtn = document.querySelectorAll('.key');
    const textArea = document.querySelector('.area__txt');

    keysBtn.forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('side__btn')) {
                if (key.dataset.name === 'Tab') {
                    textArea.focus();
                    textArea.value = textArea.value + '   ';
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