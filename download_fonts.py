#!/usr/bin/env python3
"""
AI LEAD Website - Font Downloader
Downloads Google Fonts locally for offline use
"""

import requests
import os
import re
from urllib.parse import urlparse

def create_fonts_directory():
    """Create the static/fonts directory"""
    os.makedirs('static/fonts', exist_ok=True)
    print("✅ Created static/fonts directory")

def get_font_css_url(font_family, weights, formats='woff2'):
    """Generate Google Fonts CSS URL"""
    weights_str = ':wght@' + ';'.join(map(str, weights))
    return f"https://fonts.googleapis.com/css2?family={font_family.replace(' ', '+')}{weights_str}&display=swap"

def download_font_css(font_family, weights):
    """Download the CSS file from Google Fonts"""
    url = get_font_css_url(font_family, weights)
    
    # Use a modern browser user agent to get woff2 fonts
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print(f"✅ Downloaded CSS for {font_family}")
        return response.text
    except requests.RequestException as e:
        print(f"❌ Failed to download CSS for {font_family}: {e}")
        return None

def extract_font_urls(css_content):
    """Extract font URLs from the CSS content"""
    # Find all src: url(...) patterns
    url_pattern = r'src:\s*url\((https://[^)]+)\)'
    urls = re.findall(url_pattern, css_content)
    return urls

def download_font_file(url, filename):
    """Download a single font file"""
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        filepath = os.path.join('static/fonts', filename)
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✅ Downloaded {filename}")
        return True
    except requests.RequestException as e:
        print(f"❌ Failed to download {filename}: {e}")
        return False

def download_fonts():
    """Main function to download all fonts"""
    print("🎨 AI LEAD Website - Font Downloader")
    print("=" * 50)
    
    # Create fonts directory
    create_fonts_directory()
    
    # Font configurations
    fonts_config = [
        {
            'family': 'Jura',
            'weights': [300, 400, 500, 600, 700],
            'prefix': 'Jura'
        },
        {
            'family': 'Roboto',
            'weights': [300, 400, 500, 700],
            'prefix': 'Roboto'
        },
        {
            'family': 'Inter',
            'weights': [300, 400, 500, 600, 700],
            'prefix': 'Inter'
        }
    ]
    
    weight_names = {
        300: 'Light',
        400: 'Regular',
        500: 'Medium',
        600: 'SemiBold',
        700: 'Bold'
    }
    
    all_font_files = []
    
    for font_config in fonts_config:
        family = font_config['family']
        weights = font_config['weights']
        prefix = font_config['prefix']
        
        print(f"\n📥 Downloading {family} font...")
        
        # Download CSS
        css_content = download_font_css(family, weights)
        if not css_content:
            continue
            
        # Extract font URLs
        font_urls = extract_font_urls(css_content)
        
        # Download each font file
        for i, url in enumerate(font_urls):
            if i < len(weights):
                weight = weights[i]
                weight_name = weight_names.get(weight, str(weight))
                filename = f"{prefix}-{weight_name}.woff2"
                
                if download_font_file(url, filename):
                    all_font_files.append({
                        'family': family,
                        'weight': weight,
                        'weight_name': weight_name,
                        'filename': filename
                    })
    
    # Generate updated CSS with local font references
    generate_local_font_css(all_font_files)
    
    print(f"\n🎉 Font download complete!")
    print(f"📁 Fonts saved in: static/fonts/")
    print(f"🎨 Updated CSS saved in: static/fonts/local-fonts.css")

def generate_local_font_css(font_files):
    """Generate CSS file with local font references"""
    css_content = """/* AI LEAD Website - Local Fonts */
/* Generated automatically by font downloader */

"""
    
    # Group by font family
    families = {}
    for font in font_files:
        family = font['family']
        if family not in families:
            families[family] = []
        families[family].append(font)
    
    # Generate @font-face rules
    for family, fonts in families.items():
        css_content += f"/* {family} Font */\n"
        for font in fonts:
            css_content += f"""@font-face {{
    font-family: '{family}';
    src: url('../fonts/{font['filename']}') format('woff2');
    font-weight: {font['weight']};
    font-style: normal;
    font-display: swap;
}}

"""
    
    # Add CSS custom properties and utility classes
    css_content += """
/* CSS Custom Properties */
:root {
    --font-jura: 'Jura', sans-serif;
    --font-roboto: 'Roboto', sans-serif;
    --font-inter: 'Inter', sans-serif;
}

/* Font Utility Classes */
.font-jura { font-family: var(--font-jura); }
.font-roboto { font-family: var(--font-roboto); }
.font-inter { font-family: var(--font-inter); }

/* Font Weight Classes */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
"""
    
    # Save the CSS file
    css_filepath = os.path.join('static/fonts', 'local-fonts.css')
    with open(css_filepath, 'w') as f:
        f.write(css_content)
    
    print("✅ Generated local-fonts.css")

if __name__ == "__main__":
    try:
        download_fonts()
    except KeyboardInterrupt:
        print("\n⏸Font download cancelled by user")
    except Exception as e:
        print(f"\nError: {e}")
        print("Make sure you have 'requests' installed: pip install requests")