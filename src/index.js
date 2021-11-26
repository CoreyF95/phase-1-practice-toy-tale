let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toys();
  appendNewToy();
});

function renderToys(toy) {
  let card = document.createElement("div")
  let collection = document.getElementById("toy-collection");
  let picture = document.createElement("img");
  let likes = document.createElement("p");
  let liker = document.createElement("button");
  liker.className = "like-btn";
  liker.id = toy.id;
  liker.textContent = "Like"
  likes.textContent = `${toy.likes} Likes`;
  likes.className = "like"
  picture.src = toy.image;
  picture.className = "toy-avatar";
  card.className = "card";
  card.textContent = toy.name;
  collection.appendChild(card);
  card.appendChild(picture);
  card.appendChild(likes);
  card.appendChild(liker);
  liker.addEventListener("click", () => {
    fetch(url = `http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${toy.likes++}`
      })
    })
    likes.textContent = `${toy.likes} Likes`
  })

}
const toyName =   `${document.getElementsByClassName("input-text")[0].value}`
const toyImage = `${document.getElementsByClassName("input-text")[1].value}`

function newToy() {
  fetch(url = `http://localhost:3000/toys`, {
      method: "POST",
      headers:
      {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": `${document.getElementsByClassName("input-text")[0].value}`,
        "image": `${document.getElementsByClassName("input-text")[1].value}`,
        "likes": "0",
      })
    })

}

function toys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toy => toy.forEach(toy => renderToys(toy)));
}


function removeToy() {
  fetch(url = "http://localhost:3000/toys/", {
    method: "DELETE",
  })
}


function appendNewToy() {
  const submit = document.querySelector("input.submit")
  submit.addEventListener("click", function(e) {
    e.preventDefault()
    newToy()
  })
}