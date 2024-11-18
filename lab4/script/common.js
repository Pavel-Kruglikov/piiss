// Импортируем константу SIDE из модуля side.js
import { SIDE } from './utils/side.js';
// Импортируем функцию formatUrl из модуля url.js
import { formatUrl } from './utils/url.js';

// Экспортируем функцию createButton, которая создает кнопку с заданными свойствами
export const createButton = (props) => {
  // Деструктурируем свойства из объекта props с заданием значений по умолчанию
  const { text = '', className = '', onClick, backGroundColor = '' } = props;

  // Создаем элемент кнопки
  const button = document.createElement('button');
  // Устанавливаем классы для кнопки
  button.className = `button ${className}`;

  // Если указан цвет фона, применяем стили к кнопке
  if (backGroundColor) {
    button.style.backgroundColor = backGroundColor; // Устанавливаем цвет фона
    button.style.color = '#000'; // Устанавливаем цвет текста
    button.style.borderWidth = '2px'; // Устанавливаем ширину границы
    button.style.borderRadius = '10px'; // Устанавливаем радиус границы
    button.style.borderColor = 'black'; // Устанавливаем цвет границы
    button.style.borderStyle = 'solid'; // Устанавливаем стиль границы
    button.style.cursor = 'pointer'; // Устанавливаем курсор при наведении

    // Добавляем обработчик события для изменения прозрачности при наведении
    button.addEventListener('mouseenter', () => {
      button.style.opacity = 0.7; // Уменьшаем непрозрачность при наведении
    });

    // Добавляем обработчик события для восстановления непрозрачности при уходе курсора
    button.addEventListener('mouseleave', () => {
      button.style.opacity = 1; // Восстанавливаем исходную непрозрачность
    });
  }

  // Устанавливаем текст кнопки
  button.textContent = text;
  // Устанавливаем обработчик клика для кнопки
  button.onclick = onClick;

  // Возвращаем созданную кнопку
  return button;
};

// Экспортируем функцию createImageContainer, которая создает контейнер для изображения рубашки
export const createImageContainer = (shirt, selectedOptions) => {
  // Создаем контейнер для изображения
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container'; // Устанавливаем класс для контейнера

  // Создаем элемент изображения
  const img = document.createElement('img');
  img.className = 'shirt-image'; // Устанавливаем класс для изображения
  // Устанавливаем источник изображения, используя функцию formatUrl
  img.src = formatUrl(shirt.colors[selectedOptions.color][selectedOptions.side]);
  img.alt = shirt.name; // Устанавливаем альтернативный текст для изображения

  // Добавляем изображение в контейнер
  imgContainer.appendChild(img);
  // Возвращаем контейнер и изображение
  return { imgContainer, img };
};

// Экспортируем функцию createTitle, которая создает заголовок для рубашки
export const createTitle = (shirt) => {
  // Создаем элемент заголовка
  const title = document.createElement('h2');
  title.className = 'shirt-title'; // Устанавливаем класс для заголовка
  title.textContent = shirt.name; // Устанавливаем текст заголовка

  // Возвращаем созданный заголовок
  return title;
};

// Экспортируем функцию createPrice, которая создает элемент для отображения цены рубашки
export const createPrice = (shirt) => {
  // Создаем элемент для цены
  const price = document.createElement('h3');
  price.className = 'shirt-price'; // Устанавливаем класс для цены
  price.textContent = shirt.price; // Устанавливаем текст цены

  // Возвращаем созданный элемент цены
  return price;
};

// Экспортируем функцию createDescription, которая создает элемент для описания рубашки
export const createDescription = (shirt) => {
  // Создаем элемент для описания
  const description = document.createElement('p');
  description.className = 'shirt-description'; // Устанавливаем класс для описания
  description.textContent = shirt.description; // Устанавливаем текст описания

  // Возвращаем созданный элемент описания
  return description;
};

// Экспортируем функцию createSideSelection, которая создает интерфейс для выбора стороны рубашки
export const createSideSelection = (updateOptions) => {
  // Создаем контейнер для выбора стороны
  const sideSelection = document.createElement('div');
  sideSelection.className = 'side-selection'; // Устанавливаем класс для контейнера

  // Создаем текст для выбора стороны
  const sideText = document.createElement('span');
  sideText.innerText = 'Side: '; // Устанавливаем текст
  sideSelection.appendChild(sideText); // Добавляем текст в контейнер

  // Создаем кнопку для выбора передней стороны
  const frontButton = createButton({
    text: 'Front',
    onClick: () => {
      updateOptions({ side: SIDE.front }); // Обновляем выбранную сторону
    },
  });

  // Создаем кнопку для выбора задней стороны
  const backButton = createButton({
    text: 'Back',
    onClick: () => {
      updateOptions({ side: SIDE.back }); // Обновляем выбранную сторону
    },
  });

  // Добавляем кнопки в контейнер выбора стороны
  sideSelection.appendChild(frontButton);
  sideSelection.appendChild(backButton);

  // Возвращаем контейнер для выбора стороны
  return sideSelection;
};

// Экспортируем функцию createColorSelection, которая создает интерфейс для выбора цвета рубашки
export const createColorSelection = (shirt, updateOptions) => {
  // Создаем контейнер для выбора цвета
  const colorSelection = document.createElement('div');
  colorSelection.className = 'color-selection'; // Устанавливаем класс для контейнера

  // Создаем текст для выбора цвета
  const colorText = document.createElement('span');
  colorText.innerText = 'Color: '; // Устанавливаем текст
  colorSelection.appendChild(colorText); // Добавляем текст в контейнер

  // Создаем кнопки для выбора цвета на основе доступных цветов рубашки
  const colorButtons = Object.keys(shirt.colors).map((color) => {
    return createButton({
      text: color.charAt(0).toUpperCase() + color.slice(1), // Форматируем текст кнопки
      backGroundColor: color, // Устанавливаем цвет фона кнопки
      onClick: () => {
        updateOptions({
          color: color, // Обновляем выбранный цвет
        });
      },
    });
  });

  // Добавляем кнопки для выбора цвета в контейнер
  colorButtons.forEach((button) => colorSelection.appendChild(button));
  
  // Возвращаем контейнер для выбора цвета
  return colorSelection;
};
