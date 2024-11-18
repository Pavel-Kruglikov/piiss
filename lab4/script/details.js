// Импортируем массив рубашек из файла shirts.js
import { shirts } from '../data/shirts.js';
// Импортируем функции для создания элементов интерфейса из файла common.js
import {
  createColorSelection, // Функция для создания интерфейса выбора цвета
  createDescription,     // Функция для создания элемента описания рубашки
  createPrice,          // Функция для создания элемента с ценой рубашки
  createSideSelection,   // Функция для создания интерфейса выбора стороны рубашки
  createTitle,          // Функция для создания заголовка с названием рубашки
  createImageContainer,  // Функция для создания контейнера с изображением рубашки
} from './common.js';
// Импортируем ключ для хранения выбранной рубашки и объект для работы с локальным хранилищем
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';
// Импортируем константу для выбора стороны рубашки
import { SIDE } from './utils/side.js';
// Импортируем функцию для форматирования URL изображений
import { formatUrl } from './utils/url.js';

// Функция для отрисовки деталей рубашки
function renderDetails() {
  // Находим контейнер для отображения деталей рубашки в документе
  const container = document.querySelector('.shirt-details');
  // Получаем выбранную рубашку из локального хранилища, или первую рубашку из массива
  const shirt = storage.getItem(SELECTED_SHIRT_KEY) || shirts[0];

  // Получаем доступные цвета рубашки
  const availableColors = Object.keys(shirt.colors);

  // Инициализируем объект с выбранными опциями
  let selectedOptions = {
    color: availableColors[0], // Устанавливаем первый доступный цвет как выбранный
    side: SIDE.front,           // Устанавливаем переднюю сторону как выбранную
  };

  // Функция для обновления отображаемого изображения рубашки
  const updateDisplay = () => {
    img.src = formatUrl(shirt.colors[selectedOptions.color][selectedOptions.side]); // Обновляем источник изображения
  };

  // Функция для обновления выбранных опций
  const updateOptions = (options) => {
    selectedOptions = {
      ...selectedOptions, // Сохраняем предыдущие опции
      ...options,        // Обновляем их новыми значениями
    };
    updateDisplay(); // Обновляем отображение изображения
  };

  // Создаем контейнер для изображения и само изображение рубашки
  const { imgContainer, img } = createImageContainer(shirt, selectedOptions);
  // Создаем заголовок, цену, описание, выбор стороны и выбор цвета
  const title = createTitle(shirt);
  const price = createPrice(shirt);
  const description = createDescription(shirt);
  const sideSelection = createSideSelection(updateOptions);
  const colorSelection = createColorSelection(shirt, updateOptions);

  // Добавляем контейнер с изображением в основной контейнер
  container.appendChild(imgContainer);
  
  // Создаем новый контейнер для остальных деталей рубашки
  const bodyContainer = document.createElement('div');
  bodyContainer.className = 'body-container'; // Устанавливаем класс для контейнера

  // Добавляем заголовок, нцену, описание, выбор стороны и выбор цвета в контейнер
  bodyContainer.appendChild(title);
  bodyContainer.appendChild(price);
  bodyContainer.appendChild(description);
  bodyContainer.appendChild(sideSelection);
  bodyContainer.appendChild(colorSelection);

  // Добавляем контейнер с деталями в основной контейнер
  container.appendChild(bodyContainer);
}

// Вызываем функцию для отрисовки деталей рубашки
renderDetails();
