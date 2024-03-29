'use strict';
const NUMBER_OF_PAGE_NUMBER_BUTTONS = 10;
const NUMBER_OF_MOVIES_PER_PAGE = 10;
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
 * Produce and return a page button, a named button such as "Previous", "First"... etc.
 *
 * @param {Object} an object representing information of a page button
 * @returns
 */
function makeButton({ name, value, isCurrentPage }) {
  return `<button class="${
    isCurrentPage ? 'currentBtn' : ''
  } pageBtn" data-page="${value}">${
    name === 'page' ? value : name.charAt(0).toUpperCase() + name.slice(1)
  }</button>`;
}
/**
 * Render the pagination buttons on the document
 *
 * @param {integer} start - the starting page value
 * @param {integer} maxPageNumber - the max value of the pagination control
 */
function renderPaginationControl(start, maxPageNumber) {
  paginationControlContainer.innerHTML = '';
  let buttons = '';
  for (let i = start; i < start + NUMBER_OF_PAGE_NUMBER_BUTTONS; i++) {
    if (i === start) {
      buttons += makeButton({
        name: 'page',
        value: i,
        isCurrentPage: true,
      });
      continue;
    }

    if (i > maxPageNumber) {
      continue;
    }

    buttons += makeButton({
      name: 'page',
      value: i,
      isCurrentPage: false,
    });
  }

  paginationControlContainer.insertAdjacentHTML('beforeend', buttons);

  if (start > 1) {
    paginationControlContainer.insertAdjacentHTML(
      'afterbegin',
      makeButton({
        name: 'previous',
        value: start - 1,
        isCurrentPage: false,
      })
    );
  }

  if (start < maxPageNumber)
    paginationControlContainer.insertAdjacentHTML(
      'beforeend',
      makeButton({
        name: 'next',
        value: start + 1,
        isCurrentPage: false,
      })
    );
}

/**
 * Render both pagination control and movies on the document
 *
 * @param {integer} currentPage - the value of the current page
 * @param {integer} maxPageNumber - the max value of the pagination control
 */
async function renderPageOfMoviesAndPaginationControl(
  currentPage,
  maxPageNumber
) {
  renderPaginationControl(currentPage, maxPageNumber);
  displayLoadingScreen();

  try {
    let movieData = await getMoviesData(currentPage);
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
async function getMoviesData(page) {
  const response = await fetch(
    `https://yts.mx/api/v2/list_movies.json?page=${page}&limit=${NUMBER_OF_MOVIES_PER_PAGE}`
  );

  if (!response.ok) {
    throw new Error('Something went wrong with the query ⚠, response not OK️');
  }
  const responseJson = await response.json();

  return responseJson.data;
}

/**
 * Get max page number by querying YTS api
 */
async function getMaxPageNumber() {
  const { movie_count } = await getMoviesData(1);
  return Math.ceil(movie_count / 10);
}

/**
 * Initialize page on first page load
 *
 * @param {integer} maxPageNumber - number of pages to display all movies
 */
async function initializePage(maxPageNumber) {
  paginationControlOuterContainer.insertAdjacentHTML(
    'afterbegin',
    makeButton({
      name: 'first',
      value: 1,
      isCurrentPage: false,
    })
  );
  paginationControlOuterContainer.insertAdjacentHTML(
    'beforeend',
    makeButton({
      name: 'last',
      value: maxPageNumber,
      isCurrentPage: false,
    })
  );

  renderPageOfMoviesAndPaginationControl(1, maxPageNumber);
}

/**
 * Initialize all presentation logic and event listeners
 */
async function main() {
  const maxPageNumber = await getMaxPageNumber();
  initializePage(maxPageNumber);

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pageBtn')) {
      renderPageOfMoviesAndPaginationControl(
        parseInt(e.target.dataset.page),
        maxPageNumber
      );
    }
  });
}

main();
