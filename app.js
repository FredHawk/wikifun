const searchField = document.querySelector('#searchField');
const search = document.querySelector('.search_btn');
const listResult = document.querySelector('.results')

function handleSearch(e) {
  e.preventDefault();
  let results = [];
  let searchTerm = searchField.value;
  const regex = /\w+\s?/ig;

  if (searchTerm === '') {
    listResult.innerHTML = `
      <li class="result">
        <p>Please type a searchterm</p>
      </li>
    `;
  } else if (!searchTerm.match(regex)) {
    listResult.innerHTML = `
      <li class="result">
        <p>Not valid searchterm</p>
      </li>
    `;
  } else {

  const cleanedSearchTerm = searchTerm.split(' ').join('+');

  // Remember to change srsearch=green to srsearch=${cleanedSearchTerm}
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&titles=Main+Page&generator=search&utf8=1&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrsearch=${cleanedSearchTerm}&gsrlimit=10`;

  fetch(api)
    .then(response => response.json())
    .then(data => {
      Object.keys(data.query.pages).map(key => results.push(data.query.pages[key]))
      // console.log(results);
      const html = results.map(result => {
          return `
          <li class="result">
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" class="result_link" target="_blank">
            <h3 class="result_title">${result.title}</h3>
            <p class="result_description">${result.extract}</p>
            </a>
          </li>
        `;
        }).join('');
        listResult.innerHTML = html;
    })
    .catch(error => console.error(error));
  }
}

search.addEventListener('click', handleSearch);