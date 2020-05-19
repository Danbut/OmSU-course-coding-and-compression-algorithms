import encodeHuffman from './encodeHuffman';

describe('Тестирование функции кодирования текста, использующую алгоритм Хаффмана 🤡', () => {
  test('Тестирование возвращаемого типа функции encodeHuffman()', () => {
    'Функция encodeHuffman() должна вернуть объект';

    const str = 'beep boop beer!';

    const actual = typeof encodeHuffman(str);
    const expected = 'object';

    expect(actual).toBe(expected);
  });

  test('Тестирование типа элементов массива, возвращаемого функцией encodeHuffman()', () => {
    'Функция encodeHuffman() должна вернуть массив объектов';

    const str = 'beep boop beer!';

    encodeHuffman(str).forEach((element: { char: string; code: string }) => {
      const actual = typeof element;
      const expected = 'object';

      expect(actual).toBe(expected);
    });
  });

  test('Тестирование полей объектов (элементов) массива, возвращаемого функцией encodeHuffman()', () => {
    'Функция encodeHuffman() должна вернуть массив объектов вида { char: string; code: string; }';

    const str = 'beep boop beer!';

    encodeHuffman(str).forEach((obj: { char: string; code: string }) => {
      const actual = Object.keys(obj);
      const expected = ['char', 'code'];

      expect(actual).toStrictEqual(expected);
    });
  });

  test('Тестирование типов полей объектов (элементов) массива, возвращаемого функцией encodeHuffman()', () => {
    'Функция encodeHuffman() должна вернуть массив объектов вида { char: string; code: string; }';

    const str = 'beep boop beer!';

    encodeHuffman(str).forEach((obj: { char: string; code: string }) => {
      const actual = Object.values(obj).map(value => typeof value);
      const expected = ['string', 'string'];

      expect(actual).toStrictEqual(expected);
    });
  });

  test('Тестирование возвращаемого значения функции encodeHuffman() при вызове её с пустой строкой', () => {
    'Функция encodeHuffman() должна вернуть пустой массив при вызове её с пустой строкой';

    const str = '';
    const actual = encodeHuffman(str).length;
    const expected = 0;

    expect(actual).toBe(expected);
  });

  test('Тестирование длинны возвращаемого массива функции encodeHuffman() при вызове её со строкой ` Aaa`', () => {
    'Функция encodeHuffman() должна вернуть массив длинны 3 при вызове её со строкой ` Aaa`';

    const str = ' Aaa';
    const actual = encodeHuffman(str).length;
    const expected = 3;

    expect(actual).toBe(expected);
  });

  test('Тестирование возвращаемого значения функции encodeHuffman() при вызове её со строкой ` Aaa`', () => {
    'Функция encodeHuffman() должна вернуть массив со значением';
    '[{ char: `a`, code: `1`}, {char: `A`, code: `01`}, {char: ` `, code: `00`}] при вызове её со строкой ` Aaa`';

    const str = ' Aaa';
    const actual = encodeHuffman(str);
    const expected = [
      { char: ` `, code: `00` },
      { char: `A`, code: `01` },
      { char: `a`, code: `1` }
    ];

    expect(actual).toEqual(expected);
  });
});
