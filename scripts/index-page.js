const apiKey = 'f39c7a39-3ffc-45c2-9417-c37bd49c4aa7';
let commentArr = [];

function getComments() {
  axios
    .get('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey)
    .then((result) => {
      commentArr.push(...result.data);
      for (i = 0; i < commentArr.length; i++) {
        displayComment(commentArr[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
getComments();

//----------------------------------

const commentArrImg = [
  './assets/images/person1.jpg',
  './assets/images/person2.jpg',
  './assets/images/person3.jpg',
  './assets/images/person4.jpg',
  './assets/images/person5.jpg',
];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////🟨Add comment by click🟨//////////////
/////////////////////////////////////////////////
//add comment created by user to comment section by click
const form = document.querySelector('.formSection');
let commentSection = document.querySelector('.commentSection');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let userN = event.target.name.value;

  //define current Date
  let day = Math.round(Date.now());
  let commentVal = event.target.comment.value;
  //removing all previous comments
  let element = document.getElementById('commentSection');
  //Alert for incompelete form
  if (!userN || !commentVal) {
    alert(`📣Please fill out all fields! `);
    document.querySelector('.formSection__form--input').style.borderColor =
      'red';
    return;
  } else {
    element.innerText = '';
    document.querySelector('.formSection__form--input').style.borderColor =
      ' #e1e1e1';
    const newComment = {
      name: userN,
      comment: commentVal,
      timestamp: day,
    };
    //put new input in array and pop one fron end of
    commentArr.unshift(newComment);
    commentArr.pop();

    for (i = 0; i < commentArr.length; i++) {
      commentArr[i].imgSrc = commentArrImg[i];
      displayComment(commentArr[i]);
    }

    axios
      .post(
        'https://project-1-api.herokuapp.com/comments?api_key=' + apiKey,
        {
          name: userN,
          comment: commentVal,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response);
      });

    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  }
});

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
///////////🟨make comment by function🟨//////////////
//////////////////////////////////////////////////////
//Function that take an object as parameter and make a comment section
function displayComment(obj) {
  //creating main section
  let comment = document.createElement('div');
  comment.classList.add('comment');

  let imgAndTxtContainer = document.createElement('div');
  imgAndTxtContainer.classList.add('comment__imgTxtContainer');

  //adding image
  let image = document.createElement('img');
  image.classList.add('comment__img');
  image.src = commentArrImg[Math.trunc(Math.random() * 3)];

  //create div wrapper of name and date and p
  let commentTxtWrapper = document.createElement('div');
  commentTxtWrapper.classList.add('comment__TxtWrapper');

  //create div wrapper of Name and date
  let userInfo = document.createElement('div');
  userInfo.classList.add('comment__TxtWrapper--userInfo');

  //create container and add username
  let userName = document.createElement('span');
  userName.classList.add('comment__TxtWrapper--userInfo-userN');
  userName.innerHTML = obj.name;

  //create container and add date
  let date = document.createElement('span');
  date.classList.add('comment__TxtWrapper--userInfo-date');
  let dateFormat = new Date(obj.timestamp);
  let dateFinalFormat =
    dateFormat.getDate() +
    '/' +
    (dateFormat.getMonth() + 1) +
    '/' +
    dateFormat.getFullYear();
  date.innerHTML = dateFinalFormat;

  //create container and add comment
  let usercomment = document.createElement('p');
  usercomment.classList.add('comment__TxtWrapper--p');
  usercomment.innerHTML = obj.comment;

  //create like and dislke Button
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  //////////🧡create like SVG🧡//////////////////
  /////////////////////////////////////////////////
  //create likeAndDislikeConainer

  //1-create like SVG
  let svgLike = document.createElement('svg'); //Get svg element
  svgLike.setAttribute('viewBox', '0 0 24 24');
  svgLike.classList.add('comment__likeIcon-svg');
  let newElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  newElement.setAttribute(
    'd',
    'M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384'
  );
  svgLike.appendChild(newElement);
  //2-create dislike SVG
  let svgdisLike = document.createElement('svg'); //Get svg element
  svgdisLike.setAttribute('viewBox', '0 0 24 24');
  svgdisLike.classList.add('comment__likeIcon-svg');
  let newElement1 = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );
  newElement1.setAttribute(
    'd',
    'M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
  );
  svgdisLike.appendChild(newElement1);
  //3-create container of Like and Dislike
  let likeAndDislikeConainer = document.createElement('div');
  likeAndDislikeConainer.classList.add('comment__likeIcon');

  let likeContainer = document.createElement('div');
  likeContainer.classList.add('comment__likeIcon-like');

  let dislikeContainer = document.createElement('div');
  dislikeContainer.classList.add('comment__likeIcon-dislike');

  likeAndDislikeConainer.appendChild(likeContainer);
  likeContainer.appendChild(svgLike);

  likeAndDislikeConainer.appendChild(dislikeContainer);
  dislikeContainer.appendChild(svgdisLike);

  //create line between comments
  let hr = document.createElement('hr');
  hr.classList.add('comment__hr');

  //create whole comment section by adding children

  userInfo.appendChild(userName);
  userInfo.appendChild(date);
  commentTxtWrapper.appendChild(userInfo);
  commentTxtWrapper.appendChild(usercomment);
  imgAndTxtContainer.appendChild(image);
  imgAndTxtContainer.appendChild(commentTxtWrapper);
  comment.appendChild(imgAndTxtContainer);
  comment.appendChild(likeAndDislikeConainer);
  commentSection.appendChild(comment);
  commentSection.appendChild(hr);
  // console.log(comment);
}
