/**
 * Unicode Map Library 
 * Encapsulates the character-range translations.
 */
const UnicodeLibrary = (() => {
  // Direct character mappings are used to ensure stable rendering for systems with character gaps
  const maps = {
    bold: {
      A: 0x1D400, a: 0x1D41A,
      0: 0x1D7CE
    },
    italic: {
      A: 0x1D434, a: 0x1D44E,
      0: 0x00030 // Standard digits (Italic digits aren't standard in math unicode blocks)
    },
    doubleStruck: {
      // Map exceptions because of gaps in continuous Unicode blocks
      exceptions: {
        'C': 'ℂ', 'H': 'ℍ', 'N': 'ℕ', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'Z': 'ℤ'
      },
      A: 0x1D538, a: 0x1D552,
      0: 0x1D7D8
    },
    script: {
      exceptions: {
        'B': 'ℬ', 'E': 'ℰ', 'F': 'ℱ', 'H': 'ℋ', 'I': 'ℐ', 'L': 'ℒ', 'M': 'ℳ', 'R': 'ℛ',
        'e': 'ℯ', 'g': 'ℊ', 'o': 'ℴ'
      },
      A: 0x1D4D0, a: 0x1D4EA,
      0: 0x00030
    },
    fraktur: {
      exceptions: {
        'C': 'ℭ', 'H': 'ℌ', 'I': 'ℑ', 'R': 'ℜ', 'Z': 'ℨ'
      },
      A: 0x1D504, a: 0x1D51E,
      0: 0x00030
    },
    monospace: {
      A: 0x1D670, a: 0x1D68A,
      0: 0x1D7F6
    }
  };

  /**
   * Helper function to shift character code points safely
   */
  function convertChar(char, map) {
    if (map.exceptions && map.exceptions[char]) {
      return map.exceptions[char];
    }

    const code = char.charCodeAt(0);

    // Uppercase letters A-Z
    if (code >= 65 && code <= 90) {
      const offset = code - 65;
      return String.fromCodePoint(map.A + offset);
    }
    // Lowercase letters a-z
    if (code >= 97 && code <= 122) {
      const offset = code - 97;
      return String.fromCodePoint(map.a + offset);
    }
    // Digits 0-9
    if (code >= 48 && code <= 57) {
      const offset = code - 48;
      return String.fromCodePoint(map["0"] + offset);
    }

    // Return untranslated character (spaces, symbols, punctuation)
    return char;
  }

  /**
   * Translates a full text block to a selected style
   */
  function translate(text, style) {
    const map = maps[style];
    if (!map) return text;

    return text
      .split('')
      .map(char => convertChar(char, map))
      .join('');
  }

  return {
    translate,
    getStyles: () => Object.keys(maps)
  };
})();
