// Получаем все элементы с классом 'target' и сохраняем их в переменную
const targets = document.querySelectorAll('.target');

// Переменные для отслеживания состояния перетаскивания и закрепления элемента
let isDragging = false; // Флаг, указывающий, происходит ли перетаскивание
let isPinned = false;   // Флаг, указывающий, закреплен ли элемент
let offsetX, offsetY;   // Смещения по осям X и Y для корректного перетаскивания
let currentElement = null; // Текущий элемент, который перетаскивается или закреплен
const originalPosition = { top: 0, left: 0 }; // Хранит оригинальные позиции закрепленного элемента

// Для каждого элемента 'target' добавляем обработчики событий
targets.forEach((target) => {
  // Обработчик события 'mousedown' для начала перетаскивания
  target.addEventListener('mousedown', (e) => {
    if (!isPinned) { // Если элемент не закреплен
      isDragging = true; // Устанавливаем флаг перетаскивания
      currentElement = target; // Устанавливаем текущий элемент
      // Вычисляем смещения относительно позиции курсора и верхнего левого угла элемента
      offsetX = e.clientX - target.getBoundingClientRect().left;
      offsetY = e.clientY - target.getBoundingClientRect().top;
    }
  });

  // Обработчик события 'dblclick' для закрепления элемента
  target.addEventListener('dblclick', () => {
    if (!isPinned) { // Если элемент не закреплен
      isPinned = true; // Устанавливаем флаг закрепления
      currentElement = target; // Устанавливаем текущий элемент
      // Сохраняем оригинальные позиции элемента
      originalPosition.top = target.style.top;
      originalPosition.left = target.style.left;
      target.style.backgroundColor = 'lightblue'; // Меняем цвет фона элемента
    }
  });
});

// Обработчик события 'mousemove' для перетаскивания элемента
document.addEventListener('mousemove', (e) => {
  // Если элемент перетаскивается
  if (isDragging && currentElement) {
    currentElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
    // Обновляем позицию элемента на основе положения курсора
    currentElement.style.top = `${e.clientY - offsetY}px`;
    currentElement.style.left = `${e.clientX - offsetX}px`;
  }

  // Если элемент закреплен, также обновляем его позицию
  if (isPinned && currentElement) {
    currentElement.style.position = 'absolute'; // Устанавливаем абсолютное позиционирование
    currentElement.style.top = `${e.clientY - offsetY}px`; // Обновляем позицию по Y
    currentElement.style.left = `${e.clientX - offsetX}px`; // Обновляем позицию по X
  }
});

// Обработчик события 'mouseup' для завершения перетаскивания
document.addEventListener('mouseup', () => {
  if (isDragging) { // Если элемент был перетаскиваемым
    isDragging = false; // Сбрасываем флаг перетаскивания
    currentElement = null; // Сбрасываем текущий элемент
  }
});

// Обработчик события 'click' для снятия закрепления с элемента
document.addEventListener('click', () => {
  if (isPinned && currentElement) { // Если элемент закреплен
    isPinned = false; // Сбрасываем флаг закрепления
    currentElement.style.backgroundColor = ''; // Возвращаем исходный цвет фона
    currentElement = null; // Сбрасываем текущий элемент
  }
});

// Обработчик события 'keydown' для сброса позиции элемента при нажатии 'Escape'
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentElement) { // Если нажата клавиша 'Escape'
    // Сбрасываем позицию элемента на оригинальную
    currentElement.style.top = originalPosition.top;
    currentElement.style.left = originalPosition.left;
    isPinned = false; // Сбрасываем флаг закрепления
    currentElement.style.backgroundColor = ''; // Возвращаем исходный цвет фона
    currentElement = null; // Сбрасываем текущий элемент
  }
});
