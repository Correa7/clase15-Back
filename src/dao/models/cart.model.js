const mongoose= require('mongoose')

const CartSchema = new mongoose.Schema({ 
  date:{
    type:String,
    unique:true,
    required:true
  },
    products: [
      {
        product:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity:{
          type: Number,                                 
        }
      }
    ],
  });
  CartSchema.pre('find', function(){ 
    this,populate(cartProducts.products)
  })

const Cart= mongoose.model('cart', CartSchema)
module.exports = Cart