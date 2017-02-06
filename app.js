const searchField = document.querySelector('#searchField');
const search = document.querySelector('.search_btn');
const listResult = document.querySelector('.results')

function showResults(e) {
  e.preventDefault();
  const arr = [1,1,11,1,1,1,2,31243];
  const wikiStuff = new Promise(
    function(resolve, reject) {
      const res = handleSearch();
      if(res) {
        resolve(res);
        return res;
      } else {
        reject(Error("Failed!"));
      }
    }
  );
  wikiStuff.then(function(result) {
    console.log('during promise',  result);
    // console.log(Promise['["[[PromiseValue]]"]']);
  });
  console.log('after promise ', wikiStuff);
  // console.log(wikiStuff.length);
  console.log(wikiStuff.length);
  const html = arr.map(result => {
    return `
    <li class="result">
      <img class="result_image" src="https://placehold.it/100x100" alt="Placeholder">
      <h4 class="result_title">Lorem ipsum dolor sit amet, consectetur adipisicing.</h4>
      <p class="result_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur architecto cum asperiores dolor delectus tempore quasi aperiam commodi? Aperiam, earum.</p>
      <a href="#" class="result_link"></a>
    </li>
  `;
  }).join('');
  listResult.innerHTML = html;
}

function handleSearch() {
  let results = [];
  let searchTerm = searchField.value;
  // Remember to change srsearch=green to srsearch=${searchTerm}
  const api = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cextracts&titles=Main+Page&generator=search&utf8=1&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrsearch=green&gsrlimit=11`;

  fetch(api)
    .then(response => response.json())
    .then(data => Object.keys(data.query.pages).map(key => results.push(data.query.pages[key])))
    .catch(error => console.error(error));
  return results;
}


search.addEventListener('click', showResults);