// 1. Создание объекта personalMovieDB
const personalMovieDB = {
    privat: false,
    movies: {
        "Интерстеллар": 9,
        "Пианист": 10,
        "17 мгновений весны": 9
    }
};

// 2. Функция для вывода объекта movies в виде таблицы
function displayMovies() {
    if (!personalMovieDB.privat) {
        const table = document.createElement('table');
        const header = `
            <tr>
                <th>Название фильма</th>
                <th>Оценка</th>
            </tr>
        `;
        table.innerHTML = header;

        for (let movie in personalMovieDB.movies) {
            const row = `
                <tr>
                    <td>${movie}</td>
                    <td>${personalMovieDB.movies[movie]}</td>
                </tr>
            `;
            table.innerHTML += row;
        }

        document.getElementById('movieTable').appendChild(table);
    }
}

// Вызов функции для отображения фильмов
displayMovies();