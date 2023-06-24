const commentArr = [
  {
    userName: "Connor Walton",
    userComment:
      "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it  contains.",
    commentDate: "02/17/2021",
  },
  {
    userName: "Emilie Beach",
    userComment:
      "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one nay of my life I could relive, this would be it. What an incredible day.",
    commentDate: "01/09/2021",
  },
  {
    userName: "Miles Acosta",
    userComment:
      "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough.",
    commentDate: "12/20/2020",
  },
];
const commentArrImg = [
  "../assets/images/Mohan-muruge.jpg",
  "../assets/images/person2.jpg",
  "../assets/images/person4.jpg",
];
const form = document.querySelector(".formSection");
const commentSection = document.querySelector(".commentSection");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let userN = event.target.name.value;

  //define current Date
  let day = new Date().getDate();
  let month = new Date().getMonth() + 1;
  let year = new Date().getFullYear();
  let dateVal = `${day}/${month}/${year}`;

  let commentVal = event.target.comment.value;

  //Alert for incompelete form
  if (!userN || !commentVal) {
    alert(`📣Please fill out all fields! `);
  } else {
    const newComment = {
      userName: userN,
      userComment: commentVal,
      commentDate: dateVal,
    };
    //put new input in array and display comment
    commentArr.unshift(newComment);
    displayComment(commentArr);
    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
  }
  console.log(commentArr);
  //put new comment in array function
});
function displayComment(arr) {
  for (i = 0; i < 3; i++) {
    //creating main section
    let comment = document.createElement("div");
    comment.classList.add("comment");

    //adding image
    let image = document.createElement("img");
    image.classList.add("comment__img");
    image.src = commentArrImg[i];

    //create div wrapper of name and date and p
    let commentTxtWrapper = document.createElement("div");
    commentTxtWrapper.classList.add("comment__TxtWrapper");

    //create div wrapper of Name and date
    let userInfo = document.createElement("div");
    userInfo.classList.add("comment__TxtWrapper--userInfo");

    //create container and add username
    let userName = document.createElement("span");
    userName.classList.add("comment__TxtWrapper--userInfo-userN");
    userName.innerHTML = arr[i].userName;

    //create container and add date
    let date = document.createElement("span");
    date.classList.add("comment__TxtWrapper--userInfo-date");
    date.innerHTML = arr[i].commentDate;

    //create container and add comment
    let usercomment = document.createElement("p");
    usercomment.classList.add("comment__TxtWrapper--p");
    usercomment.innerHTML = arr[i].userComment;

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
}
