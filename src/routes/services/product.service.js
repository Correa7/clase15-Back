const Product= require('../../dao/models/products.model')

class ProductService {
  // validateUser(firstName, lastName, email) {
  //   if (!firstName || !lastName || !email) {
  //     console.log('validation error: please complete firstName, lastname and email.');
  //     throw new Error('validation error: please complete firstName, lastname and email.');
  //   }
  // }
  async getAll( page, limit ) {
    
    const product = await Product.paginate({}, { limit:limit || 5, page: page || 1 });
    return product;
  }
  async getById(_id) {
    const product = await Product.findOne({ _id: _id });
    return product;
  }
  async createOne(firstName, lastName, email ,group ,grade ,gender) {
    this.validateUser(firstName, lastName, email, group ,grade ,gender);
    const userCreated = await UserModel.create({ firstName, lastName, email, group ,grade ,gender});
    return userCreated;
  }

  // async deletedOne(_id) {
  //   const deleted = await UserModel.deleteOne({ _id: _id });
  //   return deleted;
  // }

  // async updateOne(_id, firstName, lastName, email, group ,grade ,gender) {
  //   if (!_id) throw new Error('invalid _id');
  //   this.validateUser(firstName, lastName, email, group ,grade ,gender);
  //   const userUptaded = await UserModel.updateOne({ _id: _id }, { firstName, lastName, email, group ,grade ,gender });
  //   return userUptaded;
  // }
}
module.exports = ProductService 