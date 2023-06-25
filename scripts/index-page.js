const commentArr = [
  {
    userName: "Connor Walton",
    commentDate: "02/17/2021",
    imgSrc: "../assets/images/person4.jpg",
    userComment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it  contains.",
  },
  {
    userName: "Emilie Beach",
    commentDate: "01/09/2021",
    imgSrc: "../assets/images/person3.jpg",
    userComment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one nay of my life I could relive, this would be it. What an incredible day.",
  },
  {
    userName: "Miles Acosta",
    commentDate: "12/20/2020",
    imgSrc: "../assets/images/person5.jpg",
    userComment:
      "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
  },
];

const commentArrImg = [
  "../assets/images/Mohan-muruge.jpg",
  "../assets/images/person2.jpg",
  "../assets/images/person4.jpg",
];

/////////////////////////////////////////////////

const form = document.querySelector(".formSection");
let commentSection = document.querySelector(".commentSection");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let userN = event.target.name.value;

  //define current Date
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let dateVal = `${day}/${month}/${year}`;

  let commentVal = event.target.comment.value;

  //removing all previous comments
  let element = document.getElementById("commentSection");

  //Alert for incompelete form
  if (!userN || !commentVal) {
    alert(`📣Please fill out all fields! `);
    document.querySelector(".formSection__form--input").style.borderColor =
      "red";
    return;
  } else {
    element.innerText = "";
    document.querySelector(".formSection__form--input").style.borderColor =
      " #e1e1e1";
    const newComment = {
      userName: userN,
      userComment: commentVal,
      commentDate: dateVal,
    };
    //put new input in array and pop one fron end of
    commentArr.unshift(newComment);
    commentArr.pop();

    for (i = 0; i < commentArr.length; i++) {
      commentArr[i].imgSrc = commentArrImg[i];
      displayComment(commentArr[i]);
    }
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
  }
});

//////////////////////////////////////////////////////
//Function that take an object as parameter and make a comment section
function displayComment(obj) {
  //creating main section
  let comment = document.createElement("div");
  comment.classList.add("comment");

  //adding image
  let image = document.createElement("img");
  image.classList.add("comment__img");
  image.src = obj.imgSrc;

  //create div wrapper of name and date and p
  let commentTxtWrapper = document.createElement("div");
  commentTxtWrapper.classList.add("comment__TxtWrapper");

  //create div wrapper of Name and date
  let userInfo = document.createElement("div");
  userInfo.classList.add("comment__TxtWrapper--userInfo");

  //create container and add username
  let userName = document.createElement("span");
  userName.classList.add("comment__TxtWrapper--userInfo-userN");
  userName.innerHTML = obj.userName;

  //create container and add date
  let date = document.createElement("span");
  date.classList.add("comment__TxtWrapper--userInfo-date");
  date.innerHTML = obj.commentDate;

  //create container and add comment
  let usercomment = document.createElement("p");
  usercomment.classList.add("comment__TxtWrapper--p");
  usercomment.innerHTML = obj.userComment;

  //create line between comments
  let hr = document.createElement("hr");
  hr.classList.add("comment__hr");

  //create whole comment section by adding children

  userInfo.appendChild(userName);
  userInfo.appendChild(date);
  commentTxtWrapper.appendChild(userInfo);
  commentTxtWrapper.appendChild(usercomment);
  comment.appendChild(image);
  comment.appendChild(commentTxtWrapper);
  // commentSection.appendChild(comment);
  commentSection.appendChild(comment);
  commentSection.appendChild(hr);
}
for (i = 0; i < commentArr.length; i++) {
  displayComment(commentArr[i]);
}
