const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieDetails = document.getElementById("movie-details");

searchBtn.addEventListener("click", async () => {
  if (searchInput.value.length > 0) {
    let title = searchInput.value;
    let response = await fetch(
      `http://www.omdbapi.com/?t=${title}&apikey=6dd0c02b`
    );
    if (response.ok) {
      movieDetails.innerHTML = "";
      let json = await response.json();
      let html = `
        <div class="card">
              <div class="card-header">${json.Title}</div>
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <p>Plot - ${json.Plot}</p>
                  <footer class="blockquote-footer">
                  Actors - <cite title="Source Title">${json.Actors}</cite>
                  </footer>
                  <footer class="blockquote-footer">
                  Genre - <cite title="Source Title">${json.Genre}</cite>
                  </footer>
                  <footer class="blockquote-footer">
                  Year - <cite title="Source Title">${json.Year}</cite>
                  </footer>
                  <footer class="blockquote-footer">
                  IMDB Ratings - <cite title="Source Title">${json.imdbRating}</cite>
                  </footer>
                  <footer class="blockquote-footer">
                  Director - <cite title="Source Title">${json.Director}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
        `;
      movieDetails.insertAdjacentHTML("beforeend", html);
      console.log(json);
    }
  }
});
