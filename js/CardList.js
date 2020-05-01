class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(placeCard) {
    this.container.append(placeCard);
  }

  render(cardArray) {
    this.cardArray = cardArray
    this.cardArray.forEach(placeCard => {
      this.container.append(placeCard);
    })
  }
}