import requests
import os

os.makedirs('static/fonts', exist_ok=True)

fonts_css = '''/* AI LEAD Website Fonts */

/* Jura - Primary Font (Futuristic) */
@import url('https://fonts.googleapis.com/css2?family=Jura:wght@300;400;500;600;700&display=swap');

/* Roboto - Secondary Font (Clean) */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

/* Inter - Tertiary Font (Modern) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --font-primary: 'Jura', sans-serif;
  --font-secondary: 'Roboto', sans-serif;
  --font-tertiary: 'Inter', sans-serif;
}

.font-primary { font-family: var(--font-primary); }
.font-secondary { font-family: var(--font-secondary); }
.font-tertiary { font-family: var(--font-tertiary); }
'''

with open('static/fonts/fonts.css', 'w') as f:
    f.write(fonts_css)

