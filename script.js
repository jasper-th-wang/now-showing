const moviesContainer = document.querySelector('.movies');
const loaderContainer = document.querySelector('.loader-container');
const pageNav = document.getElementById('pageNav');
const pageControl = document.getElementById('paginationControl');

function renderMovie(data) {
  const html = `
  <article class="movie">
          <img class="movie__img" src=${data.medium_cover_image} />
          <div class="movie__data">
            <h3 class="movie__name">${data.title}</h3>
            <h4 class="movie__genres">Genres: ${
              data.genres?.[0] || 'Not Sure'
            }</h4>
          </div>
          <div class="movie__rating">
          <span class="material-symbols-outlined">star</span>
            <span>${data.rating}/10</span>
          </div>
        </article>
        `;
  moviesContainer.insertAdjacentHTML('beforeend', html);
}

// function displayMovies() {
//   fetch('https://yts.mx/api/v2/list_movies.json')
//     .then((response) => {
//       if (!response.ok) throw new Error('Could not find any movies!');
//       return response.json();
//     })
//     .then(({ data }) => {
//       console.log(data.movies);
//       data.movies.forEach((movie) => renderMovie(movie));
//     })
//     .finally(() => {
//       moviesContainer.style.opacity = 1;
//       loaderContainer.style.display = 'none';
//     });
// }
async function displayMovies(movieData) {
  moviesContainer.innerHTML = '';
  movieData.movies.forEach((movie) => renderMovie(movie));
  moviesContainer.style.opacity = 1;
  loaderContainer.style.display = 'none';
}

function displayLoad() {
  moviesContainer.style.opacity = 0;
  loaderContainer.style.display = 'grid';
}

function makeSpecialBtn(name, value = 0) {
  return `<button class="pageBtn" id="${name}Btn" data-page="${value}">${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</button>`;
}

function makePageBtn(pageNumber, current = false) {
  const currentClass = current ? 'currentBtn' : '';
  return `<button class="${currentClass} pageBtn"
  id="button${pageNumber}" data-page=${pageNumber}>
  ${pageNumber}
  </button>`;
}

function renderPageBtns(start, pageSize, pageCount) {
  // Clear the content in pageControl container
  pageControl.innerHTML = '';
  let buttons = '';
  for (let i = start; i < start + pageSize; i++) {
    if (i === start) {
      buttons += makePageBtn(i, true);
      continue;
    }

    if (i > pageCount) {
      continue;
    }

    buttons += makePageBtn(i);
  }

  pageControl.insertAdjacentHTML('beforeend', buttons);

  if (start > 1) {
    pageControl.insertAdjacentHTML(
      'afterbegin',
      makeSpecialBtn('Previous', start - 1)
    );
  }

  if (start < pageCount)
    pageControl.insertAdjacentHTML(
      'beforeend',
      makeSpecialBtn('Next', start + 1)
    );
}

async function getMoviesData(page, itemLimit = 10) {
  try {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=${itemLimit}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong with the query ⚠️');
    }
    const responseJson = await response.json();

    return responseJson.data;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const paginationControlSize = 10;
  let currentPage = 1;
  // fetch movies data count
  const initMovieData = await getMoviesData(1);
  const movieCount = initMovieData.movie_count;
  const pageCount = Math.ceil(movieCount / 10);
  // inject first, last buttons
  pageNav.insertAdjacentHTML('afterbegin', makeSpecialBtn('first', 1));
  pageNav.insertAdjacentHTML('beforeend', makeSpecialBtn('last', pageCount));
  // initialize 10 buttons
  renderPageBtns(1, paginationControlSize, pageCount);
  // listens for click to re-render pagination control
  document.addEventListener('click', async (e) => {
    currentPage = parseInt(e.target.dataset.page);
    if (e.target.classList.contains('pageBtn')) {
      renderPageBtns(currentPage, paginationControlSize, pageCount);
      displayLoad();
      let movieData = await getMoviesData(currentPage, paginationControlSize);
      console.log(movieData);
      displayMovies(movieData);
    }
  });

  displayMovies(initMovieData);
}

main();
