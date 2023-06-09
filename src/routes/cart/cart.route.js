const express = require('express')
const Product= require('../../dao/models/products.model')
const Cart= require('../../dao/models/cart.model')
const { Router } = express

const router = new Router()
 
router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.get('/', (req,res)=> {
    Cart.find({}).lean()
    .then(pr=>{
        res.render('cart', {
            cart:pr,
            style:'cart.css',
            title:'Cart'
        }) 
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error loading product')
        )
    })  
        // Product.find({}).lean()
        // .then(pr=>{
        //     res.render('cart',{
        //         products:pr, 
        //         style:'cart.css',
        //         title:'Cart'
        // })
        // })
        // .catch(err=>{
        //     res.status(500).send(
        //         console.log('Error loading product')
        //     )
        // }) 
   
    
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
    Cart.find({cId}).lean()
    .then(pr=>{
        res.render('cart', {
            cart:pr,
            style:'cart.css',
            title:'Cart'
        }) 
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error loading product')
        )
    })  
})
router.post('/:cId/product/:pId', (req,res)=>{
    
    const cId = req.params.cId
    const pId = req.params.pId
    const id = `new ObjectId(${pId})`

    Cart.findOne({_id:cId})
    .then(pr=>{
        console.log(pr)
        let indexProduct = pr.products.findIndex((prod) => prod.product === id)
        let filtro= pr.products.filter(element => element._id == id)
        console.log(filtro)
        console.log(indexProduct)
              
                if (indexProduct != -1) {
                    pr.products[indexProduct].quantity++
                    Cart.updateOne({_id:cId},pr)
                    .then(pr=>{
                        console.log('Llego al if de index product')
                        res.render('cart', {
                            cart:pr,
                            style:'cart.css',
                            title:'Cart'
                        }) 
                    })
                    .catch(err=>{
                        res.status(500).send(
                            console.log('Error loading product')
                        )
                    })  
                }
                else {
                    console.log('Llego al else de index product')
                    pr.products.push({ _id:pId, quantity:1})
                    Cart.updateOne({_id:cId},pr)
                    .then(pr=>{
                        res.render('cart', {
                            cart:pr,
                            style:'cart.css',
                            title:'Cart'
                        }) 
                    })
                    .catch(err=>{
                        res.status(500).send(
                            console.log('Errorrrrrrrrrrrrrrrr')
                        )
                    })    
                }
    })
    .catch(err=>{
        res.status(500).send(
            console.log('Error Al crear un carro')
        )
    }) 

})


module.exports = router