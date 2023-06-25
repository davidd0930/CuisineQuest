import requests
from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# This would ideally be placed in a separate configuration file.
SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY', None)
if SPOONACULAR_API_KEY is None:
    raise Exception('SPOONACULAR_API_KEY not set in environment variables')

SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch'

# This is the variable where you will store the search results
search_results = None

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    global search_results
    data = request.get_json()
    payload = {
        'apiKey': SPOONACULAR_API_KEY,
        'includeIngredients': data.get('ingredients'),
        'type': data.get('mealType'),
        'diet': data.get('diet'),
        'intolerances': data.get('intolerances'),
        'cuisine': data.get('cuisine'),
    }
    response = requests.get(SPOONACULAR_BASE_URL, params=payload)
    search_results = response.json().get('results', [])
    return jsonify({"results": search_results}), 200

@app.route('/results', methods=['GET'])
def results():
    global search_results
    return render_template('results.html', recipes=search_results)


@app.route('/recipe/<int:id>', methods=['GET'])
def recipe(id):
    # Make the API request for the specific recipe
    response = requests.get(f'https://api.spoonacular.com/recipes/{id}/information?apiKey={SPOONACULAR_API_KEY}')
    # Render the recipe page with the API response
    return render_template('recipe.html', recipe=response.json())

if __name__ == '__main__':
    app.run(debug=True)
