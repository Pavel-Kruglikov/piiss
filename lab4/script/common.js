import { SIDE } from './utils/side.js';
import { formatUrl } from './utils/url.js';

/**
 * Создает кнопку с заданными параметрами.
 * @param {Object} params - Параметры кнопки.
 * @param {string} params.text - Текст кнопки.
 * @param {string} params.className - Дополнительные классы для кнопки.
 * @param {Function} params.onClick - Функция, вызываемая при клике на кнопку.
 * @param {string} params.backGroundColor - Цвет фона кнопки.
 * @returns {HTMLButtonElement} - Созданная кнопка.
 */
const createButton = ({ text = '', className = '', onClick, backGroundColor = '' }) => {
  const button = document.createElement('button');
  button.className = `button ${className}`;
  button.textContent = text;
  button.onclick = onClick;

  if (backGroundColor) {
    Object.assign(button.style, {
      backgroundColor: backGroundColor,
      color: '#000',
      border: '2px solid black',
      borderRadius: '10px',
      cursor: 'pointer',
    });

    button.addEventListener('mouseenter', () => {
      button.style.opacity = 0.7; // Прозрачность при наведении
    });

    button.addEventListener('mouseleave', () => {
      button.style.opacity = 1; // Восстановление прозрачности
    });
  }

  return button;
};

/**
 * Создает контейнер для изображения футболки.
 * @param {Object} shirt - Объект футболки.
 * @param {Object} selectedOptions - Выбранные опции.
 * @returns {Object} - Объект с контейнером изображения и самим изображением.
 */
const createImageContainer = (shirt, selectedOptions) => {
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container';

  const img = document.createElement('img');
  img.className = 'shirt-image';
  img.src = formatUrl(shirt.colors[selectedOptions.color][selectedOptions.side]);
  img.alt = shirt.name;

  imgContainer.appendChild(img);
  return { imgContainer, img };
};

/**
 * Создает заголовок для футболки.
 * @param {Object} shirt - Объект футболки.
 * @returns {HTMLHeadingElement} - Заголовок с названием футболки.
 */
const createTitle = (shirt) => {
  const title = document.createElement('h2');
  title.className = 'shirt-title';
  title.textContent = shirt.name;
  return title;
};

/**
 * Создает элемент для отображения цены футболки.
 * @param {Object} shirt - Объект футболки.
 * @returns {HTMLHeadingElement} - Элемент с ценой футболки.
 */
const createPrice = (shirt) => {
  const price = document.createElement('h3');
  price.className = 'shirt-price';
  price.textContent = shirt.price;
  return price;
};

/**
 * Создает элемент для отображения описания футболки.
 * @param {Object} shirt - Объект футболки.
 * @returns {HTMLParagraphElement} - Элемент с описанием футболки.
 */
const createDescription = (shirt) => {
  const description = document.createElement('p');
  description.className = 'shirt-description';
  description.textContent = shirt.description;
  return description;
};

/**
 * Создает элемент выбора стороны футболки.
 * @param {Function} updateOptions - Функция для обновления выбранных опций.
 * @returns {HTMLDivElement} - Элемент выбора стороны.
 */
const createSideSelection = (updateOptions) => {
  const sideSelection = document.createElement('div');
  sideSelection.className = 'side-selection';

  const sideText = document.createElement('span');
  sideText.innerText = 'Side: ';
  sideSelection.appendChild(sideText);

  const frontButton = createButton({
    text: 'Front',
    onClick: () => updateOptions({ side: SIDE.front }),
  });

  const backButton = createButton({
    text: 'Back',
    onClick: () => updateOptions({ side: SIDE.back }),
  });

  sideSelection.append(frontButton, backButton);
  return sideSelection;
};

/**
 * Создает элемент выбора цвета футболки.
 * @param {Object} shirt - Объект футболки.
 * @param {Function} updateOptions - Функция для обновления выбранных опций.
 * @returns {HTMLDivElement} - Элемент выбора цвета.
 */
const createColorSelection = (shirt, updateOptions) => {
  const colorSelection = document.createElement('div');
  colorSelection.className = 'color-selection';

  const colorText = document.createElement('span');
  colorText.innerText = 'Color: ';
  colorSelection.appendChild(colorText);

  Object.keys(shirt.colors).forEach(color => {
    const colorButton = createButton({
      text: color.charAt(0).toUpperCase() + color.slice(1),
      backGroundColor: color,
      onClick: () => updateOptions({ color }),
    });
    colorSelection.appendChild(colorButton);
  });

  return colorSelection;
};

export {
  createButton,
  createImageContainer,
  createTitle,
  createPrice,
  createDescription,
  createSideSelection,
  createColorSelection,
};
