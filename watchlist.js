import {populateWatchlist,  WATCHLIST_KEY} from "./helper.js";



let moviesContainer = document.getElementById('watchlist-container'); 

function main() {

    populateWatchlist(moviesContainer);

    document.addEventListener('click', e=>{
        
        switch (e.target.classList[0]) {
            case "movie-watchlist":
                //getting ID of grandparent element
                let imdbID = e.target.parentElement.parentElement.id;

                //remove element from watchlist if clicked
                removeMovie(imdbID);
                break;
            default:
                break;
        }
    })

}

export function removeMovie(imdbID){

    let watchList = [];

    if  (localStorage.getItem(WATCHLIST_KEY) == null) {
      watchList =[]
    } else {
     watchList = JSON.parse(localStorage.getItem(WATCHLIST_KEY)); 
    }

    

    /*if movie not already in watchlist, add it to watchlist
    else remove movie from watchlist
    */
    
    watchList = watchList.filter(movie=>{
        return movie.imdbID != imdbID;
    });

    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchList));
    populateWatchlist(moviesContainer);

}

main();