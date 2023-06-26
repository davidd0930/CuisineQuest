import requests
from flask import Flask, render_template, request, jsonify
import os

# Instantiate Flask app
app = Flask(__name__)

# Retrieve Spoonacular API key from environment variables.
SPOONACULAR_API_KEY = os.getenv('SPOONACULAR_API_KEY', None)
# Raise exception if Spoonacular API key is not found in environment variables
if SPOONACULAR_API_KEY is None:
    raise Exception('SPOONACULAR_API_KEY not set in environment variables')
    
# Define the base URL for Spoonacular API
SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch'

# Initialize a global variable to store the search results
search_results = None

# Define a route for the homepage
@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# Define a route to handle search requests
@app.route('/search', methods=['POST'])
def search():
    global search_results
    # Get data from the incoming request
    data = request.get_json()
    # Prepare the payload for the API request
    payload = {
        'apiKey': SPOONACULAR_API_KEY,
        'includeIngredients': data.get('ingredients'),
        'type': data.get('mealType'),
        'diet': data.get('diet'),
        'intolerances': data.get('intolerances'),
        'cuisine': data.get('cuisine'),
    }
    # Make the API request and store the response
    response = requests.get(SPOONACULAR_BASE_URL, params=payload)
    # Parse the JSON response and store the results in search_results
    search_results = response.json().get('results', [])
    # Return the results as a JSON response
    return jsonify({"results": search_results}), 200

# Define a route to display the search results
@app.route('/results', methods=['GET'])
def results():
    global search_results
    # Render the results page and pass the search results to the template
    return render_template('results.html', recipes=search_results)

# Define a route to display detailed recipe information
@app.route('/recipe/<int:id>', methods=['GET'])
def recipe(id):
    # Make an API request to get detailed information for the specific recipe
    response = requests.get(f'https://api.spoonacular.com/recipes/{id}/information?apiKey={SPOONACULAR_API_KEY}')
    # Render the recipe page and pass the API response to the template
    return render_template('recipe.html', recipe=response.json())

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
