const id = sessionStorage.getItem("myid");
const image = document.querySelector(".img");
const title = document.querySelector(".title");
const details = document.querySelector(".details");
const listOfSeasons = document.querySelector(".seasons");
let result = document.querySelector(".result");
let input = document.querySelector("input");

fetch("http://api.tvmaze.com/shows/" + id)
  .then((response) => response.json())
  .then((data) => singleShow(data));

fetch("http://api.tvmaze.com/shows/" + id + "/seasons")
  .then((response) => response.json())
  .then((data) => showSeasons(data));

fetch("http://api.tvmaze.com/shows/" + id + "/cast")
  .then((response) => response.json())
  .then((data) => showCast(data));

function singleShow(e) {
  console.log(e);
  const img = document.createElement("img");
  const showTitle = document.createElement("h2");

  img.setAttribute("src", e.image.medium);
  showTitle.innerText = e.name;
  title.append(showTitle);
  image.append(img);
  details.innerHTML = e.summary;
}
function showSeasons(e) {
  console.log(e);
  const title = document.createElement("h3");
  title.innerText = "Seasons (" + e.length + ")";
  listOfSeasons.append(title);

  e.forEach((el) => {
    const oneSeason = document.createElement("p");
    oneSeason.innerText = el.premiereDate + "  ||  " + el.endDate;
    listOfSeasons.append(oneSeason);
  });
}
function showCast(e) {
  console.log(e);
  const lista = document.querySelector(".lista");
  e.forEach((el) => {
    const oneCastCrew = document.createElement("li");
    oneCastCrew.innerText = el.person.name + " as " + el.character.name;
    lista.append(oneCastCrew);
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
