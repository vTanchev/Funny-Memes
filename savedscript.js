const savedPosts = JSON.parse(localStorage.getItem("savedImagesArr"));

// localStorage
let savedImagesArr;
if (!localStorage.getItem("savedImagesArr")) {
  savedImagesArr = [];
} else {
  savedImagesArr = JSON.parse(localStorage.getItem("savedImagesArr"));
}

const render2Images = () => {
  savedPosts.map((image) => {
    const { name, url } = image;

    const imagesContainer = document.querySelector(".saved-link");

    // create card
    const card = document.createElement("div");
    card.classList.add("card");

    // create title
    const nameTitle = document.createElement("h3");
    nameTitle.classList.add("meme-title");
    nameTitle.innerText = name;

    card.appendChild(nameTitle);

    // create img element
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = url;
    card.appendChild(img);

    // like button
    console.log(image);
    const likeImageBtn = document.createElement("button");
    image.isLiked === true
      ? likeImageBtn.classList.add("like-me", "like-active")
      : likeImageBtn.classList.add("like-me");
    likeImageBtn.innerText = image.isLiked === true ? "LIKED" : "LIKE";
    likeImageBtn.addEventListener("click", (e) => handleLikeBtn(e));
    card.appendChild(likeImageBtn);

    // save button
    const saveImageBtn = document.createElement("button");
    saveImageBtn.classList.add("save-me", "save-active");
    saveImageBtn.innerText = "SAVED";
    saveImageBtn.addEventListener("click", (e) => handleSaveBtn(e, image));

    card.appendChild(saveImageBtn);

    // div koj treba da fleze komentar
    const commentsImg = document.createElement("div");
    commentsImg.classList.add("comments");

    card.appendChild(commentsImg);

    imagesContainer.appendChild(card);
  });
};
render2Images(savedPosts);
