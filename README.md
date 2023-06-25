# CuisineQuest

## Description
CuisineQuest is a web application that allows users to find recipes based on the ingredients they have on hand. The user inputs ingredients or queries and receives recipes in return.

## Deployment
https://cuisinequest-85c1fdebb36a.herokuapp.com/


## Technologies
* Flask
* Python
* CSS
* HTML
* JavaScript



## How to Run (For windows users)
* Clone the repository
* Make sure Python and PIP are installed
* Make a Spoonacular account and get an API KEY
* Make sure you are in the proper directory (within your project folder)
### In Command Prompt Terminal type:
* virtualenv env
* env\Scripts\activate
* pip install flask
* pip install requests
* set SPOONACULAR_API_KEY= your_api_key
* flask run

### Note:
In the "set SPOONACULAR_API_KEY= your_api_key" command make sure you replace "your_api_key" with your actual API key
so it would look something like this:
* set SPOONACULAR_API_KEY= 123456789


## Usage

1. Start the server: `flask run`
2. Open a web browser and navigate to: `http://localhost:5000`
3. Enter the ingredients you have on hand in the search bar, you can add more ingredients by clicking the '+' button.
4. (Optional) Filter your results using the checkboxes for meal type, diet, intolerances, and cuisine.
5. Click the 'Search Recipes' button at the bottom to find recipes.

## Final Words
* I am using Spoonacular's API, check out their documentation:
* https://spoonacular.com/food-api/docs#Search-Recipes-Complex

* Due to the fact that I am using Spoonacular's API, I only have access to recipes within their databases, so I won't have access to every recipe in the world

* Have fun cooking!




