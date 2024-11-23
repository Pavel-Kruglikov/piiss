import { shirts } from '../data/shirts.js';
import {
  createColorSelection,
  createDescription,
  createPrice,
  createSideSelection,
  createTitle,
  createImageContainer,
} from './common.js';
import { SELECTED_SHIRT_KEY, storage } from './utils/storage.js';
import { SIDE } from './utils/side.js';
import { formatUrl } from './utils/url.js';

const renderDetails = () => {
  const container = document.querySelector('.shirt-details');
  const shirt = storage.getItem(SELECTED_SHIRT_KEY) || shirts[0];

  const availableColors = Object.keys(shirt.colors);

  const initialOptions = {
    color: availableColors[0],
    side: SIDE.front,
  };

  const updateDisplay = () => {
    img.src = formatUrl(shirt.colors[selectedOptions.color][selectedOptions.side]);
  };

  const updateOptions = (options) => {
    selectedOptions = { ...initialOptions, ...options };
    updateDisplay();
  };

  const { imgContainer, img } = createImageContainer(shirt, initialOptions);
  const title = createTitle(shirt);
  const price = createPrice(shirt);
  const description = createDescription(shirt);
  const sideSelection = createSideSelection(updateOptions);
  const colorSelection = createColorSelection(shirt, updateOptions);

  container.appendChild(imgContainer);

  const bodyContainer = document.createElement('div');
  bodyContainer.className = 'body-container';

  bodyContainer.appendChild(title);
  bodyContainer.appendChild(price);
  bodyContainer.appendChild(description);
  bodyContainer.appendChild(sideSelection);
  bodyContainer.appendChild(colorSelection);

  container.appendChild(bodyContainer);

  updateDisplay();
};

renderDetails();
