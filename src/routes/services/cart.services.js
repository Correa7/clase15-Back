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
    async deleteProducts(_id){
        const cart= await Cart.findOne({_id:_id})
        let arr=[]
        cart.products = arr
        let update = await Cart.updateOne({_id:_id},cart)
        return update
    }
}
module.exports = CartServices 