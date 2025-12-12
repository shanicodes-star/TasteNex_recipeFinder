$(document).ready(function() {
  const apiBase = "https://www.themealdb.com/api/json/v1/1/";

  // Load Categories
  $.getJSON(apiBase + "list.php?c=list")
    .done(function(data) {
      data.meals.forEach(cat => {
        $('#categoryFilter').append(`<option value="${cat.strCategory}">${cat.strCategory}</option>`);
      });
    });

  // Load Areas / Cuisines
  $.getJSON(apiBase + "list.php?a=list")
    .done(function(data) {
      data.meals.forEach(area => {
        $('#areaFilter').append(`<option value="${area.strArea}">${area.strArea}</option>`);
      });
    });

  // Functions
  function renderRecipes(recipes) {
    $('#recipeResults').html('');
    recipes.forEach(meal => {
      $('#recipeResults').append(`
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${meal.strMeal}</h5>
              <button class="btn btn-warning mt-auto view-btn" data-id="${meal.idMeal}">View Recipe</button>
            </div>
          </div>
        </div>
      `);
    });
  }

  function searchRecipes(query) {
    $.getJSON(apiBase + "search.php?s=" + query)
      .done(function(data) {
        if (data.meals) renderRecipes(data.meals);
        else $('#recipeResults').html('<p class="text-danger">No recipes found.</p>');
      });
  }

  function filterRecipes(type, value) {
    $.getJSON(apiBase + `filter.php?${type}=${value}`)
      .done(function(data) {
        if (data.meals) renderRecipes(data.meals);
        else $('#recipeResults').html('<p class="text-danger">No recipes found.</p>');
      });
  }

  // Event Listeners
  $('#searchBtn').click(function() {
    const query = $('#searchInput').val().trim();
    if(query) searchRecipes(query);
  });

  $('#categoryFilter').change(function() {
    const cat = $(this).val();
    if(cat) filterRecipes("c", cat);
  });

  $('#areaFilter').change(function() {
    const area = $(this).val();
    if(area) filterRecipes("a", area);
  });

  // Redirect to recipe.html
  $(document).on('click', '.view-btn', function() {
    const id = $(this).data('id');
    window.location.href = `recipe.html?id=${id}`;
  });

  // Load default recipes
  searchRecipes("chicken");
});
