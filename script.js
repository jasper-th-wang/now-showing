const moviesContainer = document.querySelector('.movies');
const loaderContainer = document.querySelector('.loader-container');
const pageNav = document.getElementById('pageNav');
const pageControl = document.getElementById('paginationControl');

/**
 * Render one movie using JSON data fetched from YTS api
 *
 * @param {JSON object} data - data of one movie formatted in JSON format
 */
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

/**
 * Display Movies using JSON data fetched from YTS api
 *
 * @param {JSON object} movieData - movie data
 */
async function displayMovies(movieData) {
  moviesContainer.innerHTML = '';
  movieData.movies.forEach((movie) => renderMovie(movie));
  moviesContainer.style.opacity = 1;
  loaderContainer.style.display = 'none';
}

/**
 * Display loading screen
 */
function displayLoad() {
  moviesContainer.style.opacity = 0;
  loaderContainer.style.display = 'grid';
}

/**
 * Render a special button such as "Previous", "First"...etc.
 *
 * @param {string} name - the name of the button
 * @param {integer} value - the page value of this button holds
 * @returns a rendered special button
 */
function makeSpecialBtn(name, value = 0) {
  return `<button class="pageBtn" id="${name}Btn" data-page="${value}">${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</button>`;
}

/**
 * Render a page button
 *
 * @param {integer} pageNumber - the page value the button represent
 * @param {boolean} current - whether the rendering button represents the current page
 * @returns a rendered page button
 */
function makePageBtn(pageNumber, current = false) {
  const currentClass = current ? 'currentBtn' : '';
  return `<button class="${currentClass} pageBtn"
  id="button${pageNumber}" data-page=${pageNumber}>
  ${pageNumber}
  </button>`;
}

/**
 * Render the pagination buttons
 *
 * @param {integer} start - the starting page value
 * @param {integer} pageSize - the max number of page button in the pagination control
 * @param {*} pageCount - the max value of the pagination control
 */
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

/**
 * Render both pagination control and movies
 *
 * @param {integer} page - the value of the current page
 * @param {*} paginationSize - the max number of page button in the pagination control
 * @param {*} maxPageCount - the max value of the pagination control
 */
async function renderPage(page, paginationSize = 10, maxPageCount) {
  renderPageBtns(page, paginationSize, maxPageCount);
  displayLoad();
  let movieData = await getMoviesData(page, paginationSize);
  displayMovies(movieData);
}

/**
 * Fetch movie data from the YTS api
 *
 * @param {integer} page - the page number for the get request
 * @param {integer} itemLimit - the limit of how many movies to fetch in one request
 * @returns the fetched data formatted as a JSON object
 */
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

/**
 * Initialize presentation logic and event listeners
 */
async function main() {
  const paginationControlSize = 10;

  // fetch movies data count
  const initMovieData = await getMoviesData(1);
  const pageCount = Math.ceil(initMovieData.movie_count / 10);

  // inject first, last buttons
  pageNav.insertAdjacentHTML('afterbegin', makeSpecialBtn('first', 1));
  pageNav.insertAdjacentHTML('beforeend', makeSpecialBtn('last', pageCount));

  // initialize pagination controls and movies
  renderPage(1, paginationControlSize, pageCount);

  // listens for click to re-render pagination control
  document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('pageBtn')) {
      renderPage(
        parseInt(e.target.dataset.page),
        paginationControlSize,
        pageCount
      );
    }
  });
}

main();
