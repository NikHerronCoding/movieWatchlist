import {populate_feed, WATCHLIST_KEY} from "./helper.js"; 
//API key for use with OMDB
const apiKey = "3d009fd8";
const search = `s`;
const movieId = `i`; 

let MOVIES = [];
let WATCHLIST = [];
if (localStorage.getItem('movieWatchlist.watchList') != null) {
    WATCHLIST = JSON.parse(localStorage.getItem(WATCHLIST_KEY));
}


//url components
let searchUrl = `https://www.omdbapi.com/?apikey=${apiKey}&${search}=`;
let movieIdUrl = `https://www.omdbapi.com/?apikey=${apiKey}&${movieId}=`;


//dom components
const searchForm = document.getElementById('search-form');
const searchText = document.getElementById('movie-text');
const moviesContainer = document.getElementById('movies-container');

/*Main function creates two event listeners

    1. for the search bar submit
    2. for the 'add to watchlist feature'

*/
function main(){
    searchForm.addEventListener("submit", e=>{
        e.preventDefault();
        handleSearch();
    });

    document.addEventListener('click', e=>{
        switch (e.target.classList[0]) {
            case "movie-watchlist":
                //getting ID of grandparent element
                let imdbID = e.target.parentElement.parentElement.id;
                let watchList = JSON.parse(localStorage.getItem(WATCHLIST_KEY));
                handleWatchlistAddIndex(imdbID, MOVIES, watchList, moviesContainer);
                break;
            default:
                console.log(JSON.parse(localStorage.getItem('movieWatchlist.watchList')));
        }
    })


}




/* For each search result, this function gets the full data of each movie and places it in the MOVEIS global VAR

 lastly, the function calls populate_feed to update the dom with the movie data
*/
async function getMovieInfo(data) {
    MOVIES = [];
    const moviePromises =  data.Search.map(async (movieResult)=>{
        let response = await fetch(movieIdUrl+ movieResult.imdbID);
        return response.json();});

    const movieDetails = await Promise.all(moviePromises);
    MOVIES.push(...movieDetails)
    
}


/* This function is called when the seach button is pressed and fetches the movie search that was requested */

async function handleSearch() {
    let filmName = searchText.value;
    let fullUrl = searchUrl + filmName;
    let response = await fetch(fullUrl);
    let data = await response.json()
    
    /*(Searching with this api does not give full movie info. For each search result,

     a full movie api request must be made*/
     await getMovieInfo(data);
     
     populate_feed(moviesContainer, MOVIES);

}


function handleWatchlistAddIndex(imdbID, movies, watchList, container){
    console.log('watchList: ')
    console.log(watchList)
    let movie = movies.find(ele=>{
        return ele.imdbID === imdbID;
    })

    console.log(movie);

    /*if movie not already in watchlist, add it to watchlist
    else remove movie from watchlist
    */

    if ((watchList[0] == null && watchList.length < 2) || !watchList.find(ele=>{
        return ele.imdbID == imdbID; 
    })) {
        watchList.push(movie);
        console.log('added movie')
    } else {
        watchList = watchList.filter(movie=> movie.imdbID != imdbID)
        console.log('tried to remove movie')
    }
    
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchList));
    populate_feed(container, movies);
    console.log('watchList at end')
    console.log(watchList);
}


localStorage.setItem(WATCHLIST_KEY, JSON.stringify([]));
main();

