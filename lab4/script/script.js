import { createButton } from './common.js';
import { shirts } from '../data/shirts.js';
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';
import { formatUrl } from './utils/url.js';

function renderMain() {
  const container = document.getElementById('shirts-container');

  const navigatePageDetails = (item) => () => {
    storage.setItem(SELECTED_SHIRT_KEY, item);
    window.location.href = 'details.html';
  };

  const renderItem = (item) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = formatUrl(item.colors?.white?.front || item.default?.front);
    img.alt = item?.name || 'T-Shirt';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = item?.name || 'No name T-Shirt';

    const text = document.createElement('div');
    text.className = 'card-text';
    text.textContent = `Price: ${item?.price || 0}`;

    const quickViewButton = createButton({ text: 'Quick View' });
    const seePageButton = createButton({ text: 'See Page', onClick: navigatePageDetails(item) });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(quickViewButton);
    card.appendChild(seePageButton);

    container.appendChild(card);
  };

  const renderList = (items, renderItem) => {
    items.forEach(renderItem);
  };

  renderList(shirts, renderItem);
}

renderMain();
