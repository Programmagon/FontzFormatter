document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('text-input');
  const outputList = document.getElementById('output-list');

  // Friendly names for the display UI
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
    vaporwave: 'V A P O R W A V E',
    squared: 'Squared Outline',
    circledDark: 'Dark Circles',
    circledLight: 'Light Circles',
    smallCaps: 'Small Caps',
    upsideDown: 'Upside Down',
    glitch: 'C O R R U P T E D // GLITCH'
  };

  // Build output card elements
  function createOutputCards() {
    outputList.innerHTML = '';
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
        <button class="copy-btn" onclick="copyResult('${style}')">COPY</button>
      `;
      outputList.appendChild(card);
    });
  }

  // Handle live conversion
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

  // Global scope binding for inline button action
  window.copyResult = (style) => {
    const element = document.getElementById(`res-${style}`);
    const button = element.closest('.output-card').querySelector('.copy-btn');
    
    if (element && element.textContent) {
      navigator.clipboard.writeText(element.textContent).then(() => {
        button.textContent = 'COPIED!';
        button.classList.add('copied');
        
        // Reset state after 1.5 seconds
        setTimeout(() => {
          button.textContent = 'COPY';
          button.classList.remove('copied');
        }, 1500);
      });
    }
  };

  // Attach event listener
  textInput.addEventListener('input', updateConversion);

  // Initialize
  createOutputCards();
  updateConversion();
});
