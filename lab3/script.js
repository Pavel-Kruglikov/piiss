// Функция инициализации, которая будет запускать процесс отображения футболок
function init() {
  // Получаем контейнер, в который будем добавлять карточки с футболками
  const container = document.getElementById('shirts-container');

  // Функция для создания кнопки с заданным текстом
  const createButton = (text) => {
    // Создаем новый элемент кнопки
    const button = document.createElement('button');
    // Устанавливаем класс для стилизации
    button.className = 'button';
    // Устанавливаем текст кнопки
    button.textContent = text;
    // Возвращаем созданную кнопку
    return button;
  };

  // Функция для рендеринга одной карточки с футболкой
  const renderItem = (item) => {
    // Создаем контейнер для карточки
    const card = document.createElement('div');
    // Устанавливаем класс для карточки
    card.className = 'card';

    // Создаем элемент изображения
    const img = document.createElement('img');
    // Устанавливаем источник изображения, используя безопасный доступ к свойствам
    img.src = item.colors?.white?.front || item.default?.front;
    // Устанавливаем альтернативный текст для изображения
    img.alt = item?.name || 'T-Shirt';

    // Создаем элемент для названия футболки
    const title = document.createElement('div');
    // Устанавливаем класс для названия
    title.className = 'card-title';
    // Устанавливаем текст названия, если его нет, отображаем 'No name T-Shirt'
    title.textContent = item?.name || 'No name T-Shirt';

    // Создаем элемент для отображения цены
    const text = document.createElement('div');
    // Устанавливаем класс для текста
    text.className = 'card-text';
    // Устанавливаем текст с ценой, если цена отсутствует, показываем 0
    text.textContent = `Price: ${item?.price || 0}`;

    // Создаем кнопки для быстрого просмотра и перехода на страницу
    const quickViewButton = createButton('Quick View');
    const seePageButton = createButton('See Page');

    // Добавляем все элементы в карточку
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(quickViewButton);
    card.appendChild(seePageButton);

    // Добавляем карточку в контейнер
    container.appendChild(card);
  };

  // Функция для рендеринга списка карточек
  const renderList = (items, renderItem) => {
    // Для каждого элемента в массиве вызываем функцию renderItem
    items.forEach(renderItem);
  };

  // Вызываем renderList, передавая массив с данными о футболках и функцию renderItem
  renderList(shirts, renderItem);
}

// Запускаем инициализацию
init();
