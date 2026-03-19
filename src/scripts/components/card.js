const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const createCardElement = (
  data,
  { onPreviewPicture, onLikeIcon, onDeleteCard, onInfoClick },
  currentUserId
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const infoButton = cardElement.querySelector(".card__control-button_type_info");
  const cardImage = cardElement.querySelector(".card__image");
  const likeCounter = cardElement.querySelector(".card__like-count");
  
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  
  if (likeCounter && data.likes) {
    likeCounter.textContent = data.likes.length;
  }
  
  if (data.likes && currentUserId) {
    const isLiked = data.likes.some(user => user._id === currentUserId);
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }
  
  if (data.owner && currentUserId) {
    if (data.owner._id !== currentUserId) {
      deleteButton.remove();
    } else {
      if (onDeleteCard) {
        deleteButton.addEventListener("click", () => onDeleteCard(data._id, cardElement));
      }
    }
  } else {
    if (onDeleteCard) {
      deleteButton.addEventListener("click", () => onDeleteCard(data._id, cardElement));
    }
  }

  if (onInfoClick) {
    infoButton.addEventListener("click", () => onInfoClick(data._id));
  }

  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(data._id, likeButton, likeCounter));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({
      name: data.name, 
      link: data.link
    }));
  }

  return cardElement;
};