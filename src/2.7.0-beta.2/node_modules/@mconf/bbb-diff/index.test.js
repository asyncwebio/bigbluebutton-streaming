const {
  diff,
  patch,
} = require('./index');

test('unchanged text', () => {
  expect(diff('', '')).toBe(null);

  expect(diff('a', 'a')).toEqual(null);

  expect(diff('abc', 'abc')).toEqual(null);
});

test('single chengeset full text addition', () => {
  expect(diff('', 'a')).toEqual({
    start: 0,
    end: 0,
    text: 'a',
  });

  expect(diff('', 'ab')).toEqual({
    start: 0,
    end: 0,
    text: 'ab',
  });

  expect(diff('', 'abc')).toEqual({
    start: 0,
    end: 0,
    text: 'abc',
  });
});

test('single chengeset full text removal', () => {
  expect(diff('a', '')).toEqual({
    start: 0,
    end: 1,
    text: '',
  });

  expect(diff('ab', '')).toEqual({
    start: 0,
    end: 2,
    text: '',
  });

  expect(diff('abc', '')).toEqual({
    start: 0,
    end: 3,
    text: '',
  });
});

test('double chengeset full text replacement', () => {
  expect(diff('a', 'b')).toEqual({
    start: 0,
    end: 1,
    text: 'b',
  });

  expect(diff('a', 'bc')).toEqual({
    start: 0,
    end: 1,
    text: 'bc',
  });

  expect(diff('za', 'b')).toEqual({
    start: 0,
    end: 2,
    text: 'b',
  });
});

test('double chengeset suffix text addition', () => {
  expect(diff('a', 'ab')).toEqual({
    start: 1,
    end: 1,
    text: 'b',
  });

  expect(diff('za', 'zab')).toEqual({
    start: 2,
    end: 2,
    text: 'b',
  });

  expect(diff('za', 'zabc')).toEqual({
    start: 2,
    end: 2,
    text: 'bc',
  });
});

test('double chengeset suffix text removal', () => {
  expect(diff('ab', 'a')).toEqual({
    start: 1,
    end: 2,
    text: '',
  });

  expect(diff('zab', 'za')).toEqual({
    start: 2,
    end: 3,
    text: '',
  });

  expect(diff('zabc', 'za')).toEqual({
    start: 2,
    end: 4,
    text: '',
  });
});

test('double chengeset prefix text addition', () => {
  expect(diff('a', 'za')).toEqual({
    start: 0,
    end: 0,
    text: 'z',
  });

  expect(diff('ab', 'zab')).toEqual({
    start: 0,
    end: 0,
    text: 'z',
  });

  expect(diff('ab', 'yzab')).toEqual({
    start: 0,
    end: 0,
    text: 'yz',
  });
});

test('double chengeset prefix text removal', () => {
  expect(diff('za', 'a')).toEqual({
    start: 0,
    end: 1,
    text: '',
  });

  expect(diff('zab', 'ab')).toEqual({
    start: 0,
    end: 1,
    text: '',
  });

  expect(diff('yza', 'a')).toEqual({
    start: 0,
    end: 2,
    text: '',
  });
});

test('multiple changeset root text addition', () => {
  expect(diff('abc', 'abbc')).toEqual({
    start: 2,
    end: 2,
    text: 'b',
  });

  expect(diff('abcd', 'abbccd')).toEqual({
    start: 2,
    end: 3,
    text: 'bcc',
  });

  expect(diff('abcdef', 'abccddef')).toEqual({
    start: 3,
    end: 4,
    text: 'cdd',
  });
});

test('multiple changeset root text removal', () => {
  expect(diff('abc', 'ac')).toEqual({
    start: 1,
    end: 2,
    text: '',
  });

  expect(diff('abcd', 'ad')).toEqual({
    start: 1,
    end: 3,
    text: '',
  });

  expect(diff('abcdef', 'abef')).toEqual({
    start: 2,
    end: 4,
    text: '',
  });
});

test('multiple changeset root text replacement', () => {
  expect(diff('abc', 'azc')).toEqual({
    start: 1,
    end: 2,
    text: 'z',
  });

  expect(diff('abcd', 'azyd')).toEqual({
    start: 1,
    end: 3,
    text: 'zy',
  });

  expect(diff('abcdef', 'abzyef')).toEqual({
    start: 2,
    end: 4,
    text: 'zy',
  });
});

test('multiple changeset prefix text addition', () => {
  expect(diff('abc', 'zaybc')).toEqual({
    start: 0,
    end: 1,
    text: 'zay',
  });

  expect(diff('abc', 'zabyc')).toEqual({
    start: 0,
    end: 2,
    text: 'zaby',
  });

  expect(diff('abcdef', 'zabcdeyf')).toEqual({
    start: 0,
    end: 5,
    text: 'zabcdey',
  });
});

test('multiple changeset prefix text removal', () => {
  expect(diff('abc', 'bzc')).toEqual({
    start: 0,
    end: 2,
    text: 'bz',
  });

  expect(diff('abcd', 'czd')).toEqual({
    start: 0,
    end: 3,
    text: 'cz',
  });

  expect(diff('abcdef', 'ezf')).toEqual({
    start: 0,
    end: 5,
    text: 'ez',
  });
});

test('multiple changeset suffix text addition', () => {
  expect(diff('abc', 'abycz')).toEqual({
    start: 2,
    end: 3,
    text: 'ycz',
  });

  expect(diff('abc', 'aybcz')).toEqual({
    start: 1,
    end: 3,
    text: 'ybcz',
  });

  expect(diff('abcdef', 'aybcdefz')).toEqual({
    start: 1,
    end: 6,
    text: 'ybcdefz',
  });
});

