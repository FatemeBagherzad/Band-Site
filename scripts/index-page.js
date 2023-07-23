'use strict';
let commentSection = document.querySelector('.commentSection');

//Function to clear parents--------------------------
function clearChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const apiKey = 'b30a6a19-fd69-4da0-b200-91a621e0bac7';
let commentArr = [];

//Get Comments Function------------------------------
const getComments = async function () {
  await axios
    .get('https://project-1-api.herokuapp.com/comments?api_key=' + apiKey)
    .then((result) => {
      commentArr.push(...result.data);
      // for (let i = 0; i < result.data.length; i++) {
      //   displayComment(result.data[i]);
      // }
      for (let i = result.data.length - 1; i > 0; i--) {
        displayComment(result.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getComments();

//Like Comment Function--------------------
async function likeComment(id) {
  await axios
    .put(
      'https://project-1-api.herokuapp.com/comments/' +
        id +
        '/like?api_key=' +
        apiKey
    )
    .then((result) => {
      clearChildren(commentSection);
      // commentSection.innerHTML = '';
      // commentArr = [];
      getComments();
    })
    .catch((error) => console.log(error));
}

//Delete Comments Function
function deleteComments(id) {
  axios
    .delete(
      'https://project-1-api.herokuapp.com/comments/' +
        id +
        '/?api_key=' +
        apiKey
    )
    .then(() => {
      // commentSection.innerHTML = '';
      clearChildren(commentSection);
      getComments();
    });
}

//----------------------------------------

const reactionOnComment = function (commentid) {
  //create icon bar

  const commentIcons = document.createElement('div');
  commentIcons.classList.add('comment__commentIcons');
  //create comment icon
  const commentIconWrapper = document.createElement('div');
  commentIconWrapper.classList.add('comment__commentIcons-wrapper');
  // commentIconWrapper.addEventListener('click', function () {
  //   console.log('Comment Deleted');
  //   deleteComments(commentid);
  // });

  const commentIcon = document.createElement('img');
  commentIcon.setAttribute('src', './assets/icons/SVG/comments2.png');
  commentIcon.classList.add('comment__commentIcons-icon');
  commentIconWrapper.appendChild(commentIcon);
  const commentTxt = document.createElement('span');
  commentTxt.innerText = 'Comment';
  commentIconWrapper.appendChild(commentTxt);

  //create repost icon
  const repostIconWrapper = document.createElement('div');
  repostIconWrapper.classList.add('comment__commentIcons-wrapper');
  repostIconWrapper.setAttribute('id', 'repostm');
  const reposttIcon = document.createElement('img');
  reposttIcon.setAttribute('src', './assets/icons/SVG/repost.png');
  reposttIcon.classList.add('comment__commentIcons-icon');
  repostIconWrapper.appendChild(reposttIcon);
  const repostTxt = document.createElement('span');
  repostTxt.innerText = 'Repost';
  repostIconWrapper.appendChild(repostTxt);
  //create like icon
  const likeIconWrapper = document.createElement('div');
  likeIconWrapper.classList.add('comment__commentIcons-wrapper');
  likeIconWrapper.classList.add('like');
  likeIconWrapper.addEventListener('click', function (event) {
    event.preventDefault();
    console.log('Hi');
    likeComment(commentid);
  });

  const likeIcon = document.createElement('img');
  likeIcon.setAttribute('src', './assets/icons/SVG/like2.png');
  likeIcon.classList.add('comment__commentIcons-icon');
  likeIconWrapper.appendChild(likeIcon);
  const likeTxt = document.createElement('span');
  likeTxt.innerText = 'Like';
  likeIconWrapper.appendChild(likeTxt);
  //create more icon
  const moreIconWrapper = document.createElement('div');
  moreIconWrapper.classList.add('comment__commentIcons-wrapper');
  // moreIconWrapper.setAttribute('id', 'dropUp');

  const moreIcon = document.createElement('img');
  moreIcon.setAttribute('src', './assets/icons/SVG/more.png');
  moreIcon.classList.add('comment__commentIcons-icon');
  moreIconWrapper.appendChild(moreIcon);

  //create more menu
  const dropDn = document.createElement('div');
  dropDn.classList.add('comment__more');
  dropDn.classList.add('container');
  dropDn.classList.add('actOnComment');

  //delet
  const deleteLink = document.createElement('a');
  deleteLink.classList.add('comment__more-item');
  const deleteImg = document.createElement('img');
  deleteImg.setAttribute('src', './assets/icons/SVG/delete.png');
  deleteImg.classList.add('comment__commentIcons-icon');
  deleteLink.appendChild(deleteImg);
  const deleteTxt = document.createElement('span');
  deleteTxt.innerText = 'Delete post';
  deleteLink.addEventListener('click', function () {
    console.log('Comment Deleted');
    deleteComments(commentid);
  });

  deleteLink.appendChild(deleteTxt);

  //Edit
  const editLink = document.createElement('a');
  editLink.classList.add('comment__more-item');
  const editImg = document.createElement('img');
  editImg.setAttribute('src', './assets/icons/SVG/edit.png');
  editImg.classList.add('comment__commentIcons-icon');
  editLink.appendChild(editImg);
  const editTxt = document.createElement('span');
  editTxt.innerText = 'Edit post';
  editLink.appendChild(editTxt);

  //repost
  const repostLink = document.createElement('a');
  repostLink.classList.add('comment__more-item');
  repostLink.setAttribute('id', 'repost');
  const repostImg = document.createElement('img');
  repostImg.setAttribute('src', './assets/icons/SVG/repost.png');
  repostImg.classList.add('comment__commentIcons-icon');
  repostLink.appendChild(repostImg);
  const repostTxt1 = document.createElement('span');
  repostTxt1.innerText = 'Repost';
  repostLink.appendChild(repostTxt1);

  dropDn.appendChild(deleteLink);
  dropDn.appendChild(editLink);
  dropDn.appendChild(repostLink);

  //menu
  moreIconWrapper.addEventListener('click', function (event) {
    event.preventDefault();
    dropDn.classList.toggle('actOnComment');

    console.log(moreIconWrapper);
  });

  commentIcons.appendChild(commentIconWrapper);
  commentIcons.appendChild(repostIconWrapper);
  commentIcons.appendChild(likeIconWrapper);
  commentIcons.appendChild(moreIconWrapper);
  commentIcons.appendChild(dropDn);

  let returns = [commentIcons, likeIconWrapper, moreIconWrapper, dropDn];
  return returns;
};

//add comment created by user to comment section by click
const form = document.querySelector('.formSection');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  let userN = event.target.name.value;
  let day = Math.round(Date.now());
  let commentVal = event.target.comment.value;
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
      likes: 0,
    };

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
        // newComment.id = response.data.id;
        console.log(response.data);
        likeComment(response.data.id);
      })
      .catch((response) => {
        console.log(response);
      });

    //put new input in array and pop one fron end of
    commentArr.unshift(newComment);
    commentArr.pop();

    for (let i = 0; i < commentArr.length; i++) {
      displayComment(commentArr[i]);
    }

    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
  }
});

//Display Comments on page-----------------
function displayComment(obj) {
  //creating main section
  let comment = document.createElement('div');
  comment.classList.add('comment');

  let imgAndTxtContainer = document.createElement('div');
  imgAndTxtContainer.classList.add('comment__imgTxtContainer');

  //adding image
  let image = document.createElement('div');
  image.classList.add('comment__img');

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

  let likeWrapper = document.createElement('span');
  likeWrapper.classList.add('comment__likeCounter');
  let heart = document.createElement('span');
  heart.classList.add('comment__likeCounter-heart');
  heart.innerHTML = '🤍';
  let counterlike = document.createElement('span');
  counterlike.innerText = obj.likes;
  likeWrapper.appendChild(heart);
  likeWrapper.appendChild(counterlike);

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
  comment.appendChild(likeWrapper);
  comment.appendChild(reactionOnComment(obj.id)[0]);
  commentSection.appendChild(comment);
  commentSection.appendChild(hr);
}
