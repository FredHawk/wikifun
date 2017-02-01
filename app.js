const searchField = document.querySelector('#searchField');
const search = document.querySelector('.search_btn');
const listResult = document.querySelector('.results')

function showResults(results) {
  return (`
    <li class="result">
      <img class="result_image" src="https://placehold.it/100x100" alt="PLaceholder">
      <h4 class="result_title">Lorem ipsum dolor sit amet, consectetur adipisicing.</h4>
      <p class="result_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur architecto cum asperiores dolor delectus tempore quasi aperiam commodi? Aperiam, earum.</p>
      <a href="#" class="result_link"></a>
    </li>
  `);
}

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
    .then(results => results.map(showResults))
    // update DOM
    // .then()
    )
    .catch(error => console.error(error));
  
  searchField.value = '';
}


search.addEventListener('click', handleSearch);