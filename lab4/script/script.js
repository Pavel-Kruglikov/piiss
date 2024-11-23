import { createButton } from './common.js';
import { shirts } from '../data/shirts.js';
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';
import { formatUrl } from './utils/url.js';

const renderMain = () => {
    const container = document.getElementById('shirts-container');

    const navigateToDetailsPage = (item) => () => {
        storage.setItem(SELECTED_SHIRT_KEY, item);
        window.location.href = 'details.html';
    };

    const createCardItem = (item) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        const imageElement = document.createElement('img');
        imageElement.src = formatUrl(item.colors?.white?.front || item.default?.front);
        imageElement.alt = item?.name || 'T-Shirt';

        const titleElement = document.createElement('div');
        titleElement.className = 'card-title';
        titleElement.textContent = item?.name || 'No name T-Shirt';

        const priceElement = document.createElement('div');
        priceElement.className = 'card-text';
        priceElement.textContent = `Price: ${item?.price || 0}`;

        const quickViewButton = createButton({ text: 'Quick View' });
        const viewDetailsButton = createButton({ text: 'See Page', onClick: navigateToDetailsPage(item) });

        cardElement.append(imageElement, titleElement, priceElement, quickViewButton, viewDetailsButton);
        container.appendChild(cardElement);
    };

    const renderItemsList = (items, renderFunction) => {
        items.forEach(renderFunction);
    };

    renderItemsList(shirts, createCardItem);
};

renderMain();
