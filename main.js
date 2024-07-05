$(document).ready(function () {
  let value = '';
  $('#searchForm').on('submit', (e) => {
    e.preventDefault();
    let value = $('#searchText').val();
    getMovies(value);
  });
});

function getMovies(search) {
  axios
    .get('http://www.omdbapi.com/?apikey=80a1b657&s=' + search)
    .then(function (response) {
      if (response.status != 200) {
        let alert = `<div class="alert alert-dismissible alert-warning">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4 class="alert-heading">Warning!</h4>
                        <p class="mb-0">Something went wrong! Error: ${response.statusText}</p>
                    </div>`;
        $(document).html(alert);
      } else {
        let data = response.data.Search;
        let output = '';
        $.each(data, function (index, movie) {
          output += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card border-secondary mb-3 text-center" style="max-width: 20rem;">                            
                    <div class="card-body">
                        <img src="${movie.Poster}"/>
                        <h4 class="card-title">${movie.Title}</h4>
                        <a class="btn btn-primary" href="#" onclick="movieSelected('${movie.imdbID}')">View details</a>   
                    </div>
                </div>  
            </div>`;
        });
        $('#movies').html(output);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function movieSelected(imdbID) {
  sessionStorage.setItem('movieId', imdbID);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios
    .get('http://www.omdbapi.com/?apikey=80a1b657&i=' + movieId)
    .then(function (response) {
      if (response.status != 200) {
        let alert = `<div class="alert alert-dismissible alert-warning">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <h4 class="alert-heading">Warning!</h4>
                        <p class="mb-0">Something went wrong! Error: ${response.statusText}</p>
                    </div>`;
        $(document).html(alert);
      } else {
        let data = response.data;
        let output = `
          <div class="row">
            <div class="col-lg-4">
              <img src="${data.Poster}"/>
            </div>
            <div class="col-lg-8">
              <h3>${data.Title}</h3>
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>Genre:</strong> ${data.Genre}</li>
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>Director:</strong> ${data.Director}</li>
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>Year:</strong> ${data.Year}</li>
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>Writer:</strong> ${data.Writer}</li>
                <li class="list-group-item d-flex justify-content-flex-start align-items-center"><strong>Actors:</strong> ${data.Actors}</li>
              <ul>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <h3>Plot</h3>
                  <p>${data.Plot}</p>
                  <hr>
                  <a href="http://imdb.com/title/${movieId}" target="_blank" class="btn btn-primary btnLink">View IMDB</a>                  
                  <a href="index.html" class="btn btn-default btnLink">Go back to search</a>
                </div>
              </div>
            </div>
          </div>
          `;
        $('#movie').html(output);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
