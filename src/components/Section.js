export default class Section{
  constructor({items, renderer}, containerSelector) {
    this.renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    })
  }

  addItem(element, isOwner) {
    if(!isOwner) {
      this._containerSelector.append(element);
    } else {
      this._containerSelector.prepend(element);
    }
  }
}
