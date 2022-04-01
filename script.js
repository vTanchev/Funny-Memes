// api url
const url = "https://api.imgflip.com/get_memes";

// fetch api
const imageData = fetch(url)
  .then((response) => response.json())
  .then((result) => {
    const images = result.data.memes;
    // console.log(images);
    return images;
  });

// localStorage
let savedImagesArr;
if (!localStorage.getItem("savedImagesArr")) {
  savedImagesArr = [];
} else {
  savedImagesArr = JSON.parse(localStorage.getItem("savedImagesArr"));
}

// display on screen
const renderImages = async (images) => {
  const imagesBase = await images;
  const imagesToRender = imagesBase.map((image) => ({
    ...image,
    isLiked: false,
    comments: [],
  }));

  imagesToRender.map((image) => {
    const { name, url } = image;

    const imagesContainer = document.querySelector(".images");

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
    const likeImageBtn = document.createElement("button");
    likeImageBtn.classList.add("like-me");
    likeImageBtn.innerText = "LIKE";
    likeImageBtn.addEventListener("click", (e) => handleLikeBtn(e, image));
    card.appendChild(likeImageBtn);

    // save button
    const saveImageBtn = document.createElement("button");
    const isImageSaved = savedImagesArr.find((img) => img.id === image.id);
    isImageSaved
      ? saveImageBtn.classList.add("save-me", "save-active")
      : saveImageBtn.classList.add("save-me");
    isImageSaved
      ? (saveImageBtn.innerText = "SAVED")
      : (saveImageBtn.innerText = "SAVE");

    saveImageBtn.addEventListener("click", (e) => handleSaveBtn(e, image));

    card.appendChild(saveImageBtn);

    // input za komentar
    const inputComents = document.createElement("input");
    inputComents.classList.add("text");
    inputComents.type = "text";
    inputComents.placeholder = "Add a comment...";

    inputComents.value = "";

    inputComents.addEventListener("keyup", (e) => handleInputKey(e, card));

    card.appendChild(inputComents);

    imagesContainer.appendChild(card);
  });
};

renderImages(imageData);

// liked memes memory function
function handleLikeBtn(e, image) {
  e.preventDefault();

  const likeValue = e.target.innerText;
  console.log("like");

  if (likeValue === "LIKE") {
    image.isLiked = true;
    e.target.innerText = "LIKED";
    e.target.classList.add("like-active");
  } else {
    image.isLiked = false;
    e.target.innerText = "LIKE";
    e.target.classList.remove("like-active");
  }
}

// saved memes memory function
function handleSaveBtn(e, image) {
  e.preventDefault();

  const btnValue = e.target.innerText;

  if (btnValue === "SAVE") {
    const doesExist = savedImagesArr.find((img) => img.id === image.id);
    console.log(doesExist);

    if (!doesExist) {
      console.log(image);
      savedImagesArr.push(image);

      localStorage.setItem("savedImagesArr", JSON.stringify(savedImagesArr));
      e.target.innerText = "SAVED";
      e.target.classList.add("save-active");
    }
  } else {
    savedImagesArr = savedImagesArr.filter((img) => img !== image);
    localStorage.setItem("savedImagesArr", JSON.stringify(savedImagesArr));
    e.target.innerText = "SAVE";
    e.target.classList.remove("save-active");
    console.log(savedImagesArr);
  }
}

let savedImagesPosts = JSON.parse(localStorage.getItem("savedImagesArr"));

// on button Enter print comment
function handleInputKey(e, card) {
  e.preventDefault();
  const value = e.target.value;

  if (e.key === "Enter") {
    const inputResult = document.createElement("p");

    inputResult.classList.add("komentari");
    inputResult.innerText = value;
    card.appendChild(inputResult);
    // console.log(inputResult);
    // console.log(value);
  }
}
