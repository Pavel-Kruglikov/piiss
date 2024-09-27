let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?');

while (numberOfFilms === '' || numberOfFilms === null) {
    numberOfFilms = prompt('Вы не ввели количество фильмов. Пожалуйста, введите количество фильмов вы уже посмотрели?');
}

let personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

for (let i = 0; i < 2; i++) {
    let lastFilm = prompt('Один из последних просмотренных фильмов?');

    while (lastFilm === '' || lastFilm === null || lastFilm.length > 50) {
        lastFilm = prompt('Вы не ввели название фильма или оно слишком длинное. Пожалуйста, введите название фильма еще раз.');
    }

    let rating = prompt('На сколько оцените его?');

    while (rating === '' || rating === null) {
        rating = prompt('Вы не ввели оценку. Пожалуйста, введите оценку еще раз.');
    }

    personalMovieDB.movies[lastFilm] = rating;
}

console.log(personalMovieDB);