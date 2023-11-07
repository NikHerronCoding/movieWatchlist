
//local storage keys
export const WATCHLIST_KEY = 'movieWatchlist.watchList';



/*This function  updates the DOM with each movie in the MOVIES global var*/
export function populate_feed(container, movies) {

    let watchList = [];

    if  (localStorage.getItem(WATCHLIST_KEY) == null) {
      watchList =[]
    } else {
     watchList = JSON.parse(localStorage.getItem(WATCHLIST_KEY)); 
    }

    container.innerHTML = movies.map((movie, index)=>{
        let added = false;

        if (movie == null) {
            return;
        }
        if (watchList.length > 0) {
            added = watchList.find(watchMovie=> watchMovie.imdbID === movie.imdbID)
        } 

        if (movie.Poster.toLowerCase() === "n/a") {
            movie.Poster = "";

        }
        return `
            <div class="movie" id="${movie.imdbID}">

                <h2 class="movie-title movie-subitem">
                    ${movie.Title} (${movie.Year})
                </h2>

                <h2 class="movie-rating movie-subitem"><img src="images/star.png" class="rating-star"> ${movie.imdbRating}</h2>

                <p class="movie-length movie-subitem"> ${movie.Runtime}</p>

                <p class="movie-genre movie-subitem">${movie.Genre}</p>

                <p class="movie-plot movie-subitem"> 
                    ${movie.Plot}
                </p>

                <div class="movie-add movie-subitem">
                    <img class="movie-watchlist movie-icon" src="${added? "./images/remove_movie.png":"./images/add_movie.png"}">
                    ${added ? "<span>Remove</span>":"<span>Watchlist</span>"}
                </div>

                <img class="movie-poster movie-subitem" src="${movie.Poster}" alt="movie poster">

            </div>        
        `
    }).join("");

}

/*This function  updates the DOM with each movie in the MOVIES global var*/
export function populateWatchlist(container) {

    let watchList = [];

   if  (localStorage.getItem(WATCHLIST_KEY) == null) {
     watchList =[]
   } else {
    watchList = JSON.parse(localStorage.getItem(WATCHLIST_KEY)); 
   }

   // if no movies are in watchlist, put boilerplate text
    if (watchList.length <= 0){
        container.innerHTML = `
        <p>Your watchlist is looking a little empty...</p>
        <a href="index.html">
             <img class="add-icon" src="./images/add_movie.png"> <span class="add-movies"> Let's add some movies!</span>
        </a>
        `
    // else, populate feed with watchlist movies   
    } else {

        container.innerHTML = watchList.map((movie, index)=>{
    
            if (movie.Poster.toLowerCase() === "n/a") {
                movie.Poster = "";
    
            }
    
            return `
                <div class="movie" id="${movie.imdbID}">
    
                    <h2 class="movie-title movie-subitem">
                        ${movie.Title} (${movie.Year})
                    </h2>
    
                    <h2 class="movie-rating movie-subitem"><img src="images/star.png" class="rating-star"> ${movie.imdbRating}</h2>
    
                    <p class="movie-length movie-subitem"> ${movie.Runtime}</p>
    
                    <p class="movie-genre movie-subitem">${movie.Genre}</p>
    
                    <p class="movie-plot movie-subitem"> 
                        ${movie.Plot}
                    </p>
    
                    <div class="movie-add movie-subitem">
                        <img class="movie-watchlist movie-icon" src="./images/remove_movie.png">
                        <span>Remove</span>
                    </div>
    
                    <img class="movie-poster movie-subitem" src="${movie.Poster}" alt="movie poster">
    
                </div>        
            `
        }).join("");

    }


}




