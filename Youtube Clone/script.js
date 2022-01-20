const key = "AIzaSyBikbTWJ7HeSlvFhatk0bb8O_M_CTWqI-g";
const url =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&key=" +
  key +
  "&q=";

const input = document.querySelector("input");
const button = document.querySelector("button");
const constainer = document.querySelector(".container");
const iframe = document.querySelector("iframe");
let request = new XMLHttpRequest();

function showVideos(videos) {
  iframe.classList.remove("showIframe");
  input.value = "";
  const cardsDelete = document.querySelectorAll(".card");
  cardsDelete.forEach((e) => e.remove());

  videos.items.map((e) => {
    const video = document.createElement("div");
    const title = document.createElement("h2");
    const desc = document.createElement("p");
    const img = document.createElement("img");
    video.className = "card";
    title.textContent = e.snippet.title;
    desc.textContent = e.snippet.description;
    img.setAttribute("src", e.snippet.thumbnails.medium.url);

    video.addEventListener("click", () => {
      iframe.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + e.id.videoId
      );
      iframe.classList.add("showIframe");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    video.appendChild(img);
    video.appendChild(title);
    video.appendChild(desc);

    constainer.appendChild(video);
  });
}

function fetchData() {
  request.open("GET", url + input.value);
  request.send();
  request.onload = () => {
    if (request.status >= 200 && request.status < 400)
      showVideos(JSON.parse(request.responseText));
    else alert("Something went wrong. Please try again.");
  };
}

button.addEventListener("click", fetchData);
