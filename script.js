document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('text-input');
  const outputList = document.getElementById('output-list');

  // Friendly names for the display UI
  const styleNames = {
    bold: 'Bold Serif',
    italic: 'Italic Serif',
    boldItalic: 'Bold Italic Serif',
    script: 'Script / Cursive',
    scriptBold: 'Bold Script',
    fraktur: 'Fraktur (Gothic)',
    frakturBold: 'Bold Fraktur',
    doubleStruck: 'Double Struck (Blackboard)',
    sansSerif: 'Sans-Serif',
    sansBold: 'Bold Sans-Serif',
    sansItalic: 'Italic Sans-Serif',
    sansBoldItalic: 'Bold Italic Sans-Serif',
    monospace: 'Monospace',
    
    // Custom Pseudo-Fonts
    vaporwave: 'V A P O R W A V E',
    squared: 'Squared Outline',
    squaredDark: 'Squared Solid',
    circledDark: 'Dark Circles',
    circledLight: 'Light Circles',
    parenthesized: 'Parentheses',
    smallCaps: 'Small Caps',
    upsideDown: 'Upside Down',
    fauxAsian: 'Neo-Tokyo // Faux Kanji',
    fauxCyrillic: 'Soviet // Faux Cyrillic',
    runic: 'Ancient // Runic',
    currency: 'Corpo // Currency',
    curly: 'Alien // Horned',
    demonic: 'Cultist // Demonic',
    leetspeak: 'H4ck3r // Leetspeak',
    superscript: 'Superscript / Tiny',
    
    // Dynamic Modifiers
    glitch: 'C O R R U P T E D // GLITCH',
    strikethrough: 'Censored // Strikethrough',
    underline: 'Data-Link // Underline',
    slash: 'Terminated // Slashed'
  };

  /**
   * Generiert die Ausgabekarten einmalig im DOM
   */
  function createOutputCards() {
    // DocumentFragment minimiert DOM-Reflows und beschleunigt das Laden massiv
    const fragment = document.createDocumentFragment();
    const styles = UnicodeLibrary.getStyles();

    styles.forEach(style => {
      const card = document.createElement('div');
      card.className = 'output-card';
      card.dataset.style = style;

      card.innerHTML = `
        <div class="font-info">
          <div class="font-name">${styleNames[style] || style}</div>
          <div class="font-result" id="res-${style}">...</div>
        </div>
        <button class="copy-btn">COPY</button>
      `;
      
      fragment.appendChild(card);
    });

    outputList.innerHTML = '';
    outputList.appendChild(fragment);
  }

  /**
   * Führt die Live-Konvertierung durch
   */
  function updateConversion() {
    const text = textInput.value || 'Type something...';
    const styles = UnicodeLibrary.getStyles();

    styles.forEach(style => {
      const element = document.getElementById(`res-${style}`);
      if (element) {
        element.textContent = UnicodeLibrary.translate(text, style);
      }
    });
  }

  /**
   * Event Delegation für den Copy-Button.
   * Verhindert das Zumüllen des globalen Window-Scopes.
   */
  outputList.addEventListener('click', (event) => {
    const button = event.target.closest('.copy-btn');
    if (!button) return; // Klick war nicht auf einem Button

    // Wenn kein Text eingegeben wurde, kopieren wir nichts
    if (!textInput.value.trim()) return;

    const card = button.closest('.output-card');
    const style = card.dataset.style;
    const element = document.getElementById(`res-${style}`);
    
    if (element && element.textContent) {
      navigator.clipboard.writeText(element.textContent)
        .then(() => {
          // Visuelles Feedback
          button.textContent = 'COPIED!';
          button.classList.add('copied');
          
          // Reset nach 1,5 Sekunden
          setTimeout(() => {
            button.textContent = 'COPY';
            button.classList.remove('copied');
          }, 1500);
        })
        .catch(err => {
          console.error('Copy failed: ', err);
        });
    }
  });

  // Event Listener für Live-Eingabe
  textInput.addEventListener('input', updateConversion);

  // Initialisierung
  createOutputCards();
  updateConversion();
});
