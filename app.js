const searchField = document.querySelector("#searchField");
const search = document.querySelector(".search_btn");

function handleSearch(e) {
  e.preventDefault();
  let searchTerm = searchField.value;
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&titles=Main+Page&generator=search&utf8=1&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrsearch=${searchTerm}&gsrlimit=10`;

  let results = [];

  fetch(api)
    .then(response => response.json())
    .then(data => Object.keys(data.query.pages).map(key => {
      results = data.query.pages[key];
      results.key = key;
      return results;
    })
    // Populate the list with results
    // .then()
    // update DOM
    // .then()
    )
    .catch(error => console.error(error));
  
  searchField.value = '';
}


search.addEventListener('click', handleSearch);