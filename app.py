from flask import Flask, render_template, send_from_directory, url_for, redirect, jsonify
import os
from datetime import datetime

app = Flask(__name__)

# Configuration
class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Image configuration
    IMAGES = {
        'banner': {
            'url': 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2400&auto=format&fit=crop',
            'alt': 'AI LEAD Banner - Smart Technology Solutions',
            'fallback': 'static/images/banner-fallback.jpg'
        },
        'workspace': {
            'url': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
            'alt': 'Modern workspace showing smart technology solutions',
            'fallback': 'static/images/workspace-fallback.jpg'
        }
    }
    
    # Site configuration
    SITE_CONFIG = {
        'company_name': 'AI LEAD',
        'tagline': 'Smart Technologies & Smart Solutions',
        'contact': {
            'email': 'contact@ailead.example',
            'phone': '+974 0000 1111'
        }
    }

app.config.from_object(Config)

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])
@app.route('/about')
def about():
    """About Us page"""
    return render_template('about.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])
@app.route('/contact')
def contact():
    """Contact Us page"""
    return render_template('contact.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])


@app.route('/api/images')
def api_images():
    """API endpoint for image management"""
    return jsonify(app.config['IMAGES'])

@app.route('/images/<image_name>')
def serve_image(image_name):
    """Serve images with fallback support"""
    if image_name in app.config['IMAGES']:
        image_config = app.config['IMAGES'][image_name]
        # In production, you might want to cache these or serve local files
        return redirect(image_config['url'])
    else:
        return "Image not found", 404

@app.route('/images/<image_name>/info')
def image_info(image_name):
    """Get image metadata"""
    if image_name in app.config['IMAGES']:
        return jsonify(app.config['IMAGES'][image_name])
    else:
        return jsonify({'error': 'Image not found'}), 404

# Context processor to make site config available in all templates
@app.context_processor
def inject_site_config():
    return {
        'site': app.config['SITE_CONFIG'],
        'current_year': datetime.now().year
    }

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('errors/500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)