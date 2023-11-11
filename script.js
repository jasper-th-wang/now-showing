const pageNav = document.getElementById('pageNav');
const pageControl = document.getElementById('paginationControl');

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

    return responseJson.data.movie_count;
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  const paginationControlSize = 10;
  let currentPage = 1;
  // fetch movies data count
  const movieCount = await getMoviesData(1);
  const pageCount = Math.ceil(movieCount / 10);
  // inject first, last buttons
  pageNav.insertAdjacentHTML('afterbegin', makeSpecialBtn('first', 1));
  pageNav.insertAdjacentHTML('beforeend', makeSpecialBtn('last', pageCount));
  // initialize 10 buttons
  renderPageBtns(1, paginationControlSize, pageCount);
  // listens for click to re-render pagination control
  document.addEventListener('click', (e) => {
    currentPage = parseInt(e.target.dataset.page);
    if (e.target.classList.contains('pageBtn')) {
      renderPageBtns(currentPage, paginationControlSize, pageCount);
    }
  });
}

main();
