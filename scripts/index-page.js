let commentArr = [];
const APIKey = axios
  .get('https://project-1-api.herokuapp.com/register')
  .then((result) => {
    axios
      .get(
        `https://project-1-api.herokuapp.com/comments?api_key=${result.data.api_key}`
      )
      .then((result1) => {
        commentArr.push(...result1.data);
        console.log(commentArr); //test
        for (i = 0; i < commentArr.length; i++) {
          displayComment(commentArr[i]);
        }
      });
  });

//----------------------------------

const commentArrImg = [
  './assets/images/person1.jpg',
  './assets/images/person2.jpg',
  './assets/images/person3.jpg',
  './assets/images/person4.jpg',
  './assets/images/person5.jpg',
];

/////////////////////////////////////////////////

const form = document.querySelector('.formSection');
let commentSection = document.querySelector('.commentSection');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let userN = event.target.name.value;

  //define current Date
  let day = Math.round(Date.now());

  console.log(day);
  // let month = new Date().getMonth() + 1;
  // let year = new Date().getFullYear();
  // let dateVal = `${day}/${month}/${year}`;

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
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  }
});

//////////////////////////////////////////////////////
//Function that take an object as parameter and make a comment section
function displayComment(obj) {
  //creating main section
  let comment = document.createElement('div');
  comment.classList.add('comment');

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

  //create line between comments
  let hr = document.createElement('hr');
  hr.classList.add('comment__hr');

  //create whole comment section by adding children

  userInfo.appendChild(userName);
  userInfo.appendChild(date);
  commentTxtWrapper.appendChild(userInfo);
  commentTxtWrapper.appendChild(usercomment);
  comment.appendChild(image);
  comment.appendChild(commentTxtWrapper);
  commentSection.appendChild(comment);
  commentSection.appendChild(hr);
}
