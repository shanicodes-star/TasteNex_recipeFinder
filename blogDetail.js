$(document).ready(function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    $("#blogTitle").text("No Blog Selected");
    return;
  }

  $.getJSON("blogs.json")
    .done(function(data) {
      const blog = data.find(b => b.id == id);
      if (!blog) {
        $("#blogTitle").text("Blog Not Found");
        return;
      }

      $("#blogTitle").text(blog.title);
      $("#blogImg").attr("src", blog.image);
      $("#blogContent").html(blog.content); // content can include HTML
    })
    .fail(function() {
      $("#blogTitle").text("Failed to load blog.");
    });
});
