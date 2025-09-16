from flask import Flask, render_template, url_for
import os
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Ensure static directories exist
os.makedirs('static/images', exist_ok=True)

# Template helper functions
@app.context_processor
def utility_processor():
    return dict(
        current_year=datetime.now().year,
        url_for_image=lambda filename: url_for('static', filename=f'images/{filename}')
    )

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':

    app.run(debug=True, host='0.0.0.0', port=5000)