let showsInfo = [
  {
    date: 'Mon Sept 06 2021',
    venu: 'Ronald Lane',
    location: 'SanFrancisco, CA',
  },
  {
    date: 'Tue Sept 21 2021',
    venu: 'Pier 3 East',
    location: 'SanFrancisco, CA',
  },
  {
    date: 'Fri Oct 15 2021',
    venu: 'View Lounge',
    location: 'SanFrancisco, CA',
  },
  {
    date: 'Sat Nov 06 2021',
    venu: 'Hyatt Agency',
    location: 'SanFrancisco, CA',
  },
  {
    date: 'Fri Nov 26 2021',
    venu: 'Moscow Center',
    location: 'SanFrancisco, CA',
  },
  {
    date: 'Wed Dec 15 2021',
    venu: 'Press Club',
    location: 'SanFrancisco, CA',
  },
];

//writing function that create element
let createElement = function (elem, classArr) {
  let element = document.createElement(elem);
  for (item of classArr) {
    element.classList.add(item);
  }
  return element;
};

//creating top parents
let shows = document.querySelector('.shows');
let header = document.querySelector('.shows__header');
let tableWrapper = document.querySelector('.shows__tableWrapper');

//-----------------------------------
//mobile
//-----------------------------------
let tableMobile = createElement('table', ['shows__table']);
tableMobile.setAttribute('id', 'mobileTable');

tableWrapper.appendChild(tableMobile);

let concertInfo = function (arr) {
  for (i = 0; i < arr.length; i++) {
    let dateTitle = createElement('div', ['shows__table--title']);
    dateTitle.innerHTML = 'DATE';
    let dateM = createElement('div', [
      'shows__table--item',
      'shows__table--item-boldItem',
    ]);
    dateM.innerHTML = arr[i].date;
    let venuTitle = createElement('div', ['shows__table--title']);
    venuTitle.innerHTML = 'VENU';
    let venuM = createElement('div', ['shows__table--item']);
    venuM.innerHTML = arr[i].venu;
    let locationTitle = createElement('div', ['shows__table--title']);
    locationTitle.innerHTML = 'LOCATION';
    let locationM = createElement('div', ['shows__table--item']);
    locationM.innerHTML = arr[i].location;
    let ticketBtn = createElement('button', ['shows__table--btn']);
    ticketBtn.innerHTML = 'BUY TICKET';
    let hr = createElement('hr', ['shows__table--hr']);

    tableMobile.appendChild(dateTitle);
    tableMobile.appendChild(dateM);
    tableMobile.appendChild(venuTitle);
    tableMobile.appendChild(venuM);
    tableMobile.appendChild(locationTitle);
    tableMobile.appendChild(locationM);
    tableMobile.appendChild(ticketBtn);
    tableMobile.appendChild(hr);
  }
};

concertInfo(showsInfo);

//-----------------------------------
//Desktop and Tablet
//-----------------------------------
let desktopTable = createElement('section', ['shows__table']);
desktopTable.setAttribute('id', 'tabletDesktopTable');

tableWrapper.appendChild(desktopTable);

let titleWrapperDesktop = createElement('div', ['tableLayout']);

let dateTitle = createElement('div', ['shows__table--title']);
dateTitle.innerHTML = 'DATE';
let venuTitle = createElement('div', ['shows__table--title']);
venuTitle.innerHTML = 'VENU';
let locationTitle = createElement('div', ['shows__table--title']);
locationTitle.innerHTML = 'LOCATION';
let emptyTitle = createElement('div', [
  'shows__table--title',
  'tabletitlehidden',
]);

titleWrapperDesktop.appendChild(dateTitle);
titleWrapperDesktop.appendChild(venuTitle);
titleWrapperDesktop.appendChild(locationTitle);
titleWrapperDesktop.appendChild(emptyTitle);
desktopTable.appendChild(titleWrapperDesktop);

let concertInfoWrapper = createElement('div', [
  'shows__table--border',
  'tableLayout',
]);

showsInfo.forEach(function (show) {
  let row = createElement('div', ['tableLayout', 'shows__table--border']);
  let concertDate = createElement('div', [
    'shows__table--item',
    'shows__table--item-boldItem',
  ]);
  concertDate.innerHTML = show.date;
  let concertVenu = createElement('div', ['shows__table--item']);
  concertVenu.innerHTML = show.venu;
  let concertLocation = createElement('div', ['shows__table--item']);
  concertLocation.innerHTML = show.location;
  let divBtn = createElement('div', []);
  let concertTicket = createElement('button', ['shows__table--btn']);
  concertTicket.textContent = 'BUY TICKET';
  divBtn.appendChild(concertTicket);
  let hr = createElement('hr', ['shows__table--hr']);

  row.appendChild(concertDate);
  row.appendChild(concertVenu);
  row.appendChild(concertLocation);
  row.appendChild(divBtn);
  row.appendChild(hr);

  concertInfoWrapper.appendChild(row);
});
console.log(showsInfo);
desktopTable.appendChild(concertInfoWrapper);
