const realKeyboard = () => {
  let lang = 'en';
  let caseSize = 'down';
  const capsLock = document.querySelector('.capslock');
  const symbols = document.querySelectorAll('.symbol');
  const textArea = document.querySelector('.area__txt');
  const keysBtn = document.querySelectorAll('.key');

  capsLock.addEventListener('click', () => {
    textArea.focus();
    capsLock.classList.toggle('capslock__active');
    symbols.forEach((item) => {
      if (caseSize === 'down') {
        item.innerHTML = item.innerHTML.toUpperCase();
      }
      else {
        item.innerHTML = item.innerHTML.toLowerCase();
      }
    });
    caseSize = caseSize === 'down' ? 'up' : 'down';
  });

  document.addEventListener('keydown', (event) => {
    textArea.focus();
    keysBtn.forEach(key => {
      if (key.dataset.name == event.code) {
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
};

export default realKeyboard;
