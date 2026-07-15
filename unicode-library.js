/**
 * CYBER_FONT // ULTIMATE UNICODE LIBRARY (COMPLETE VERSION)
 * Core mapping protocol for multi-layered text translation.
 */
const UnicodeLibrary = (() => {
  
  // 1. MATHEMATICAL UNICODE BLOCKS (Calculated via code point offsets)
  const offsetMaps = {
    bold:           { A: 0x1D400, a: 0x1D41A, 0: 0x1D7CE },
    italic:         { A: 0x1D434, a: 0x1D44E, 0: 0x00030, exceptions: { h: 'ℎ' } },
    boldItalic:     { A: 0x1D468, a: 0x1D482, 0: 0x00030 },
    script:         { A: 0x1D49C, a: 0x1D4B6, 0: 0x00030, exceptions: { B:'ℬ', E:'ℰ', F:'ℱ', H:'ℋ', I:'ℐ', L:'ℒ', M:'ℳ', R:'ℛ', e:'ℯ', g:'ℊ', o:'ℴ' } },
    scriptBold:     { A: 0x1D4D0, a: 0x1D4EA, 0: 0x00030 },
    fraktur:        { A: 0x1D504, a: 0x1D51E, 0: 0x00030, exceptions: { C:'ℭ', H:'ℌ', I:'ℑ', R:'ℜ', Z:'ℨ' } },
    frakturBold:    { A: 0x1D56C, a: 0x1D586, 0: 0x00030 },
    doubleStruck:   { A: 0x1D538, a: 0x1D552, 0: 0x1D7D8, exceptions: { C:'ℂ', H:'ℍ', N:'ℕ', P:'ℙ', Q:'ℚ', R:'ℝ', Z:'ℤ' } },
    sansSerif:      { A: 0x1D5A0, a: 0x1D5BA, 0: 0x1D7E2 },
    sansBold:       { A: 0x1D5D4, a: 0x1D5EE, 0: 0x1D7EC },
    sansItalic:     { A: 0x1D608, a: 0x1D622, 0: 0x00030 },
    sansBoldItalic: { A: 0x1D63C, a: 0x1D656, 0: 0x00030 },
    monospace:      { A: 0x1D670, a: 0x1D68A, 0: 0x1D7F6 }
  };

  // 2. CUSTOM DICTIONARY MAPS (Pseudo-fonts & special blocks)
  const charMaps = {
    vaporwave: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９",
    squared: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789",
    squaredDark: "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉０１２３４５６７８９",
    circledDark: "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩⓿❶❷❸❹❺❻❼❽❾",
    circledLight: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨",
    parenthesized: "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵０１２３４５６７８９",
    smallCaps: "ABCDEFGHIJKLMNOPQRSTUVWXYZᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ0123456789",
    upsideDown: "∀𐐒ƆᗡƎℲ⅁HIſʞ˥WNOԀΌᴚS⊥∩ΛMX⅄Zɐqɔpǝɟƃɥıɾʞlɯuodbɹsʇnʌʍxʎz0ƖᄅƐㄣϛ9ㄥ86",
    fauxAsian: "卂乃匚刀巨下厶卄工丁长乚爪几口尸Ｑ尺丂丅凵Ｖ山乂丫乙卂乃匚刀巨下厶卄工丁长乚爪几口尸ｑ尺丂丅凵ｖ山乂丫乙０１２３４５６７８９",
    fauxCyrillic: "ДБCДЄFGHИJКLMNФPQRSTЦVWXYZдбcдєfghиjкlmnфpqrstцvwxyz０１２３４５６７８９",
    runic: "ᚫᛒᚳᛞᛖᚠᚷᚻᛁᛃᚲᛚᛗᚾᚩᛈᛩᚱᛋᛏᚢᚡᚹᛪᚣᛉᚫᛒᚳᛞᛖᚠᚷᚻᛁᛃᚲᛚᛗᚾᚩᛈᛩᚱᛋᛏᚢᚡᚹᛪᚣᛉ０１２３４５６７８９",
    currency: "₳฿₵Đ€₣₲ⱧłJ₭Ⱡ₥₦Ø₱QⱤ₴₮ɄV₩ӾҰZ₳฿₵đ€₣₲Ⱨłj₭Ⱡ₥₦ø₱qⱤ₴₮ʉv₩ӿ¥z０１２３４５６７８９",
    curly: "ǟɮƈɖɛʄɢɦɨʝӄʟʍռօքզʀֆȶʊʋաӼʏʐǟɮƈɖɛʄɢɦɨʝӄʟʍռօքզʀֆȶʊʋաӼʏʐ０１２３４５６７８９",
    demonic: "ค๒૮๔ﻉिﻭɦٱﻝᛕɭ๓กѻρ۹ɼรՇપ۷ฝซץչค๒૮๔ﻉिﻭɦٱﻝᛕɭ๓กѻρ۹ɼรՇપ۷ฝซץչ０１２３４５６７８９",
    leetspeak: "48CD3F6H1JKLMN0PQR57UVWXYZ48cd3f6h1jklmn0pqr57uvwxyz0123456789",
    superscript: "ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾQᴿˢᵀᵁⱽᵂˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᑫʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹"
  };

  const standardChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // --- Dynamic Modifier Functions (Zalgo, Strikethrough, Underline, Slash) ---
  function applyGlitch(text) {
    const glitchMarks = ['\u0300','\u0301','\u0302','\u0303','\u0304','\u0305','\u0306','\u0307','\u0308','\u0309','\u030A','\u030B','\u030C','\u030D','\u030E','\u030F','\u0310','\u0311','\u0312','\u0313','\u0314','\u0315','\u0316','\u0317','\u0318','\u0319','\u031A','\u031B','\u031C','\u031D','\u031E','\u031F'];
    return text.split('').map(char => {
      if (char === ' ') return char;
      const numMarks = Math.floor(Math.random() * 4);
      let glitched = char;
      for (let i = 0; i < numMarks; i++) glitched += glitchMarks[Math.floor(Math.random() * glitchMarks.length)];
      return glitched;
    }).join('');
  }

  function applyCombiningChar(text, combiningChar) {
    return text.split('').map(char => char === ' ' ? char : char + combiningChar).join('');
  }

  // --- Core Translators ---
  function convertOffsetChar(char, map) {
    if (map.exceptions && map.exceptions[char]) return map.exceptions[char];
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(map.A + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(map.a + (code - 97));
    if (code >= 48 && code <= 57) return String.fromCodePoint(map["0"] + (code - 48));
    return char;
  }

  function convertMappedChar(char, mapString) {
    const index = standardChars.indexOf(char);
    if (index !== -1) {
        const array = Array.from(mapString); 
        return array[index] || char;
    }
    return char;
  }

  // Main translation orchestrator
  function translate(text, style) {
    // Check dynamic modifiers first
    if (style === 'glitch') return applyGlitch(text);
    if (style === 'strikethrough') return applyCombiningChar(text, '\u0336');
    if (style === 'underline') return applyCombiningChar(text, '\u0332');
    if (style === 'slash') return applyCombiningChar(text, '\u0338');

    // Check Math Offset Blocks
    if (offsetMaps[style]) {
      return text.split('').map(char => convertOffsetChar(char, offsetMaps[style])).join('');
    }

    // Check Custom Dictionary Blocks
    if (charMaps[style]) {
      let result = text.split('').map(char => convertMappedChar(char, charMaps[style])).join('');
      if (style === 'upsideDown') result = result.split('').reverse().join('');
      return result;
    }

    return text;
  }

  return {
    translate,
    getStyles: () => [
      ...Object.keys(offsetMaps), 
      ...Object.keys(charMaps), 
      'glitch', 'strikethrough', 'underline', 'slash'
    ]
  };
})();
