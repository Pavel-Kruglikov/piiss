const targets = document.querySelectorAll('.target');

let isDragging = false;
let isPinned = false;
let offsetX, offsetY;
let currentElement = null;
const originalPosition = { top: 0, left: 0 };

targets.forEach((target) => {
  target.addEventListener('mousedown', (e) => {
    if (!isPinned) {
      isDragging = true;
      currentElement = target;
      offsetX = e.clientX - target.getBoundingClientRect().left;
      offsetY = e.clientY - target.getBoundingClientRect().top;
    }
  });

  target.addEventListener('dblclick', () => {
    if (!isPinned) {
      isPinned = true;
      currentElement = target;
      originalPosition.top = target.style.top;
      originalPosition.left = target.style.left;
      target.style.backgroundColor = 'lightblue';
    }
  });
});

document.addEventListener('mousemove', (e) => {
  if (isDragging && currentElement) {
    currentElement.style.position = 'absolute';
    currentElement.style.top = `${e.clientY - offsetY}px`;
    currentElement.style.left = `${e.clientX - offsetX}px`;
  }

  if (isPinned && currentElement) {
    currentElement.style.position = 'absolute';
    currentElement.style.top = `${e.clientY - offsetY}px`;
    currentElement.style.left = `${e.clientX - offsetX}px`;
  }
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    currentElement = null;
  }
});

document.addEventListener('click', () => {
  if (isPinned && currentElement) {
    isPinned = false;
    currentElement.style.backgroundColor = '';
    currentElement = null;
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && currentElement) {
    currentElement.style.top = originalPosition.top;
    currentElement.style.left = originalPosition.left;
    isPinned = false;
    currentElement.style.backgroundColor = '';
    currentElement = null;
  }
});
