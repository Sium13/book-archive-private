
document.getElementById('error-empty').style.display = 'none';

document.getElementById('error-massage').style.display = 'none';

document.getElementById('found-result').style.display = 'none';



const searchResult = document.getElementById('search-result');

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    document.getElementById('error-empty').style.display = 'none';

    // clear data
    searchField.value = '';

    // <!-- error message when input field is empty -->

    if (searchText === '') {
        const errorEmpty = document.getElementById('error-empty');
        // console.log('Please write something to search.')
        const div = document.createElement('div');

        div.innerHTML = `
        <h3 style="text-align: center;">Please write something to search.</h3>
    `
        errorEmpty.appendChild(div);

        errorEmpty.style.display = 'block';
    }

    //when search field is not empty.
    else {
        console.log(searchText);
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        // console.log(url)
        fetch(url)
            .then(res => res.json())
            // .then(data => displaySearchResult(data.docs))
            .then(data => displaySearchResult(data))
            .catch(error => displayError(error));

    }
}

//    <!-- error message for function problem plus other problem -->

const displayError = error => {
    document.getElementById('error-massage').style.display = 'block';
}

//   <!-- search result  for any case-->

const displaySearchResult = books => {

    foundResult(books.numFound)

    const searchResult = document.getElementById('search-result');

    //previous search result jate chole jay
    searchResult.textContent = '';

    books.docs.forEach(doc => {
        // console.log(doc)
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div   class="card h-100">
                 <img  style="width: 50%;" src=" https://covers.openlibrary.org/b/id/${doc?.cover_i}-M.jpg" class="card-img-top" alt="...">
                 <div class="card-body">
                      <h3 class="card-title">${doc?.title}</h3>
                      <h4>${doc?.author_name}</h4>
                      <h5>Publisher: ${doc?.publisher}</h5>
                    <h6> First Publish Year:  ${doc?.first_publish_year}<h6>
             
            </div>
        </div>
            `
        searchResult.appendChild(div);
    })
}

// for how many books found by search

const foundResult = numFound => {
    document.getElementById('found-result').style.display = 'none';
    const foundResultNum = document.getElementById('found-result');

    //previous search result jate chole jay
    foundResultNum.textContent = '';



    if (numFound === 0) {

        console.log('no result')
        const div = document.createElement('div');

        div.innerHTML = `
            <h3 style="text-align: center;">No result found.</h3>
        `
        foundResultNum.appendChild(div);

        foundResultNum.style.display = 'block';
    }
    else {
        console.log('result found');


        const div = document.createElement('div');

        div.innerHTML = `
        <h3 style="text-align: center;">${numFound} result found!</h3>
    `
        foundResultNum.appendChild(div);

        foundResultNum.style.display = 'block';
    }

}



