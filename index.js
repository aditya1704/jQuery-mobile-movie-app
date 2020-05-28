$(function(){
    $('#searchMovie').on('click',function(e){
        let serachText=$('#searchText').val()
        getMovies(serachText)
        e.preventDefault()
    })
});

//Before Movie Details Page
$(document).on('pagebeforeshow','#movie',function(){
    let movieId=sessionStorage.getItem('movieId');
    getMovie(movieId);
});

function movieClicked(id){
    sessionStorage.setItem('movieId',id)
    $.mobile.changePage('movie.html')
}

function getMovies(serachText){
    $.ajax({
        method:'GET',
        url:'http://www.omdbapi.com/?apikey=6994e826&s='+serachText
    }).done(function(data){
        
        let movies= data.Search
        let output=''

        movies.map((movie)=>{
            output+=`
            <li>
                <a onClick="movieClicked('${movie.imdbID}')" href=#>
                    <img src="${movie.Poster}">
                    <h2> ${movie.Title}</h2>
                    <p>Release Year: ${movie.Year}</p>
                </a>
            </li>`
        })
        $('#movies').html(output).listview('refresh')
    })
}

function getMovie(movieid){
    console.log(movieid)
    $.ajax({
        method:'GET',
        url:'http://www.omdbapi.com/?apikey=6994e826&i='+movieid
    }).done(function(data){
        console.log(data)

        let movieTop= `
        <div style='text-align:center'>
            <h1>${data.Title}</h1>
            <img src="${data.Poster}">
        </div>
        `
        $('#movieTop').html(movieTop)

        let movieDetails= `
        <li><strong>Genre:</strong>${data.Genre}</li>
        <li><strong>Rated:</strong>${data.Rated}</li>
        <li><strong>Release:</strong>${data.Release}</li>
        <li><strong>Runtime:</strong>${data.Runtime}</li>
        <li><strong>IMDB Rating</strong>${data.imdbRating}</li>
        <li><strong>IMDB Votes:</strong>${data.imdbVotes}</li>
        <li><strong>Actors:</strong>${data.Actors}</li>
        <li><strong>Director:</strong>${data.Director}</li>
        `
        
        $('#movieDetails').html(movieDetails).listview('refresh')
    
    })

}