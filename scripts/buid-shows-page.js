if (screen.width < 768) {
  console.log("kkkkkkkkk");
} else {
  console.log("ddddddddddddd");
}
let shows = [
  {
    date: "Mon Sept 06 2021",
    venu: "Ronald Lane",
    location: "SanFrancisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venu: "Pier 3 East",
    location: "SanFrancisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venu: "View Lounge",
    location: "SanFrancisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venu: "Hyatt Agency",
    location: "SanFrancisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venu: "Moscow Center",
    location: "SanFrancisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venu: "Press Club",
    location: "SanFrancisco, CA",
  },
];

let showsTable = document.querySelector(".shows__table");

//writing function that create element

for (i = 0; i < shows.length; i++) {}

let createElement = function (elem, arr) {
  let element = document.createElement("elem");
  element.classList.add(arr);
  console.log(element);
  return element;
};

//creating all element of show section
let topRowDate = createElement("span", [
  "shows__table--title",
  "rowTitle",
  "dateTitle",
]);
let topRowVenu = createElement("span", [
  "shows__table--title",
  "rowTitle",
  "venuTitle",
]);
let TopRowLocation = createElement("span", [
  "shows__table--title",
  "rowTitle",
  "locationTitle",
]);
let dateTitle = createElement("span", [
  "shows__table--title",
  "innerTitle",
  "dateTitle",
]);
let date = createElement("span", ["shows__table--item", "date"]);
let venuTitle = createElement("span", [
  "shows__table--title",
  "innerTitle",
  "venuTitle",
]);
let venu = createElement("span", ["shows__table--item venu"]);
let locationTitle = createElement("span", [
  "shows__table--title",
  "innerTitle",
  "locationTitle",
]);
let location = createElement("span", ["shows__table--item", "location"]);
let ticket = createElement("button", ["shows__table--btn", "ticket"]);
let hr = createElement("hr", ["shows__table--hr", "hrShow"]);

//appending children to paret section
if (screen.width < 768) {
  showsTable;
}
