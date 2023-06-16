const express=require('express')
const Product= require('../../dao/models/products.model')
const ProductService=require( '../services/product.service.js')

const productRouter = express.Router();

const Service = new ProductService();

productRouter.get('/', async (req, res) => {
    const { page, limit } = req.query;
  try {
    const dataproduct = await Service.getAll(page, limit);
   //  console.log(dataUsers);
    return res.status(200).json({
      status: 'success',
     payload: dataproduct.docs,
     totalPages:dataproduct.totalPages,
     prevPages:dataproduct.prevPage,
     nextPages:dataproduct.nextPage,
     page:dataproduct.page,
     hasPrevPage:dataproduct. hasPrevPage,
     hasNextPage:dataproduct.hasNextPage,
     prevLink:dataproduct.hasPrevPage?`http://localhost:8080/dataproduct/?page=${dataproduct.prevPage} ` : null,
     nextLink:dataproduct.hasNextPage?`http://localhost:8080/dataproduct/?page=${dataproduct.nextPage} `: null,


    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});
productRouter.get('/:id', async (req, res) => {

try {
  const { id } = req.params;
 const product= await   Service.getById(id)
return product? 
 res.status(200).json({
    status: 'success',
    msg: 'Product deleted',
    data: product,
  }):
   res.status(200).json({
    status: 'error',
    msg: 'Product not found',                                                             
    data: product,
  })
} catch (e) {
  console.log(e);
  return res.status(500).json({
    status: 'error',
    msg: 'something went wrong :(',
    data: {},
  });
}
})
// usersRouter.post('/', async (req, res) => {
//   try {
//     const { firstName, lastName, email, gender, grade, group } = req.body;
//     const userCreated = await Service.createOne(firstName, lastName, email,  gender, grade, group);
//     return res.status(201).json({
//       status: 'success',
//       msg: 'product created',
//       data: userCreated,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: 'error',
//       msg: 'something went wrong :(',
//       data: {},
//     });
//   }
// });

// usersRouter.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Service.deletedOne(id)
//     return res.status(200).json({
//       status: 'success',
//       msg: 'product deleted',
//       data: {},
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: 'error',
//       msg: 'something went wrong :(',
//       data: {},
//     });
//   }
// });

// usersRouter.put('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {firstName, lastName, email,  gender, grade, group } = req.body;

//     await Service.updateOne(id,firstName, lastName, email,  gender, grade, group)
//     return res.status(201).json({
//       status: 'success',
//       msg: 'product uptaded',
//       data: {firstName, lastName, email, group ,grade ,gender},
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: 'error',
//       msg: 'something went wrong :(',
//       data: {},
//     });
//   }
// });
module.exports = productRouter