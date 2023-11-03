
//API key for use with OMDB
apiKey = "3d009fd8";
search = `s`;
movieId = `i`; 

let MOVIES = [];


//url components
searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&${search}=`;
movieIdUrl = `http://www.omdbapi.com/?apikey=${apiKey}&${movieId}=`


//dom components
const searchForm = document.getElementById('search-form');
const searchText = document.getElementById('movie-text');
const moviesContainer = document.getElementById('movies-container');

function main(){
    searchForm.addEventListener("submit", e=>{
        e.preventDefault();
        handleSearch();
    });
}


/*This function  updates the DOM with each movie in the MOVIES global var*/
function populate_feed() {
    moviesContainer.innerHTML = MOVIES.map((movie, index)=>{

        if (movie.Poster.toLowerCase() === "n/a") {
            movie.Poster = "";

        }
        console.log(movie);
        return `
            <div class="movie" id="movie-${index}">

                <h2 class="movie-title movie-subitem">
                    ${movie.Title} (${movie.Year})
                </h2>

                <h2 class="movie-rating movie-subitem">${movie.imdbRating}</h2>

                <p class="movie-length movie-subitem"> ${movie.Runtime}</p>

                <p class="movie-genre movie-subitem">${movie.Genre}</p>

                <p class="movie-plot movie-subitem"> 
                    ${movie.Plot}
                </p>

                <div class="movie-add movie-subitem">
                    <img src="./images/add_movie.png">
                    <span>Watchlist</span>
                </div>

                <img class="movie-poster movie-subitem" src="${movie.Poster}" alt="movie poster">

            </div>        
        `
    }).join("");
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
     
     populate_feed();

}



main();

