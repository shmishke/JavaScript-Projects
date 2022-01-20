// const search = "https://api.github.com/search/users?q=";
const search = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".container");
let request = new XMLHttpRequest();

function searchUsers() {
  request.open("GET", "https://api.github.com/search/users?q=" + search.value);
  request.send();
  request.onload = () => {
    let cardsDelete = document.querySelectorAll(".card");
    cardsDelete.forEach((e) => e.remove());

    let response = JSON.parse(request.responseText);
    response.items.map((e) => {
      let card = document.createElement("div");
      let name = document.createElement("h2");
      let img = document.createElement("img");

      name.addEventListener("click", () => {
        sessionStorage.setItem("user", e.login);
        window.open("./singleUser.html");
      });

      card.className = "card";
      name.textContent = e.login;
      img.setAttribute("src", e.avatar_url);
      card.appendChild(name);
      card.appendChild(img);

      container.appendChild(card);
    });
  };
}

button.addEventListener("click", searchUsers);
