const Product= require('../../dao/models/products.model')

class ProductServices {

  async getAll( page, limit ) {
    
    const product = await Product.paginate({}, { limit:limit || 5, page: page || 1 });
    return product;
  }
  async getById(_id) {
    const product = await Product.findOne({ _id: _id });
    return product;
  }
  async createOne(data) {
    
    const productCreated = await Product.create(data);
    return productCreated;
  }

  async deletedOne(_id) {
    const deleted = await Product.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id,title, description, thumbnail, code, stock, category, status) {
    const productUpDate = await Product.updateOne({ _id: _id }, {title, description, thumbnail, code, stock, category, status });
    return productUpDate;
  }
}
module.exports = ProductServices 