const searchField = document.querySelector("#searchField");
const search = document.querySelector(".search_btn");

// const results = [];

function handleSearch(e) {
  e.preventDefault();
  let searchTerm = searchField.value;
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&titles=Main+Page&generator=search&utf8=1&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrlimit=10`;

  const results = [];

  fetch(api)
    .then(blob => blob.json())
    .then(data => results.push(...data));
    // .then(console.log(results));
  searchField.value = '';
  // console.log(results);
  return results;
}


search.addEventListener('click', handleSearch);