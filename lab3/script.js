function init() {
  const container = document.getElementById('shirts-container');

  const createButton = (text) => {
    return Object.assign(document.createElement('button'), {
      className: 'button',
      textContent: text,
    });
  };

  const createCard = (item) => {
    const card = document.createElement('div');
    card.className = 'card';

    const img = new Image();
    img.src = item.colors?.white?.front || item.default?.front;
    img.alt = item?.name || 'T-Shirt';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = item?.name || 'No name T-Shirt';

    const priceText = document.createElement('div');
    priceText.className = 'card-text';
    priceText.textContent = `Price: ${item?.price || 0}`;

    const buttons = [createButton('Quick View'), createButton('See Page')];
    card.append(img, title, priceText, ...buttons);

    container.appendChild(card);
  };

  const renderList = (items) => {
    items.forEach(createCard);
  };

  renderList(shirts);
}

init();
