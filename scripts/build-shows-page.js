const apiKey = 'c7bd8e44-3be0-49cf-b4eb-ba731d775a55';
const bandsiteApi = new BandSiteApi(apiKey);

// fetch shows from db
async function getShows() {
  try {
    let response = await bandsiteApi.getShow();
    let shows = response;
    renderShow(shows);
  } catch (error) {
    console.error('Cannot fetch shows', error);
  }
}

getShows();

// create elements using function
function createAnElement(el, className, textInput) {
  const element = document.createElement(el);
  element.classList.add(className);
  if (textInput != null) {
    element.innerText = textInput;
  }
  return element;
}

// create shows using function
function createShow(show) {
  const showList = document.querySelector('.shows__list');
  const showItem = createAnElement('li', 'shows__item');
  const showDate = createAnElement(
    'p',
    'shows__item-date',
    new Date(show.date)
      .toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
      .replace(/,/g, '')
      .replace('Sep', 'Sept')
  );
  const showVenue = createAnElement('p', 'shows__item-venue', show.place);
  const showLoc = createAnElement('p', 'shows__item-location', show.location);
  const buyBtn = createAnElement('button', 'shows__btn', 'BUY TICKETS');

  showList.appendChild(showItem);
  showItem.appendChild(showDate);
  showItem.appendChild(showVenue);
  showItem.appendChild(showLoc);
  showItem.appendChild(buyBtn);

  showItem.addEventListener('click', selectShow);
}

// create function to render array of shows
function renderShow(shows) {
  shows.forEach((show) => {
    createShow(show);
  });
}

// function for changing selected state colour
function selectShow(event) {
  let items = document.querySelectorAll('li.shows__item');
  items.forEach((element) => {
    if (element.classList.contains('shows__item--active')) {
      element.classList.remove('shows__item--active');
    }
  });
  event.currentTarget.classList.add('shows__item--active');
}
