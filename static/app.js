// Define actions to be executed when the page has fully loaded
window.onload = function() {
    // Add click event listener to the "add-remove-btn" class
    document.querySelector('.add-remove-btn').addEventListener('click', addOrRemoveIngredient);
    // Add click event listener to the "search-button" ID
    document.querySelector('#search-button').addEventListener('click', searchRecipes);
};

// Function to add or remove ingredient inputs
function addOrRemoveIngredient(event) {
    // Get the button that was clicked
    const btn = event.target;
    // Get the parent div of the button
    const ingredientDiv = btn.parentNode;
    // Get the input within the same div

    // If the button text is '+', it means we're adding an ingredient
    const input = ingredientDiv.querySelector('.ingredient-input');
    if (btn.textContent === '+') {
        // Check if the input is not empty
        if (input.value.trim() !== '') { /* Check if the input is not empty */
            // Change the button text to '-'
            btn.textContent = '-';
            // Create a new ingredient input
            createNewIngredientInput();
        }
    } else {
        // If the button text is not '+', we're removing an ingredient
        // Remove the div containing the ingredient input
        ingredientDiv.parentNode.removeChild(ingredientDiv);
    }
}

// Function to create new ingredient inputs
function createNewIngredientInput() {
    // Get the ingredients list
    const ingredientsList = document.querySelector('#ingredients-list');
    // Create a new div for the ingredient
    const newIngredientDiv = document.createElement('div');
    newIngredientDiv.classList.add('ingredient');

    // Create a new input field
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', 'Enter Ingredient');
    newInput.classList.add('ingredient-input');
    
    // Create a new button
    const newBtn = document.createElement('button');
    newBtn.textContent = '+';
    newBtn.setAttribute('type', 'button');
    newBtn.classList.add('btn', 'add-remove-btn');
    newBtn.addEventListener('click', addOrRemoveIngredient);

    // Add the new input and button to the new ingredient div
    newIngredientDiv.appendChild(newInput);
    newIngredientDiv.appendChild(newBtn);
    // Add the new ingredient div to the ingredients list
    ingredientsList.appendChild(newIngredientDiv);
}

// Function to handle recipe search
function searchRecipes() {
    // Collect all the inputs from the form
    const ingredients = Array.from(document.querySelectorAll('.ingredient-input'))
        .map(input => input.value.trim())
        .filter(Boolean)
        .join(',');

    // The following variables do the same for different categories
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
        // If the request was successful, redirect to the results page
        if (response.ok) {
            window.location.href = "/results";
        } else {
            // If the request was not successful, throw an error
            throw new Error('Search failed.');
        }
    })
    .catch((error) => {
        // Log the error if one occurred
        console.error('Error:', error);
    });
}


// Event listener to show/hide checkboxes
document.addEventListener('DOMContentLoaded', (event) => {
    // Select all elements with the "arrow" class
    const arrows = document.querySelectorAll('.arrow');
    // Add a click event listener to each arrow
    arrows.forEach((arrow) => {
        arrow.addEventListener('click', (event) => {
            // Select the checkboxes in the same parent div as the arrow
            const checkboxes = event.target.parentNode.querySelector('.checkboxes');
            // Toggle the "hidden" class, effectively showing/hiding the checkboxes
            checkboxes.classList.toggle('hidden');
        });
    });
});




