$(document).ready(function() {
  $.getJSON("blogs.json")
    .done(function(data) {
      const container = $("#blogsContainer");
      container.html("");

      data.forEach(blog => {
        container.append(`
          <div class="col-md-6 col-lg-4 mb-4 ">
            <div class="card h-100 blog-card">
              <img src="${blog.image}" class="card-img-top" alt="${blog.title}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${blog.title}</h5>
                <p class="card-text">${blog.excerpt}</p>
                <a href="blogDetail.html?id=${blog.id}" class="btn btn-outline-primary mt-auto read-more">Read More →</a>
              </div>
            </div>
          </div>
        `);
      });
    })
    .fail(function() {
      $("#blogsContainer").html('<p class="text-danger">Failed to load blogs.</p>');
    });
});
