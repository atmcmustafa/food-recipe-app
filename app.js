let input = document.getElementById("input");
let button = document.getElementById("button");
let foodWrapper = document.querySelector(".food-wrapper");
let closeButton = document.querySelector(".exit-btn");
let errorMsg = document.querySelector(".error-msg");

async function getRecipe() {
  let inputVal = input.value.trim();
  const base_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`;

  if (inputVal.length <= 0) {
    errorMsg.innerHTML = `Please enter a valid word.`;
  } else {
    try {
      const response = await fetch(base_url);
      const data = await response.json();
      console.log(data);
      let recipeCards = "";
      data.meals.forEach((meal) => {
        recipeCards += `
          <div class="bg-gray-200 flex flex-col p-4 text-black shadow-2xl rounded-md">
            <img class="rounded-md max-w-xs mx-auto w-full" src="${meal.strMealThumb}" />
            <h2 class="text-center text-xl my-2">${meal.strMeal}</h2>
            <span><b>Area:</b> ${meal.strArea}</span>
            <span><b>Category:</b> ${meal.strCategory}</span>
            <p class="truncate "><b>Method:</b>${meal.strInstructions}</p>
            <a class="view-more px-6 py-2 bg-blue-600 rounded-md text-white font-semibold mt-4 text-center cursor-pointer">
              See Full Recipe
            </a>
          </div>
        `;
        foodWrapper.innerHTML = recipeCards;
        errorMsg.style.display = "none";
      });
    } catch (error) {
      errorMsg.innerHTML = `Please enter a valid word.`;
      errorMsg.style.display = "block";
      foodWrapper.innerHTML = "";
    }
    input.value = "";
  }
}

button.addEventListener("click", getRecipe);

foodWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("view-more")) {
    const parentElement = e.target.parentElement;
    parentElement.classList.toggle("h-fit");
    const paragraph = parentElement.querySelector("p");
    paragraph.classList.toggle("truncate");
    const btn = parentElement.querySelector("a");
    if (paragraph.classList.contains("truncate")) {
      btn.innerHTML = "See Full Recipe";
    } else {
      btn.innerHTML = "See Less";
    }
  }
});
