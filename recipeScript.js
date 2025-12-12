$(document).ready(function() {
  const apiBase = "https://www.themealdb.com/api/json/v1/1/";
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    $("#recipeTitle").text("No Recipe Selected");
    return;
  }

  $.getJSON(apiBase + "lookup.php?i=" + id)
    .done(function(data) {
      const meal = data.meals[0];
      $("#recipeTitle").text(meal.strMeal);
      $("#recipeImg").attr("src", meal.strMealThumb);

      $("#ingredientList").html('');
      for (let i = 1; i <= 20; i++) {
        const ing = meal["strIngredient" + i];
        const measure = meal["strMeasure" + i];
        if (ing && ing.trim() !== "") {
          $("#ingredientList").append(`<li>${ing} - ${measure}</li>`);
        }
      }

      $("#instructionsText").text(meal.strInstructions);
    });
});
