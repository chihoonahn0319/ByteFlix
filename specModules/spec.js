import { getVideoLink, getDetails } from "./video.js";
import { getMovieCredits } from "./specPeople.js";
import { init } from "./specReview - 치훈.js";
import { getSavedNickname } from "./header.js";

init();

window.onload = async function () {
  const URLSearch = new URLSearchParams(location.search);
  const movieId = URLSearch.get("id");
  await getMovieCredits(movieId);
  let trailerDiv = document.getElementsByClassName("trailer")[0];
  let iFrameHtml = await getVideoLink(movieId);
  let movieDetails = await getDetails(movieId);
  trailerDiv.appendChild(iFrameHtml);
  typing("movieTitle", movieDetails.title, 150);
  const overview = document.getElementById("movieOverview");
  overview.textContent = movieDetails.overview;
};

let index = 0;
function typing(id, str, time) {
  const content = str;
  const text = document.getElementById(id);
  if (index < content.length) {
    text.textContent += content[index++];
    setTimeout(typing, time, id, str, time);
  }
}

const savedNickname = getSavedNickname();
