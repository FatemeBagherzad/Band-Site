const apiKey = 'c7bd8e44-3be0-49cf-b4eb-ba731d775a55';
const bandsiteApi = new BandSiteApi(apiKey);

// fetch comments from database
async function getComments() {
  try {
    let response = await bandsiteApi.getComment();
    let comments = response;
    renderComments(comments);
  } catch (error) {
    console.error('Cannot fetch comments', error);
  }
}

getComments();

// post new comments
async function postNewComment(comment) {
  try {
    await bandsiteApi.postComment(comment);
    getComments();
  } catch (error) {
    console.error('Cannot post comments', error);
  }
}

// create elements
function createAnElement(el, className, textInput) {
  const element = document.createElement(el);
  element.classList.add(className);
  if (textInput != null) {
    element.innerText = textInput;
  }

  return element;
}

// add function to create a comment item
function createComment(comment) {
  const commentSec = document.querySelector('.posted-comments__section');
  const commentCont = createAnElement('section', 'posted-comments__container');
  const commentImgCont = createAnElement(
    'div',
    'posted-comments__img-container',
    'img'
  );
  const commentContentCont = createAnElement(
    'div',
    'posted-comments__content-container'
  );
  const commentTitleCont = createAnElement(
    'div',
    'posted-comments__title-container'
  );
  const commentName = createAnElement(
    'h6',
    'posted-comments__name',
    comment.name
  );
  const commentDate = createAnElement(
    'p',
    'posted-comments__date',
    new Date(comment.timestamp).toLocaleDateString()
  );
  const commentText = createAnElement(
    'p',
    'posted-comments__text',
    comment.comment
  );

  commentSec.appendChild(commentCont);
  commentCont.appendChild(commentImgCont);
  commentCont.appendChild(commentContentCont);
  commentContentCont.appendChild(commentTitleCont);
  commentTitleCont.appendChild(commentName);
  commentTitleCont.appendChild(commentDate);
  commentContentCont.appendChild(commentText);
}

// create function to render new comment and clear exisitng array of posted comments
function renderComments(comments) {
  const commentSec = document.querySelector('.posted-comments__section');
  commentSec.innerHTML = '';
  comments.forEach(createComment);
}

// add function to push new comments at the end of the array
const form = document.getElementById('comments__form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const userName = event.target.userName.value;
  const commentText = event.target.commentText.value;
  const newComment = { name: userName, comment: commentText };

  postNewComment(newComment);

  event.target.elements.userName.value = '';
  event.target.elements.commentText.value = '';
});
