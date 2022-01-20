const main = document.querySelector("section");
const result = document.querySelector(".result");
const input = document.querySelector("input");
const searchButton = document.querySelector(".search-btn");
const watchLater = document.querySelector(".watch-list");
const watchLaterDiv = document.querySelector(".watch-later");

fetch("http://api.tvmaze.com/shows")
  .then((response) => response.json())
  .then((data) => showMostPopular(data));

function showMostPopular(e) {
  e.forEach((e) => {
    const img = document.createElement("img");
    const img1 = document.createElement("img");
    const title = document.createElement("h2");
    const card = document.createElement("div");
    const btn = document.createElement("button");
    const li = document.createElement("li");
    const a = document.createElement("a");
    const button2 = document.createElement("button");
    const div = document.createElement("div");

    let addToWatchLater = true;

    card.classList.add("single-card");
    btn.innerText = "Add to watch list";
    img.setAttribute("src", e.image.medium);
    title.innerText = e.name;
    card.append(img);
    card.append(title);
    card.append(btn);
    main.append(card);
    card.style.width = "20%";
    img.addEventListener("click", () => {
      window.sessionStorage.setItem("myid", e.id);
      window.open("./index2.html");
    });
    btn.addEventListener("click", () => {
      if (addToWatchLater === true) {
        a.innerText = e.name;
        img1.setAttribute("src", e.image.medium);
        img1.setAttribute("width", "50px");
        div.append(img1);
        a.setAttribute("href", "#");
        div.append(li);
        li.append(a);
        div.append(button2);
        div.classList.add("divic");
        button2.classList.add("watch-list-button");
        watchLater.append(div);
        addToWatchLater = !addToWatchLater;
        btn.innerText = "Remove from watch list";
      } else {
        addToWatchLater = !addToWatchLater;
        div.remove();
        btn.innerText = "Add to watch list";
      }
      button2.addEventListener("click", () => {
        addToWatchLater = !addToWatchLater;
        div.remove();
        btn.innerText = "Add to watch list";
      });
    });
    li.addEventListener("click", () => {
      window.sessionStorage.setItem("myid", e.id);
      window.open("./index2.html");
    });
  });
}

input.addEventListener("keyup", () => {
  fetch("https://api.tvmaze.com/search/shows?q=" + input.value)
    .then((response) => response.json())
    .then((data) => displaySearchedShows(data));
  console.log(input.value);
});

function displaySearchedShows(e) {
  console.log(e);
  const deleteLi = document.querySelectorAll("li");
  deleteLi.forEach((e) => e.remove());
  e.forEach((e) => {
    const singleShow = document.createElement("li");
    singleShow.innerText = e.show.name;
    result.append(singleShow);
    singleShow.addEventListener("click", () => {
      window.sessionStorage.setItem("myid", e.show.id);
      window.open("./index2.html");
    });
  });
}

let buttonClicked = false;
searchButton.addEventListener("click", () => {
  if (buttonClicked === false) {
    buttonClicked = true;
    input.style.width = "250px";
    input.classList.remove("visibility-none");
  } else {
    buttonClicked = false;
    input.style.width = "0px";
    setTimeout(() => {
      input.classList.add("visibility-none");
    }, 1600);
  }
});

watchLaterDiv.addEventListener("mouseover", () => {
  watchLaterDiv.style.width = "340px";
});
watchLaterDiv.addEventListener("mouseout", () => {
  watchLaterDiv.style.width = "35px";
});
