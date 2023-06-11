const express = require ('express');

const router = express.Router();

const path = require ('path');

const multer = require('multer');

//Controller

const productController = require('../controllers/productController');

// Routes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/imgs/productos');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

//@GET / product
router.get('/', productController.getList);

// @POST /product
router.post('/', upload.any('img'), productController.postProduct);

// @GET /product/create
router.get('/productCreate', productController.getCreate);


// @GET /product/:id/detail ---> /products/5/detail
router.get('/:id/productDetail', productController.getDetail);

// @DELETE /product/:id/delete ---> /products/5/delete
router.delete('/:id/delete', productController.deleteProduct);

// @GET /product/:id/update 
router.get('/:id/productEdit', productController.getEdit);

// @PUT /product/:id/update ---> /products/5/put
router.put('/:id/productEdit', productController.updateProduct);



module.exports = router;