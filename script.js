const moviesContainer = document.querySelector('.movies');
const loaderContainer = document.querySelector('.loader-container');

function renderMovie(data) {
  const html = `
  <article class="movie">
          <img class="movie__img" src=${data.medium_cover_image} />
          <div class="movie__data">
            <h3 class="movie__name">${data.title}</h3>
            <h4 class="movie__genres">Genres: ${data.genres[0]}</h4>
          </div>
          <div class="movie__rating">
          <span class="material-symbols-outlined">star</span>
            <span>${data.rating}/10</span>
          </div>
        </article>
        `;
  moviesContainer.insertAdjacentHTML('beforeend', html);
}

function displayMovies() {
  fetch('https://yts.mx/api/v2/list_movies.json')
    .then((response) => {
      if (!response.ok) throw new Error('Could not find any movies!');
      return response.json();
    })
    .then(({ data }) => {
      console.log(data.movies);
      data.movies.forEach((movie) => renderMovie(movie));
    })
    .finally(() => {
      moviesContainer.style.opacity = 1;
      loaderContainer.style.display = 'none';
    });
}

displayMovies();
