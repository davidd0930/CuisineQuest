window.onload = function() {
    document.querySelector('.add-remove-btn').addEventListener('click', addOrRemoveIngredient);
    document.querySelector('#search-button').addEventListener('click', searchRecipes);
};

function addOrRemoveIngredient(event) {
    const btn = event.target;
    const ingredientDiv = btn.parentNode;
    const input = ingredientDiv.querySelector('.ingredient-input');
    if (btn.textContent === '+') {
        if (input.value.trim() !== '') { /* Check if the input is not empty */
            btn.textContent = '-';
            createNewIngredientInput();
        }
    } else {
        ingredientDiv.parentNode.removeChild(ingredientDiv);
    }
}

function createNewIngredientInput() {
    const ingredientsList = document.querySelector('#ingredients-list');
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter Ingredient');
    newInput.classList.add('ingredient-input');

    const newBtn = document.createElement('button');
    newBtn.textContent = '+';
    newBtn.setAttribute('type', 'button');
    newBtn.classList.add('btn', 'add-remove-btn');
    newBtn.addEventListener('click', addOrRemoveIngredient);

    newIngredientDiv.appendChild(newInput);
    newIngredientDiv.appendChild(newBtn);
    ingredientsList.appendChild(newIngredientDiv);
}

// Function to handle recipe search
function searchRecipes() {
    // Collect all the inputs from the form
    const ingredients = Array.from(document.querySelectorAll('.ingredient-input'))
        .map(input => input.value.trim())
        .filter(Boolean)
        .join(',');

    const mealType = Array.from(document.querySelectorAll('.mealType:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const diet = Array.from(document.querySelectorAll('.diet:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const intolerances = Array.from(document.querySelectorAll('.intolerances:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    const cuisine = Array.from(document.querySelectorAll('.cuisine:checked'))
        .map(checkbox => checkbox.value)
        .join(',');

    // If no input was provided, show an alert and stop the function
    if(!ingredients && !mealType && !diet && !intolerances && !cuisine){
        alert('Please enter some ingredients or check a box.');
        return;
    }

    // Prepare the request data
    const data = {
        ingredients: ingredients,
        mealType: mealType,
        diet: diet,
        intolerances: intolerances,
        cuisine: cuisine
    };


    // Make the POST request to the /search route
    fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/results";
        } else {
            throw new Error('Search failed.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// Event listener to show/hide checkboxes
document.addEventListener('DOMContentLoaded', (event) => {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach((arrow) => {
        arrow.addEventListener('click', (event) => {
            const checkboxes = event.target.parentNode.querySelector('.checkboxes');
            checkboxes.classList.toggle('hidden');
        });
    });
});




