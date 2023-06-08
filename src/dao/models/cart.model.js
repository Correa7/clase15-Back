const mongoose= require('mongoose')

const CartSchema = new mongoose.Schema({
    cartProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  });

const cartSchema= mongoose.model('cart', CartSchema)