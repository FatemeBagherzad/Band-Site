const apiKey = 'f39c7a39-3ffc-45c2-9417-c37bd49c4aa7';
let showsInfo = [];

function getshowdates() {
  axios
    .get('https://project-1-api.herokuapp.com/showdates?api_key=' + apiKey)
    .then((result) => {
      showsInfo.push(...result.data);
      console.log(showsInfo); //test

      for (i = 0; i < showsInfo.length; i++) {
        createConcertData(showsInfo[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getshowdates();

//writing function that create element
let createElement = function (elem, classArr) {
  let element = document.createElement(elem);
  for (item of classArr) {
    element.classList.add(item);
  }
  return element;
};

//----------------------------------------
//select main container-------------------
let shows = document.querySelector('.shows');
let concertContainer = createElement('div', ['shows__data']);
let rowTitle = createElement('ul', [
  'shows__data--row',
  'shows__data--row-title',
]);
//create title row for tablet and desktop
//and append it to container
rowTitle.setAttribute('id', ['shows-desktop']);
let rowTitleDate = createElement('li', []);
rowTitleDate.textContent = 'DATE';
let rowTitlePlace = createElement('li', []);
rowTitlePlace.textContent = 'VENU';
let rowTitleLocation = createElement('li', []);
rowTitleLocation.textContent = 'LOCATION';
let rowTitleBtn = createElement('li', []);
let titleBtn = createElement('button', [
  'shows__data--row-btn',
  'shows__data--row-title-btn',
]);

rowTitleBtn.appendChild(titleBtn);
rowTitle.appendChild(rowTitleDate);
rowTitle.appendChild(rowTitlePlace);
rowTitle.appendChild(rowTitleLocation);
rowTitle.appendChild(rowTitleBtn);
concertContainer.appendChild(rowTitle);

//--------------------------------------------
//function for create comment from API data---
function createConcertData(show) {
  let row = createElement('ul', ['shows__data--row']);
  let mobileTitleDate = createElement('li', [
    'shows__data--row-title',
    'shows-mobile',
  ]);
  mobileTitleDate.textContent = 'DATE';
  let date = createElement('li', ['shows__data--row-boldItem']);
  let dateFormat = new Date(show.date);
  let dateFinalFormat = dateFormat.toDateString();
  date.innerHTML = dateFinalFormat;

  let mobileTitlePlace = createElement('li', [
    'shows__data--row-title',
    'shows-mobile',
  ]);
  mobileTitlePlace.textContent = 'VENU';
  let place = createElement('li', []);
  place.textContent = show.place;
  let mobileTitleLocation = createElement('li', [
    'shows__data--row-title',
    'shows-mobile',
  ]);
  mobileTitleLocation.textContent = 'LOCATION';
  let location = createElement('li', []);
  location.textContent = show.location;
  let rowBtnCotainer = createElement('li', []);
  let rowBtn = createElement('button', ['shows__data--row-btn']);
  rowBtn.textContent = 'BUY TICKET';
  let showHr = createElement('hr', ['shows__data--hr']);

  rowBtnCotainer.appendChild(rowBtn);
  row.appendChild(mobileTitleDate);
  row.appendChild(date);
  row.appendChild(mobileTitlePlace);
  row.appendChild(place);
  row.appendChild(mobileTitleLocation);
  row.appendChild(location);
  row.appendChild(rowBtnCotainer);
  concertContainer.appendChild(row);
  concertContainer.appendChild(showHr);
  shows.appendChild(concertContainer);

  console.log(shows);
}
