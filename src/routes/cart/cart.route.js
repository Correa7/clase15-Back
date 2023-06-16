const express = require('express')
const Product= require('../../dao/models/products.model')
const Cart= require('../../dao/models/cart.model')
const CartService= require('../services/cart.services')

const cartService = new CartService()
const { Router } = express

const router = new Router()
 
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', (req,res)=> {
    Cart.find({}).lean()
    .then(pr=>{
        res.status(200).send(
            {
                status:'success',
                msg:'cart Find',
                data:pr
            }
        )
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error loading product')
        )
    })  
     
})

router.post('/', (req,res)=> {
    let data = req.body
    let cart= new Cart(data)
    cart.save()
    .then(pr=>{
        res.status(201).send({
            msg:'Cart create successfully',
            data:data
        })
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error create Cart')
        )
    })
})
router.get('/:cId', (req,res)=> {
    const cId = req.params.cId
    const data= Cart.findOne({_id:cId}).populate('products.product')
    .then(pr=>{
        res.status(200).send(
            {
                status:'success',
                msg:'cart Find',
                data:pr
            }
        )
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error get Cart')
        )
    })  
})
router.post('/:cId/product/:pId', (req,res)=>{
    const cId = req.params.cId
    const pId = req.params.pId

    Cart.findOne({_id:cId}).populate('products.product')
    .then(pr=>{
        pr.products.push({ product:pId, quantity:1})
        Cart.updateOne({_id:cId},pr)
        .then(pr=>{
            res.status(200).send(
                {
                    status:'success',
                    msg:'Product added to cart',
                    data:pr
                }
            )
        })
        .catch(err=>{
            res.status(500).send({
                status: 'error',
                msg: 'something went wrong :(',
                data: {},
            })
        })
    })
    .catch(err=>{
        res.status(500).send({
            status: 'error',
            msg: 'something went wrong :(',
            data: {},
        })
    }) 
})


module.exports = router