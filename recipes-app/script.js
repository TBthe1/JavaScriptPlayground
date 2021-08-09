const meals = document.getElementById('meals');
const favoriteContainer = document.getElementById('fav-meals');

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    addMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term)
}

function addMeal(mealData, random = false) {

    console.log(mealData);

    const meal = document.createElement('div'); 
    meal.classList.add('meal');

    meal.innerHTML = `
            <div class="meal-header">
                ${random ? `
                <span class="random">
                    Random Recipe
                </span>` : ''}
                <img 
                    src="${mealData.strMealThumb}"
                    alt="${mealData.strMeal}"
                >
            </div>
            <div class="meal-body">
                <h4>${mealData.strMeal}</h4>
                <button class="fav-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                </button>
            </div>
    `;

    const btn = meal.querySelector('.meal-body .fav-btn');

    btn.addEventListener("click", (e) => {
        if(btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        
        fetchFavMeals();
    });

    meals.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify
    ([...mealIds, mealId]));
}

function removeMealLS(mealId) {
    const mealIds = getMealsLS();

    localStorage.setItem('mealIds', JSON.stringify
    (mealIds.filter(id => id !== mealId)));
}

function getMealsLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {
    const mealIds = getMealsLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealById(mealId);

        addMealFav(meal);
        
    }
}

function addMealFav(mealData) {

    favoriteContainer.innerHTML = '';

    const favMeal = document.createElement('li'); 

    favMeal.innerHTML = `
        <img 
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        >
        <span>${mealData.strMeal}</span>
        <button class="clear">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
    `;

    const btn = favMeal.querySelector(".clear");

    btn.addEventListener('click', () => {
        removeMealLS(mealData.idMeal);
    });

    favoriteContainer.appendChild(favMeal);
}

{
	"compilerOptions":  {
        "target": "esnext"
    }
}