test('multiple changeset suffix text removal', () => {
  expect(diff('abc', 'azb')).toEqual({
    start: 1,
    end: 3,
    text: 'zb',
  });

  expect(diff('abcd', 'abzc')).toEqual({
    start: 2,
    end: 4,
    text: 'zc',
  });

  expect(diff('abcdef', 'abczd')).toEqual({
    start: 3,
    end: 6,
    text: 'zd',
  });
});

test('multiple changeset full text replacement', () => {
  expect(diff('abc', 'zby')).toEqual({
    start: 0,
    end: 3,
    text: 'zby',
  });

  expect(diff('abcd', 'bc')).toEqual({
    start: 0,
    end: 4,
    text: 'bc',
  });

  expect(diff('abcdef', 'zabczdy')).toEqual({
    start: 0,
    end: 6,
    text: 'zabczdy',
  });
});

test('prefix addition', () => {
  expect(patch('abc', {
    start: 0,
    end: 0,
    text: '',
  })).toBe('abc');

  expect(patch('abc', {
    start: 0,
    end: 0,
    text: 'c',
  })).toBe('cabc');

  expect(patch('abc', {
    start: 0,
    end: 0,
    text: 'abc',
  })).toBe('abcabc');

  expect(patch('', {
    start: 0,
    end: 0,
    text: '',
  })).toBe('');

  expect(patch('', {
    start: 0,
    end: 0,
    text: 'a',
  })).toBe('a');

  expect(patch('', {
    start: 0,
    end: 0,
    text: 'abc',
  })).toBe('abc');
});

test('prefix replacement', () => {
  expect(patch('abc', {
    start: 0,
    end: 1,
    text: 'c',
  })).toBe('cbc');

  expect(patch('abc', {
    start: 0,
    end: 2,
    text: 'cc',
  })).toBe('ccc');

  expect(patch('abc', {
    start: 0,
    end: 3,
    text: 'ccc',
  })).toBe('ccc');

  expect(patch('a', {
    start: 0,
    end: 1,
    text: 'c',
  })).toBe('c');

  expect(patch('ab', {
    start: 0,
    end: 2,
    text: 'cc',
  })).toBe('cc');

  expect(patch('ab', {
    start: 0,
    end: 2,
    text: 'ccc',
  })).toBe('ccc');
});

test('prefix removal', () => {
  expect(patch('abc', {
    start: 0,
    end: 0,
    text: '',
  })).toBe('abc');

  expect(patch('abc', {
    start: 0,
    end: 1,
    text: '',
  })).toBe('bc');

  expect(patch('abc', {
    start: 0,
    end: 2,
    text: '',
  })).toBe('c');

  expect(patch('abc', {
    start: 0,
    end: 3,
    text: '',
  })).toBe('');
});

test('suffix addition', () => {
  expect(patch('abc', {
    start: 3,
    end: 3,
    text: '',
  })).toBe('abc');

  expect(patch('abc', {
    start: 3,
    end: 3,
    text: 'a',
  })).toBe('abca');

  expect(patch('abc', {
    start: 3,
    end: 3,
    text: 'abc',
  })).toBe('abcabc');

  expect(patch('', {
    start: 0,
    end: 0,
    text: '',
  })).toBe('');

  expect(patch('', {
    start: 0,
    end: 0,
    text: 'a',
  })).toBe('a');

  expect(patch('', {
    start: 0,
    end: 0,
    text: 'abc',
  })).toBe('abc');
});

test('suffix replacement', () => {
  expect(patch('abc', {
    start: 2,
    end: 3,
    text: 'a',
  })).toBe('aba');

  expect(patch('abc', {
    start: 1,
    end: 3,
    text: 'aa',
  })).toBe('aaa');

  expect(patch('abc', {
    start: 0,
    end: 3,
    text: 'aaa',
  })).toBe('aaa');

  expect(patch('a', {
    start: 0,
    end: 1,
    text: 'c',
  })).toBe('c');

  expect(patch('ab', {
    start: 0,
    end: 2,
    text: 'cc',
  })).toBe('cc');

  expect(patch('ab', {
    start: 0,
    end: 2,
    text: 'ccc',
  })).toBe('ccc');
});

test('suffix removal', () => {
  expect(patch('abc', {
    start: 3,
    end: 3,
    text: '',
  })).toBe('abc');

  expect(patch('abc', {
    start: 2,
    end: 3,
    text: '',
  })).toBe('ab');

  expect(patch('abc', {
    start: 1,
    end: 3,
    text: '',
  })).toBe('a');

  expect(patch('abc', {
    start: 0,
    end: 3,
    text: '',
  })).toBe('');
});

test('root addition', () => {
  expect(patch('abc', {
    start: 1,
    end: 1,
    text: '',
  })).toBe('abc');

  expect(patch('abc', {
    start: 1,
    end: 1,
    text: 'c',
  })).toBe('acbc');

  expect(patch('abc', {
    start: 1,
    end: 1,
    text: 'cc',
  })).toBe('accbc');
});

test('root replacement', () => {
  expect(patch('abc', {
    start: 1,
    end: 2,
    text: 'd',
  })).toBe('adc');

  expect(patch('abcd', {
    start: 1,
    end: 3,
    text: 'ee',
  })).toBe('aeed');

  expect(patch('abcde', {
    start: 1,
    end: 4,
    text: 'fff',
  })).toBe('afffe');
});

test('root removal', () => {
  expect(patch('abc', {
    start: 1,
    end: 2,
    text: '',
  })).toBe('ac');

  expect(patch('abcd', {
    start: 1,
    end: 3,
    text: '',
  })).toBe('ad');

  expect(patch('abcde', {
    start: 1,
    end: 4,
    text: '',
  })).toBe('ae');
});
