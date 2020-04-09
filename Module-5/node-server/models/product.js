const products = [];

class Product {
  constructor(title, image, description, price){
    this.title = title; 
    this.image = image;
    this.description = description;
    this.price = price;
  }

  save(){
    products.push(this);
  }

  static fetchAll(){
    return products;
  }
}

module.exports = Product;
