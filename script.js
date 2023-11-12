'use strict';
const maxCountOfPageNumberBtns = 10;
const moviesContainer = document.querySelector('.movies');
const loaderContainer = document.querySelector('.loader-container');
const paginationControlOuterContainer = document.getElementById(
  'paginationControlOuter'
);
const paginationControlContainer = document.getElementById('paginationControl');

/**
 * Display loading screen
 */
function displayLoadingScreen() {
  moviesContainer.style.opacity = 0;
  loaderContainer.style.display = 'grid';
}

/**
 * Produce and return one movie card using inputted JSON data
 *
 * @param {JSON object} data - data of one movie formatted in JSON format
 */
function makeMovieCard(data) {
  return `
        <article class="movie">
          <img class="movie__img" src=${data.medium_cover_image} />
          <div class="movie__data">
            <h3 class="movie__name">${data.title}</h3>
            <h4 class="movie__genres">
            Genres: ${data.genres?.[0] || 'Not Sure'}
            </h4>
          </div>
          <div class="movie__rating">
          <span class="material-symbols-outlined">star</span>
            <span>${data.rating}/10</span>
          </div>
        </article>
        `;
}

/**
 * Render Movies using JSON data fetched from YTS api on the document
 *
 * @param {JSON object} movieData - movie data
 */
async function renderPageOfMovies(movieData) {
  moviesContainer.innerHTML = '';
  movieData.movies.forEach((movie) =>
    moviesContainer.insertAdjacentHTML('beforeend', makeMovieCard(movie))
  );
  moviesContainer.style.opacity = 1;
  loaderContainer.style.display = 'none';
}

/**
 * Produce and return a named button such as "Previous", "First"...etc.
 *
 * @param {string} name - the name of the button
 * @param {integer} value - the page value of this button holds
 * @returns a rendered special button
 */
function makeNamedBtnWithValueOf(name, value = 0) {
  return `<button class="pageBtn" id="${name}Btn" data-page="${value}">${
    name.charAt(0).toUpperCase() + name.slice(1)
  }</button>`;
}

/**
 * Produce and return a page button
 *
 * @param {integer} pageNumber - the page value the button represent
 * @param {boolean} current - whether the rendering button represents the current page
 * @returns a rendered page button
 */
function makePageNumberBtn(pageNumber, current = false) {
  const currentClass = current ? 'currentBtn' : '';
  return `<button class="${currentClass} pageBtn"
  id="button${pageNumber}" data-page=${pageNumber}>
  ${pageNumber}
  </button>`;
}

/**
 * Render the pagination buttons on the document
 *
 * @param {integer} start - the starting page value
 * @param {integer} pageSize - the max number of page button in the pagination control
 * @param {integer} pageCount - the max value of the pagination control
 */
function renderPaginationControl(start, pageSize, pageCount) {
  paginationControlContainer.innerHTML = '';
  let buttons = '';
  for (let i = start; i < start + pageSize; i++) {
    if (i === start) {
      buttons += makePageNumberBtn(i, true);
      continue;
    }

    if (i > pageCount) {
      continue;
    }

    buttons += makePageNumberBtn(i);
  }

  paginationControlContainer.insertAdjacentHTML('beforeend', buttons);

  if (start > 1) {
    paginationControlContainer.insertAdjacentHTML(
      'afterbegin',
      makeNamedBtnWithValueOf('Previous', start - 1)
    );
  }

  if (start < pageCount)
    paginationControlContainer.insertAdjacentHTML(
      'beforeend',
      makeNamedBtnWithValueOf('Next', start + 1)
    );
}

/**
 * Render both pagination control and movies on the document
 *
 * @param {integer} page - the value of the current page
 * @param {integer} paginationSize - the max number of page button in the pagination control
 * @param {integer} maxPageCount - the max value of the pagination control
 */
async function renderPageOfMoviesAndPaginationControl(
  page,
  paginationSize = 10,
  maxPageCount
) {
  renderPaginationControl(page, paginationSize, maxPageCount);
  displayLoadingScreen();

  try {
    let movieData = await getMoviesData(page, paginationSize);
    renderPageOfMovies(movieData);
  } catch (error) {
    console.error('Something wen wrong here!' + error);
    moviesContainer.style.opacity = 1;
    loaderContainer.style.display = 'none';
    moviesContainer.innerHTML = `<p style="margin: 0 auto;">Something went wrong, please check your internet connection and try again!</p>`;
  }
}

/**
 * Fetch movie data from the YTS api
 *
 * @param {integer} page - the page number for the get request
 * @param {integer} itemLimit - the limit of how many movies to fetch in one request
 * @returns the fetched data formatted as a JSON object
 */
async function getMoviesData(page, itemLimit = 10) {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=${itemLimit}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong with the query ⚠,  response not OK️');
  }
  const responseJson = await response.json();

  return responseJson.data;
}

/**
 * Get max page count by querying YTS api
 */
async function getMaxPageCount() {
  const initMovieData = await getMoviesData(1);
  return Math.ceil(initMovieData.movie_count / 10);
}

/**
 * Initialize page on first page load
 *
 * @param {integer} maxPageCount - number of pages to display all movies
 */
async function initFirstPageOfMoviesAndPaginationControl(maxPageCount) {
  paginationControlOuterContainer.insertAdjacentHTML(
    'afterbegin',
    makeNamedBtnWithValueOf('first', 1)
  );
  paginationControlOuterContainer.insertAdjacentHTML(
    'beforeend',
    makeNamedBtnWithValueOf('last', maxPageCount)
  );

  renderPageOfMoviesAndPaginationControl(
    1,
    maxCountOfPageNumberBtns,
    maxPageCount
  );
}

/**
 * Initialize all presentation logic and event listeners
 */
async function main() {
  const maxPageCount = await getMaxPageCount();
  initFirstPageOfMoviesAndPaginationControl(maxPageCount);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pageBtn')) {
      renderPageOfMoviesAndPaginationControl(
        parseInt(e.target.dataset.page),
        maxCountOfPageNumberBtns,
        maxPageCount
      );
    }
  });
}

main();
