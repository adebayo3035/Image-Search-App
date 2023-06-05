const accessKey = "zNsXbwX2RmRZC3brt2nPfiCblEEmWwnp8QgQQRt9B5U";

const formEl = document.querySelector("form")
const inputEl = document.getElementById('search-input')
const searchResults = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')

let inputData = ""
// Track Page Number
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    //USE API to take keyword and fetch Images using fetch and response method with async function
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json();

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }
    results.map((result) =>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('search-result')

        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_descprition

        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        // Append Search Result to Image Wrapper
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)

        //Append Image Wrapper to Search Result
        searchResults.appendChild(imageWrapper)
    });
    page++
    if(page > 1){
        showMore.style.display = "block";
    }
}
formEl.addEventListener('submit', (event) =>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener('click', () =>{
    searchImages();
})