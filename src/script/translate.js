const translateKeyboard = () => {
    let symbolArray = [
        {
            code: 'Backquote',
            enInner: '`',
            enInnerShift: '~',
            ruInner: 'ё',
            ruInnerShift: 'Ё'
        },
        {
            code: 'Digit1',
            enInner: '1',
            enInnerShift: '!',
            ruInner: '1',
            ruInnerShift: '!'
        },
        {
            code: 'Digit2',
            enInner: '2',
            enInnerShift: '@',
            ruInner: '2',
            ruInnerShift: '"'
        },
        {
            code: 'Digit3',
            enInner: '3',
            enInnerShift: '#',
            ruInner: '3',
            ruInnerShift: '№'
        },
        {
            code: 'Digit4',
            enInner: '4',
            enInnerShift: '$',
            ruInner: '4',
            ruInnerShift: ';'
        },
        {
            code: 'Digit5',
            enInner: '5',
            enInnerShift: '%',
            ruInner: '5',
            ruInnerShift: '%'
        },
        {
            code: 'Digit6',
            enInner: '6',
            enInnerShift: '^',
            ruInner: '6',
            ruInnerShift: ':'
        },
        {
            code: 'Digit7',
            enInner: '7',
            enInnerShift: '&',
            ruInner: '7',
            ruInnerShift: '?'
        },
        {
            code: 'Digit8',
            enInner: '8',
            enInnerShift: '*',
            ruInner: '8',
            ruInnerShift: '*'
        },
        {
            code: 'Digit9',
            enInner: '9',
            enInnerShift: '(',
            ruInner: '9',
            ruInnerShift: '('
        },
        {
            code: 'Digit0',
            enInner: '0',
            enInnerShift: ')',
            ruInner: '0',
            ruInnerShift: ')'
        },
        {
            code: 'Minus',
            enInner: '-',
            enInnerShift: '_',
            ruInner: '-',
            ruInnerShift: '_'
        },
        {
            code: 'Equal',
            enInner: '=',
            enInnerShift: '+',
            ruInner: '=',
            ruInnerShift: '+'
        },
        {
            code: 'KeyQ',
            enInner: 'q',
            enInnerShift: 'Q',
            ruInner: 'й',
            ruInnerShift: 'Й'
        },
        {
            code: 'KeyW',
            enInner: 'w',
            enInnerShift: 'W',
            ruInner: 'ц',
            ruInnerShift: 'Ц'
        },
        {
            code: 'KeyE',
            enInner: 'e',
            enInnerShift: 'E',
            ruInner: 'у',
            ruInnerShift: 'У'
        },
        {
            code: 'KeyR',
            enInner: 'r',
            enInnerShift: 'R',
            ruInner: 'к',
            ruInnerShift: 'К'
        },
        {
            code: 'KeyT',
            enInner: 't',
            enInnerShift: 'T',
            ruInner: 'е',
            ruInnerShift: 'Е'
        },
        {
            code: 'KeyY',
            enInner: 'y',
            enInnerShift: 'Y',
            ruInner: 'н',
            ruInnerShift: 'Н'
        },
        {
            code: 'KeyU',
            enInner: 'u',
            enInnerShift: 'U',
            ruInner: 'г',
            ruInnerShift: 'Г'
        },
        {
            code: 'KeyI',
            enInner: 'i',
            enInnerShift: 'I',
            ruInner: 'ш',
            ruInnerShift: 'Ш'
        },
        {
            code: 'KeyO',
            enInner: 'o',
            enInnerShift: 'O',
            ruInner: 'щ',
            ruInnerShift: 'Щ'
        },
        {
            code: 'KeyP',
            enInner: 'p',
            enInnerShift: 'P',
            ruInner: 'з',
            ruInnerShift: 'З'
        },
        {
            code: 'BracketLeft',
            enInner: '[',
            enInnerShift: '{',
            ruInner: 'х',
            ruInnerShift: 'Х'
        },
        {
            code: 'BracketRight',
            enInner: ']',
            enInnerShift: '}',
            ruInner: 'ъ',
            ruInnerShift: 'Ъ'
        },
        {
            code: 'Backslash',
            enInner: '\\',
            enInnerShift: '|',
            ruInner: '\\',
            ruInnerShift: '/'
        },
        {
            code: 'KeyA',
            enInner: 'a',
            enInnerShift: 'A',
            ruInner: 'ф',
            ruInnerShift: 'Ф'
        },
        {
            code: 'KeyS',
            enInner: 's',
            enInnerShift: 'S',
            ruInner: 'ы',
            ruInnerShift: 'Ы'
        },
        {
            code: 'KeyD',
            enInner: 'd',
            enInnerShift: 'D',
            ruInner: 'в',
            ruInnerShift: 'В'
        },
        {
            code: 'KeyF',
            enInner: 'f',
            enInnerShift: 'F',
            ruInner: 'а',
            ruInnerShift: 'А'
        },
        {
            code: 'KeyG',
            enInner: 'g',
            enInnerShift: 'G',
            ruInner: 'п',
            ruInnerShift: 'П'
        },
        {
            code: 'KeyH',
            enInner: 'h',
            enInnerShift: 'H',
            ruInner: 'р',
            ruInnerShift: 'Р'
        },
        {
            code: 'KeyJ',
            enInner: 'j',
            enInnerShift: 'J',
            ruInner: 'о',
            ruInnerShift: 'О'
        },
        {
            code: 'KeyK',
            enInner: 'k',
            enInnerShift: 'K',
            ruInner: 'л',
            ruInnerShift: 'Л'
        },
        {
            code: 'KeyL',
            enInner: 'l',
            enInnerShift: 'L',
            ruInner: 'д',
            ruInnerShift: 'Д'
        },
        {
            code: 'Semicolon',
            enInner: ';',
            enInnerShift: ':',
            ruInner: 'ж',
            ruInnerShift: 'Ж'
        },
        {
            code: 'Quote',
            enInner: "'",
            enInnerShift: '"',
            ruInner: 'э',
            ruInnerShift: 'Э'
        },
        {
            code: 'KeyZ',
            enInner: 'z',
            enInnerShift: 'Z',
            ruInner: 'я',
            ruInnerShift: 'Я'
        },
        {
            code: 'KeyX',
            enInner: 'x',
            enInnerShift: 'X',
            ruInner: 'ч',
            ruInnerShift: 'Ч'
        },
        {
            code: 'KeyC',
            enInner: 'c',
            enInnerShift: 'C',
            ruInner: 'c',
            ruInnerShift: 'C'
        },
        {
            code: 'KeyV',
            enInner: 'v',
            enInnerShift: 'V',
            ruInner: 'м',
            ruInnerShift: 'М'
        },
        {
            code: 'KeyB',
            enInner: 'b',
            enInnerShift: 'B',
            ruInner: 'и',
            ruInnerShift: 'И'
        },
        {
            code: 'KeyN',
            enInner: 'n',
            enInnerShift: 'N',
            ruInner: 'т',
            ruInnerShift: 'Т'
        },
        {
            code: 'KeyM',
            enInner: 'm',
            enInnerShift: 'M',
            ruInner: 'ь',
            ruInnerShift: 'Ь'
        },
        {
            code: 'Comma',
            enInner: ',',
            enInnerShift: '<',
            ruInner: 'б',
            ruInnerShift: 'Б'
        },
        {
            code: 'Period',
            enInner: '.',
            enInnerShift: '>',
            ruInner: 'ю',
            ruInnerShift: 'Ю'
        },
        {
            code: 'Slash',
            enInner: '/',
            enInnerShift: '?',
            ruInner: '.',
            ruInnerShift: ','
        }
    ];
};

export default translateKeyboard;
