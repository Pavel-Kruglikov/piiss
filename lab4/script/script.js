// Импортируем функцию для создания кнопок из файла common.js
import { createButton } from './common.js';
// Импортируем массив рубашек из файла shirts.js
import { shirts } from '../data/shirts.js';
// Импортируем ключ для хранения выбранной рубашки и объект для работы с локальным хранилищем
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';
// Импортируем функцию для форматирования URL изображений
import { formatUrl } from './utils/url.js';

// Функция для отрисовки главной страницы с рубашками
function renderMain() {
  // Находим контейнер, в который будем добавлять карточки рубашек
  const container = document.getElementById('shirts-container');

  // Функция для навигации на страницу деталей выбранной рубашки
  const navigatePageDetails = (item) => () => {
    storage.setItem(SELECTED_SHIRT_KEY, item); // Сохраняем выбранную рубашку в локальном хранилище
    window.location.href = 'details.html'; // Переходим на страницу деталей
  };

  // Функция для отрисовки отдельной карточки рубашки
  const renderItem = (item) => {
    // Создаем контейнер для карточки
    const card = document.createElement('div');
    card.className = 'card'; // Устанавливаем класс для карточки

    // Создаем изображение рубашки
    const img = document.createElement('img');
    img.src = formatUrl(item.colors?.white?.front || item.default?.front); // Устанавливаем источник изображения
    img.alt = item?.name || 'T-Shirt'; // Устанавливаем альтернативный текст для изображения

    // Создаем элемент для названия рубашки
    const title = document.createElement('div');
    title.className = 'card-title'; // Устанавливаем класс для названия
    title.textContent = item?.name || 'No name T-Shirt'; // Устанавливаем текст названия

    // Создаем элемент для отображения цены рубашки
    const text = document.createElement('div');
    text.className = 'card-text'; // Устанавливаем класс для текста
    text.textContent = `Price: ${item?.price || 0}`; // Устанавливаем текст с ценой

    // Создаем кнопки для быстрого просмотра и перехода на страницу
    const quickViewButton = createButton({ text: 'Quick View' });
    const seePageButton = createButton({ text: 'See Page', onClick: navigatePageDetails(item) });

    // Добавляем элементы в карточку
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(quickViewButton);
    card.appendChild(seePageButton);

    // Добавляем карточку в контейнер
    container.appendChild(card);
  };

  // Функция для отрисовки списка рубашек
  const renderList = (items, renderItem) => {
    items.forEach(renderItem); // Для каждого элемента в списке вызываем функцию renderItem
  };

  // Вызываем функцию для отрисовки списка рубашек
  renderList(shirts, renderItem);
}

// Вызываем основную функцию для начала отрисовки
renderMain();
