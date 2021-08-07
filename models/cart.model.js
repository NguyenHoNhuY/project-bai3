function cart(items_old, total_old) {
  this.items = items_old || [];
  this.totalPrice = total_old || 0;
  this.add = function (product, id, imageSrc, productPrice) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index < 0) {
      this.items.push({
        id: id,
        item: product,
        imageSrc,
        amount: 1,
        price: productPrice,
      });
      const index1 = this.items.findIndex((item) => item.id === id);
      this.totalPrice = total_old + this.items[index1].price;
    } else {
      this.items[index].amount++;
      this.totalPrice = total_old + this.items[index].price;
    }
  };
  this.delete = function (id) {
    const index = this.items.findIndex((item) => item.id === id);
    this.totalPrice =
      total_old - this.items[index].amount * this.items[index].price;
    this.items.splice(index, 1);
  };
  this.increase = function (id) {
    const index = this.items.findIndex((item) => item.id === id);
    this.items[index].amount++;
    this.totalPrice = total_old + this.items[index].price;
  };
  this.reduce = function (id) {
    const index = this.items.findIndex((item) => item.id === id);
    this.items[index].amount--;
    if (this.items[index].amount <= 0) {
      this.totalPrice = total_old - this.items[index].price;
      this.items.splice(index, 1);
    } else {
      this.totalPrice = total_old - this.items[index].price;
    }
  };
}
module.exports = cart;
