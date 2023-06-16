const Cart = require('../../dao/models/cart.model')

class CartServices{
    async getById(_id){
        const cart= await Cart.findOne({_id:_id})
        return cart
    }
    async postCart(data){
        const cart= await Cart.created(data)
        return cart
    }
}
module.exports = CartServices