from flask import Flask, render_template, send_from_directory, url_for, redirect
import os

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'

# Image URLs that will be served from backend
IMAGES = {
    'banner': 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2400&auto=format&fit=crop',
    'workspace': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop'
}

@app.route('/')
def index():
    """Main landing page"""
    return render_template('index.html', images=IMAGES)

@app.route('/solutions')
def solutions():
    """Solutions page (future implementation)"""
    return render_template('solutions.html', images=IMAGES)

@app.route('/about')
def about():
    """About page (future implementation)"""
    return render_template('about.html', images=IMAGES)

@app.route('/contact')
def contact():
    """Contact page (future implementation)"""
    return render_template('contact.html', images=IMAGES)

@app.route('/images/<image_name>')
def serve_image(image_name):
    """Serve images through backend"""
    if image_name in IMAGES:
        # In production, you might want to cache these or serve local files
        # For now, we'll redirect to the external URL
        return redirect(IMAGES[image_name])
    else:
        return "Image not found", 404

# Static file routes (handled automatically by Flask, but showing for clarity)
@app.route('/static/css/<filename>')
def serve_css(filename):
    return send_from_directory('static/css', filename)

@app.route('/static/js/<filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

@app.route('/static/fonts/<filename>')
def serve_fonts(filename):
    return send_from_directory('static/fonts', filename)

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('errors/404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('errors/500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)