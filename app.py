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

# Solutions Routes
@app.route('/solutions')
def solutions():
    """Solutions overview page"""
    return render_template('solutions/index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/smart-cities')
def solutions_smart_cities():
    """Smart Cities & Infrastructure solutions"""
    return render_template('solutions/smart-cities.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/ai-ml')
def solutions_ai_ml():
    """AI & Machine Learning solutions"""
    return render_template('solutions/ai-ml.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/iot')
def solutions_iot():
    """IoT & Devices solutions"""
    return render_template('solutions/iot.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/smart-houses')
def solutions_smart_houses():
    """Smart House and Luxury Living solutions"""
    return render_template('solutions/smart-houses.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/enterprise')
def solutions_enterprise():
    """Enterprise solutions"""
    return render_template('solutions/enterprise.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/cloud')
def solutions_cloud():
    """Cloud & SaaS solutions"""
    return render_template('solutions/cloud.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/holography')
def solutions_holography():
    """Holographic & 3D solutions"""
    return render_template('solutions/holography.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/uav-defence')
def solutions_uav_defence():
    """Defence & UAV Security solutions"""
    return render_template('solutions/uav-defence.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/solutions/cultural')
def solutions_cultural():
    """Cultural & Interactive solutions"""
    return render_template('solutions/cultural.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

# Industries Routes
@app.route('/industries')
def industries():
    """Industries overview page"""
    return render_template('industries/index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/healthcare')
def industries_healthcare():
    """Healthcare industry page"""
    return render_template('industries/healthcare.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/education')
def industries_education():
    """Education industry page"""
    return render_template('industries/education.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/transportation')
def industries_transportation():
    """Transportation & Mobility industry page"""
    return render_template('industries/transportation.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/manufacturing')
def industries_manufacturing():
    """Manufacturing industry page"""
    return render_template('industries/manufacturing.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/government')
def industries_government():
    """Government & Public Sector industry page"""
    return render_template('industries/government.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/industries/retail')
def industries_retail():
    """Retail & Cultural industry page"""
    return render_template('industries/retail.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

# Services Routes
@app.route('/services')
def services():
    """Services overview page"""
    return render_template('services/index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/services/consulting')
def services_consulting():
    """Technology Consulting services"""
    return render_template('services/consulting.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/services/research')
def services_research():
    """R&D & Feasibility Studies services"""
    return render_template('services/research.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/services/implementation')
def services_implementation():
    """Implementation & Integration services"""
    return render_template('services/implementation.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/services/support')
def services_support():
    """Support & Maintenance services"""
    return render_template('services/support.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

# Projects Routes
@app.route('/projects')
def projects():
    """Projects / Case Studies page"""
    return render_template('projects/index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/projects/<project_slug>')
def project_detail(project_slug):
    """Individual project detail page"""
    # You can add logic here to fetch project data based on slug
    return render_template('projects/detail.html', 
                         project_slug=project_slug,
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

# Resources Routes
@app.route('/resources')
def resources():
    """Resources page"""
    return render_template('resources/index.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/resources/whitepapers')
def resources_whitepapers():
    """Whitepapers & Insights"""
    return render_template('resources/whitepapers.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/resources/presentations')
def resources_presentations():
    """Presentations & Brochures"""
    return render_template('resources/presentations.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

@app.route('/resources/news')
def resources_news():
    """News & Media"""
    return render_template('resources/news.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG'])

# API Routes
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

# Image serving routes
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

# Context processor to make site config available in all templates
@app.context_processor
def inject_site_config():
    return {
        'site': app.config['SITE_CONFIG'],
        'current_year': datetime.now().year,
        'current_path': request.path
    }

# Template filters
@app.template_filter('slugify')
def slugify_filter(text):
    """Convert text to URL-friendly slug"""
    import re
    return re.sub(r'[^\w\s-]', '', text).strip().lower().replace(' ', '-')

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG']), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('errors/500.html', 
                         images=app.config['IMAGES'],
                         site=app.config['SITE_CONFIG']), 500

# Health check route
@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })

# Sitemap route
@app.route('/sitemap.xml')
def sitemap():
    """Generate XML sitemap"""
    from flask import Response
    
    urls = [
        '/', '/about', '/contact',
        '/solutions', '/industries', '/services', '/projects', '/resources',
        '/solutions/smart-cities', '/solutions/ai-ml', '/solutions/iot',
        '/solutions/smart-houses', '/solutions/enterprise', '/solutions/cloud',
        '/solutions/holography', '/solutions/uav-defence', '/solutions/cultural',
        '/industries/healthcare', '/industries/education', '/industries/transportation',
        '/industries/manufacturing', '/industries/government', '/industries/retail',
        '/services/consulting', '/services/research', '/services/implementation', '/services/support'
    ]
    
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for url in urls:
        sitemap_xml += f'  <url><loc>{request.url_root.rstrip("/")}{url}</loc></url>\n'
    
    sitemap_xml += '</urlset>'
    
    return Response(sitemap_xml, mimetype='application/xml')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)