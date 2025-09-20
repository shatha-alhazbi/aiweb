from flask import Flask, render_template, send_from_directory, url_for, redirect, jsonify, request
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
            'email': 'info@ailead.tech',
            'phone': '+974 0000 1111'
        }
    }

app.config.from_object(Config)

# Main Pages
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

@app.route('/api/navigation')
def api_navigation():
    """API endpoint for navigation structure"""
    navigation = {
        'main': [
            {'label': 'Home', 'url': '/', 'icon': 'home'},
            {'label': 'About', 'url': '/about', 'icon': 'info'},
            {'label': 'Solutions', 'url': '/solutions', 'icon': 'grid', 'has_submenu': True},
            {'label': 'Industries', 'url': '/industries', 'icon': 'building', 'has_submenu': True},
            {'label': 'Services', 'url': '/services', 'icon': 'settings', 'has_submenu': True},
            {'label': 'Projects', 'url': '/projects', 'icon': 'briefcase'},
            {'label': 'Resources', 'url': '/resources', 'icon': 'book'},
            {'label': 'Contact', 'url': '/contact', 'icon': 'mail', 'is_cta': True}
        ],
        'solutions': [
            {'label': 'Smart Cities & Infrastructure', 'url': '/solutions/smart-cities'},
            {'label': 'AI & Machine Learning', 'url': '/solutions/ai-ml'},
            {'label': 'IoT & Devices', 'url': '/solutions/iot'},
            {'label': 'Smart Houses', 'url': '/solutions/smart-houses'},
            {'label': 'Enterprise Solutions', 'url': '/solutions/enterprise'},
            {'label': 'Cloud & SaaS', 'url': '/solutions/cloud'},
            {'label': 'Holographic & 3D', 'url': '/solutions/holography'},
            {'label': 'Defence & UAV Security', 'url': '/solutions/uav-defence'},
            {'label': 'Cultural & Interactive', 'url': '/solutions/cultural'}
        ],
        'industries': [
            {'label': 'Healthcare', 'url': '/industries/healthcare'},
            {'label': 'Education', 'url': '/industries/education'},
            {'label': 'Transportation & Mobility', 'url': '/industries/transportation'},
            {'label': 'Manufacturing', 'url': '/industries/manufacturing'},
            {'label': 'Government & Public Sector', 'url': '/industries/government'},
            {'label': 'Retail & Luxury Living', 'url': '/industries/retail'}
        ],
        'services': [
            {'label': 'Technology Consulting', 'url': '/services/consulting'},
            {'label': 'R&D & Feasibility Studies', 'url': '/services/research'},
            {'label': 'Implementation & Integration', 'url': '/services/implementation'},
            {'label': 'Support & Maintenance', 'url': '/services/support'}
        ]
    }
    return jsonify(navigation)

@app.route('/images/<image_name>')
def serve_image(image_name):
    """Serve images with fallback support"""
    if image_name in app.config['IMAGES']:
        image_config = app.config['IMAGES'][image_name]
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

@app.context_processor
def inject_site_config():
    return {
        'site': app.config['SITE_CONFIG'],
        'current_year': datetime.now().year,
        'current_path': request.path
    }

@app.template_filter('slugify')
def slugify_filter(text):
    """Convert text to URL-friendly slug"""
    import re
    return re.sub(r'[^\w\s-]', '', text).strip().lower().replace(' ', '-')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)